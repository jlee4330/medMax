from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from preprocessing import initialize_bm25, remove_stopwords

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

pairs = [
    ['아세트아미노펜 복용 전 주의사항이 있나요?', '아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.'],
    ['아세트아미노펜을 공복에 먹어도 괜찮나요?', '공복에 복용할 수 있지만, 속이 불편하다면 음식과 함께 복용하는 것이 좋습니다.'],
    ['아세트아미노펜을 알코올과 함께 복용해도 되나요?', '알코올과 함께 복용할 경우 간 손상의 위험이 증가할 수 있습니다.'],
    ['아세트아미노펜 복용 시 주의할 점은?', '과다 복용은 간에 손상을 줄 수 있으니 주의가 필요합니다.'],
    ['아세트아미노펜을 하루에 몇 번 먹을 수 있나요?', '성인은 보통 4-6시간 간격으로 복용할 수 있지만, 최대 용량을 초과하지 않도록 주의하세요.'],
    ['아세트아미노펜을 복용 후 어지러움을 느끼면 어떻게 해야 하나요?', '증상이 지속된다면 복용을 중단하고 의사와 상담하세요.'],
    ['이 약을 복용 중인 다른 약이 있으면 괜찮나요?', '복용 중인 다른 약과 상호작용이 있을 수 있으니 의사와 상의하세요.'],
    ['아세트아미노펜 복용 후 금해야 할 음식이 있나요?', '특정한 음식과의 상호작용은 없지만, 알코올 섭취는 피하는 것이 좋습니다.'],
    ['임신 중에 아세트아미노펜을 복용해도 괜찮나요?', '임신 중 복용에 대해 반드시 의사와 상의하는 것이 좋습니다.'],
    ['아세트아미노펜 복용 후 졸음이 올 수 있나요?', '졸음은 일반적인 부작용은 아니지만, 피로감을 느낄 수 있습니다.'],
    ['아세트아미노펜을 몇 시간 간격으로 복용해야 하나요?', '보통 4-6시간 간격으로 복용할 수 있습니다.'],
    ['아세트아미노펜을 복용하면 안 되는 사람은 누구인가요?', '간 질환이 있거나 알레르기가 있는 사람은 복용을 피해야 합니다.'],
    ['아세트아미노펜과 다른 진통제를 함께 복용해도 되나요?', '다른 진통제와 함께 복용 시 중복 복용에 주의해야 합니다.'],
    ['아세트아미노펜을 먹고도 통증이 가시지 않으면 어떻게 해야 하나요?', '효과가 없을 경우 의사와 상담하는 것이 좋습니다.'],
    ['아세트아미노펜을 장기간 복용해도 안전한가요?', '장기간 복용은 간에 무리를 줄 수 있으므로 주의해야 합니다.'],
    ['아세트아미노펜을 먹을 때 복용량을 초과하면 안 되나요?', '복용량을 초과하면 간 손상의 위험이 높아지므로 주의해야 합니다.'],
    ['아세트아미노펜을 소아에게도 복용시킬 수 있나요?', '소아의 경우 적절한 용량을 준수해야 하며, 의사의 지침을 따르는 것이 좋습니다.'],
    ['아세트아미노펜 복용 후 얼마나 빨리 효과가 나타나나요?', '보통 복용 후 30분에서 1시간 내에 효과가 나타납니다.'],
    ['아세트아미노펜이 다른 약에 비해 부작용이 적은가요?', '부작용이 적은 편이지만, 개인의 상태에 따라 다를 수 있습니다.'],
    ['아세트아미노펜 복용 중 운동을 해도 괜찮나요?', '가벼운 운동은 괜찮지만, 심한 운동은 피하는 것이 좋습니다.'],
    ['안녕하세요 약사님, 고혈압 약을 복용 중인데 감기약도 함께 먹어도 괜찮을까요?', '대부분의 경우 가능하지만, 감기약 성분 중 혈압에 영향을 줄 수 있는 성분이 포함되어 있는지 확인이 필요합니다.'],
    ['안녕하세요, 고혈압 약을 먹고 있는데 감기약을 복용하면 부작용이 생길 가능성이 있나요?', '일부 감기약은 혈압을 상승시킬 수 있으니 의사나 약사와 상의하는 것이 좋습니다.'],
    ['안녕하세요 약사님, 고혈압 약과 감기약을 동시에 먹어도 괜찮을까요?', '각 약의 복용 간격을 유지하면서 복용할 수 있지만, 상호작용을 확인하는 것이 중요합니다.'],
    ['안녕하세요 약사님, 고혈압 약을 복용 중인데 피해야 할 감기약 성분이 있나요?', '슈도에페드린, 카페인 등 혈압을 상승시킬 수 있는 성분이 포함된 약은 피하는 것이 좋습니다.'],
    ['안녕하세요, 고혈압 약 복용 후 바로 감기약을 먹어도 문제가 없을까요?', '대부분의 경우 괜찮지만, 두 약의 성분 간 상호작용을 확인하는 것이 안전합니다.'],
    ['안녕하세요, 고혈압 약과 함께 복용 가능한 감기약 종류를 알려주세요.', '혈압에 영향을 주지 않는 진통제나 해열제 위주의 감기약이 안전할 수 있습니다. 약사와 상의하시기 바랍니다.'],
    ['안녕하세요 약사님, 고혈압 약과 감기약을 같이 먹으면 혈압 조절에 문제가 생길 수 있나요?', '특정 감기약 성분은 혈압 조절에 영향을 줄 수 있으니 의사나 약사와 상의하는 것이 좋습니다.'],
    ['안녕하세요, 고혈압 약을 복용 중인데 감기약을 처방받았습니다. 두 약이 서로 상충되지 않을까요?', '필요에 따라 약을 변경하거나 조정할 수 있으니 의사와 상의하는 것이 좋습니다.'],
    ['안녕하세요 약사님, 고혈압 약을 먹고 감기약을 추가로 먹었는데 두근거림이 생겼습니다. 어떻게 해야 할까요?', '두근거림은 감기약 성분에 의한 부작용일 수 있으니, 즉시 의사나 약사와 상의하세요.'],
    ['안녕하세요 약사님, 고혈압 약 복용 중 감기약을 추가로 먹으니 혈압이 올랐습니다. 괜찮은 건가요?', '감기약 복용을 중단하고 즉시 의사나 약사와 상의하시기 바랍니다.'],
    ['안녕하세요, 고혈압 약과 감기약을 함께 복용 중인데 혈압 모니터링이 필요할까요?', '네, 감기약 복용 중에는 혈압을 자주 체크하는 것이 안전합니다.'],
    ['안녕하세요 약사님, 졸리지 않은 감기약을 찾고 있는데 고혈압 약과 함께 복용해도 되는 약을 추천받을 수 있을까요?', '진해거담제나 무졸음 성분이 포함된 감기약을 선택하는 것이 좋습니다. 약사와 상의하세요.'],
    ['안녕하세요, 고혈압 약 복용 중인데 감기약을 얼마나 오래 복용해도 되나요?', '감기약은 보통 1주일 이상 복용하지 않으며, 증상이 지속되면 의사와 상의하세요.'],
    ['안녕하세요 약사님, 고혈압 약과 감기약을 함께 복용했더니 졸음이 심하게 옵니다. 이 경우 어떻게 해야 하나요?', '졸음이 심하다면 복용 중인 약 성분을 재검토받고 필요하면 다른 대체 약을 찾아야 합니다.'],
    ['안녕하세요 약사님, 고혈압 약을 먹고 있는데 감기약을 복용한 이후 혈압이 잘 조절되지 않는 것 같습니다. 어떻게 해야 할까요?', '감기약 복용을 중단하고 혈압약 복용 스케줄을 점검한 뒤 의사나 약사와 상의하세요.']
]

bm25 = initialize_bm25(pairs)

@app.post("/rerank")
def retrieve_and_rerank(query_request: QueryRequest):
    question = remove_stopwords(query_request.question)
    top_k = query_request.top_k
    
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