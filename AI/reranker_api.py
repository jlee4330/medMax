from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel

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

# 질문 & 답변 예시
pairs = [
    ['아세트아미노펜 복용 시 주의사항은 무엇인가요?', '아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.'],
    ['아세트아미노펜을 복용할 때 주의해야 할 것은?', '아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.'],
    ['아세트아미노펜을 복용할 때 주의할 것이 무엇이죠?', '아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.'],
    ['아세트아미노펜을 물과 함께 먹어야 하나요?', '아세트아미노펜은 물과 함께 복용하는 것이 좋습니다.'],
    ['아세트아미노펜 복용 후 어떤 증상이 나타나면 안 되나요?', '복용 후 심한 알레르기 반응이 나타나면 즉시 의사에게 연락해야 합니다.'],
    ['아세트아미노펜의 부작용은 무엇인가요?', '일반적인 부작용으로는 메스꺼움과 두통이 있을 수 있습니다.'],
    ['이 약은 언제 복용해야 하나요?', '아세트아미노펜은 필요할 때마다 복용할 수 있습니다.'],
]

@app.post("/rerank")
def rerank(query_request: QueryRequest):
    question = query_request.question
    top_k = query_request.top_k
    
    similar_pairs_ko = get_top_k_similar_pairs(question, pairs, model_ko, tokenizer_ko, k=top_k)
    
    similar_pairs_bge = get_top_k_similar_pairs(question, pairs, model_bge, tokenizer_bge, k=top_k)
    
    return {
        "ko_results": similar_pairs_ko,
        "bge_results": similar_pairs_bge
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)