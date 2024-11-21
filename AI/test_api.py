import requests

# API 엔드포인트
url = "http://localhost:8000/rerank"

# 요청 데이터
data = {
    "question": "약이랑 젤리랑 같이 먹어도 될까요?",
    "top_k": 3
}

# POST 요청 보내기
response = requests.post(url, json=data)

# 응답 상태 코드 확인
if response.status_code == 200:
    try:
        print(response.json())  # JSON으로 변환 시도
    except ValueError:
        print("응답이 JSON 형식이 아닙니다:", response.text)  # JSON이 아닐 경우 출력
else:
    print("오류 발생, 상태 코드:", response.status_code)  # 상태 코드 출력