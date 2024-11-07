# Reranker API

FastAPI를 사용하여 질문에 대한 유사한 답변을 제공하는 Reranker API입니다. 현재 API는 한국어 및 다국어 모델을 사용하여 입력된 질문에 대해 가장 관련성이 높은 답변을 반환합니다.

## 환경 설정

### 1. 필수 소프트웨어 설치

- Python 3.10 이상
- pip (Python 패키지 관리자)

### 2. 가상 환경 설정 (선택 사항)

가상 환경을 설정하는 것이 좋습니다. 아래 명령어로 가상 환경을 생성하고 활성화할 수 있습니다.

```bash
# Conda를 사용하는 경우
conda create -n rerank python=3.10
conda activate rerank

# venv를 사용하는 경우
python -m venv venv
# 가상 환경 활성화 (Windows)
venv\Scripts\activate
# 가상 환경 활성화 (macOS/Linux)
source venv/bin/activate
```

### 3. 의존성 설치

`requirements.txt` 파일에 명시된 의존성을 설치합니다.

```bash
pip install -r requirements.txt
```

### 4. API 실행

아래 명령어로 FastAPI 서버를 실행합니다.

```bash
python reranker_api.py
```

서버가 성공적으로 실행되면, 기본적으로 `http://localhost:8000`에서 API에 접근할 수 있습니다.

### 5. API 테스트

API가 정상적으로 작동하는지 확인하기 위해 `test_reranker_api.py` 파일을 실행합니다.

```bash
python test_reranker_api.py
```

이 스크립트는 API에 POST 요청을 보내고 응답을 출력합니다.

## 사용 방법

API 엔드포인트는 `/rerank`이며, POST 요청을 통해 질문과 반환할 유사한 답변의 수를 지정할 수 있습니다.

### 요청 예시

```json
{
    "question": "아세트아미노펜 복용 시 주의사항은 무엇인가요?",
    "top_k": 3
}
```

### 응답 예시

API는 다음과 같은 형식으로 응답합니다.

```json
{
    "ko_results": [
        ["아세트아미노펜 복용 시 주의사항은 무엇인가요?", "아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.", 0.95],
        ...
    ],
    "bge_results": [
        ["아세트아미노펜 복용 시 주의사항은 무엇인가요?", "아세트아미노펜은 과다 복용 시 간 손상을 초래할 수 있습니다.", 0.92],
        ...
    ]
}
```
