from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from preprocessing import initialize_bm25, remove_stopwords
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# API 요청 형식
class QueryRequest(BaseModel):
    question: str
    top_k: int

# Top K 구하기
def get_top_k_similar_pairs(question, pairs, model, tokenizer, k=3):
    inputs = tokenizer([[question, pair[0]] for pair in pairs], padding=True, truncation=True, return_tensors='pt', max_length=512)
    
    with torch.no_grad():
        scores = model(**inputs, return_dict=True).logits.view(-1, ).float()

    scores = scores.numpy()
    
    top_k_indices = np.argsort(scores)[-k:][::-1]
    top_k_pairs = [(pairs[i][0], pairs[i][1], float(scores[i])) for i in top_k_indices]
    
    return top_k_pairs

# 한국어 reranker
model_path_ko = "Dongjin-kr/ko-reranker"
tokenizer_ko = AutoTokenizer.from_pretrained(model_path_ko)
model_ko = AutoModelForSequenceClassification.from_pretrained(model_path_ko)
model_ko.eval()

# 다국어 reranker
model_path_bge = "BAAI/bge-reranker-v2-m3"
tokenizer_bge = AutoTokenizer.from_pretrained(model_path_bge)
model_bge = AutoModelForSequenceClassification.from_pretrained(model_path_bge)
model_bge.eval()

def preprocess_pairs(data):
    pairs = []
    for item in data:
        question = item['content']
        answer = item['answer']
        pairs.append([question, answer])
    return pairs

@app.post("/rerank")
def retrieve_and_rerank(query_request: QueryRequest):
    question = remove_stopwords(query_request.question)
    top_k = query_request.top_k

    try:
        response = requests.get("http://nodejs-backend:7777/qna/all-qnas")
        if response.status_code == 200:
            data = response.json()
            logger.info(f"Fetched data: {data}")
            pairs = preprocess_pairs(data)
        else:
            logger.error(f"Failed to fetch data. Status code : {response.status_code}")
    except Exception as e:
        logger.error(f"An error occured: {str(e)}")
    
    bm25 = initialize_bm25(pairs)
    bm25_scores = bm25.get_scores(question)
    top_k_indices = np.argsort(bm25_scores)[-top_k*2:][::-1]
    bm25_top_pairs = [pairs[i] for i in top_k_indices]
    similar_pairs_ko = get_top_k_similar_pairs(question, bm25_top_pairs, model_ko, tokenizer_ko, k=top_k)
    
    similar_pairs_bge = get_top_k_similar_pairs(question, bm25_top_pairs, model_bge, tokenizer_bge, k=top_k)
    
    return {
        "ko_results": similar_pairs_ko,
        "bge_results": similar_pairs_bge
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
