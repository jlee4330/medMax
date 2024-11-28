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
cached_data = None

# 데이터 초기화
def initialize_data():
    global cached_data
    try:
        response = requests.get("http://3.35.193.176:7777/qna/all-qnas")
        if response.status_code == 200:
            cached_data = response.json()  # 데이터 캐싱
            logger.info("Data successfully cached.")
        else:
            logger.error(f"Failed to fetch data. Status code: {response.status_code}")
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")


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
    top_k_pairs = [(pairs[i][0], pairs[i][1], pairs[i][2], pairs[i][3], float(scores[i])) for i in top_k_indices]
    
    return top_k_pairs

# 한국어 reranker
model_path_ko = "Dongjin-kr/ko-reranker"
tokenizer_ko = AutoTokenizer.from_pretrained(model_path_ko)
model_ko = AutoModelForSequenceClassification.from_pretrained(model_path_ko)
model_ko.eval()

# 다국어 reranker
# model_path_bge = "BAAI/bge-reranker-v2-m3"
# tokenizer_bge = AutoTokenizer.from_pretrained(model_path_bge)
# model_bge = AutoModelForSequenceClassification.from_pretrained(model_path_bge)
# model_bge.eval()

def preprocess_pairs(data):
    pairs = []
    for item in data:
        title = item['question']
        question = item['content']
        answer = item['answer']
        pharmacist = item['pharmacist']
        
        pairs.append([question, title, pharmacist, answer])
    return pairs

@app.on_event("startup")
def on_startup():
    initialize_data()

@app.post("/rerank")
def retrieve_and_rerank(query_request: QueryRequest):
    if cached_data is None:
        initialize_data()
    question = remove_stopwords(query_request.question)
    top_k = query_request.top_k
    
    pairs = preprocess_pairs(cached_data)
    bm25 = initialize_bm25(pairs)
    bm25_scores = bm25.get_scores(question)
    top_k_indices = np.argsort(bm25_scores)[-top_k*4:][::-1]
    bm25_top_pairs = [pairs[i] for i in top_k_indices]
    print(bm25_top_pairs)
    similar_pairs_ko = get_top_k_similar_pairs(question, bm25_top_pairs, model_ko, tokenizer_ko, k=top_k)
    
    # similar_pairs_bge = get_top_k_similar_pairs(question, bm25_top_pairs, model_bge, tokenizer_bge, k=top_k)
    
    return {
        "ko_results": similar_pairs_ko
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

