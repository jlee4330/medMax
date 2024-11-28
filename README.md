# 약꾹 (Yakgook)🏥

**만성질환자들에게 느슨한 연대를 기반으로 사회적 지지를 제공하여 복약 순응도를 향상시키고 환자의 의약품 주체성을 강화하는 메타버스 기반 커뮤니티 플랫폼**

---
## 소개💊

안녕하세요! 저희는 **2024 가을학기 테크포임팩트 수업**을 수강한 카이스트 팀 **MedMax**입니다! 🎉  
We provide the same contents in English here. Please click here !!
  
![Group 289102](https://github.com/user-attachments/assets/2681a3cd-afad-4f2a-b8e1-f326b7da2d17)

---
## 우리는 이러한 사회 문제를 정의했어요💭

- **복약 순응의 어려움**  
  누구나 한 번쯤 약을 처방받아 먹어본 경험이 있을 것입니다. 짧게는 3일치 처방인데도 매 끼니 약사님의 복약 지도대로 약을 챙겨먹는 것은 쉽지 않습니다.
  늦잠을 자면 아침약부터 먹어야 하는지, 점심약부터 먹어야 하는지 등의 질문도 끊임없이 생겨나죠.

- **의약품 주체성의 중요성**  
  주체성이란 위와 같은 복약 상황에서 알고자 하는 **정보에 접근**, 문해력을 이용해 **정보를 이해**, 정보를 바탕으로 판단의 순간에 **의사 결정**, 복약 지도에 **순응하며 이를 관리**하는 것을 포괄하는 개념입니다.

- **우리의 타겟이 겪는 고립감**  
  연구에 따르면, 만성질환자들의 **70%가 지속적인 약물 복용에 어려움**을 느끼고, **75%가 정신적인 고립감**을 경험합니다.  
  그리고 **사회적 지지가 복약 순응도를 높이는 데** 효과적이라는 연구 결과도 있습니다.

- **문제 정의**  
  따라서 저희는 만성질환자들의 주체성을 키워주기 위해서, 사회적인 지지를 '느슨한 연대'를 통해 제공하고자 했습니다.
  - 느슨한 : 솔루션의 최종 목적이 환자의 **주체성 함양**에 있습니다.
  - 연대 : 약사는 약국을 벗어나 환자의 삶에 녹아들어 **통합적**인 돌봄을, 환자는 복약 리마인더가 아닌 **사람과의 연결**을 느낍니다.

---

## 어떤 솔루션을 개발했나요?💉
### 1. **온보딩📃**
- **기록 항목**  
  - 별명, 만성질환 종류, 하루 복약 횟수, 각각의 복약 시간  
- **목적**  
  - 같은 시간대에 약을 먹는 환자들을 그룹핑하여 **연대감 고취**
  - 최적의 커뮤니티로 사용자 배정
- **민감 정보 보호**
  - 실명, 정확한 약 정보 입력 없이 **거부감 최소화**  
  - 복약 정보와 함께 UUID를 DB에 전송  

### 2. **메인 페이지🏡**
- **Unity 맵 구현 후 WebView로 게시**  
  - 커뮤니티의 공동 목표: **구성원의 복약 순응도**에 따라 상태바가 올라가는 중앙의 **마법 항아리**  
- **콕 찌르기 기능**  
  - 약 먹을 시간이 지난 유저에게 **푸시 알림 전송**으로 서로의 복약 순응 동기부여  
- **캐릭터 움직임**  
  - 익명성이 악용되지 않도록 **제한된 말풍선**과 함께 **맵 자동 배회**
 
### 3. **마이 페이지📅**
- **트래킹 항목**  
  - 복약 상황: 복약 달력, 복약 비율  
  - 커뮤니티 활동: 함께한 날들, 나를 찌른 사용자  
- **목적**  
  - 앱의 **지속적인 사용 유도**  
  - 환자의 **주체성 함양** 도움

### 4. **QnA 페이지❓**
- **질문 기록 및 FAQ 검색/열람**
- **AI 기반 QnA 추천**
  - 새로운 질문 작성 시 **유사 Q&A 추천**을 통해 즉각적인 도움 제공  
  - 약사님께 도달하는 질문을 줄여 부담을 줄이며 효율성 향상

---

## 솔루션의 장점 (유사 솔루션 대비) 및 기대효과✨

1. **커뮤니티의 새로운 형태 제안**  
   - 기존 게시판의 문제점(건조한 소통, 광고, 범죄)을 해결하기 위해 텍스트가 아닌 **공간의 형태로 커뮤니티를 시각화**
   - 일종의 메타버스를 차용한 커뮤니티

2. **QnA 페이지에 AI 추천 도입**
   - 기존 원격 약사 소통 서비스보다 **효율적**  
   - 챗봇 상담보다 **사회적 지지 강화**  
   - 질문 게시판 대비 **악용 가능성 감소**  

3. **기대 효과**  
   - 커뮤니티 내 연대감과 동기부여를 통한 **복약 순응도 향상**  
   - 만성질환자의 **주체성 강화**


---

## **설치 및 실행 방법🖥**

### 레포지토리 클론하기

먼저 레포지토리를 클론합니다.

```bash
git clone https://github.com/jlee4330/medMax
```

### 실행 방법

### 프론트엔드 실행

1. 클론한 레포지토리의 **root directory**로 이동한 후, `frontEnd` 디렉토리로 이동합니다:
    ```bash
    cd frontEnd
    ```

2. 필요한 의존성을 설치합니다:
    ```bash
    npm install
    ```

3. 안드로이드 or IOS 앱을 실행합니다:
    ```bash
    npm run android
    or
    npm run ios
    ```

### 백엔드 실행

1. 클론한 레포지토리의 **root directory**로 이동한 후, `backEnd` 디렉토리로 이동합니다:
    ```bash
    cd backEnd
    ```

2. 필요한 의존성을 설치합니다:
    ```bash
    npm install
    ```

3. 백엔드 서버를 실행합니다:
    ```bash
    node app.js
    ```

### AI 실행

1. 클론한 레포지토리의 **root directory**로 이동한 후, `AI` 디렉토리로 이동합니다:
    ```bash
    cd AI
    ```

2. `AI` 디렉토리 내의 리드미 파일에 명시된 절차대로 진행합니다.

### 추가 정보

- **필요한 소프트웨어**: Node.js, npm, Android Studio (안드로이드 개발 환경), Xcode (IOS 개발 환경)
- **환경 설정**: EC2 환경에서의 서버 실행을 위한 AWS 설정, docker 설정 등이 필요할 수 있습니다.

---

## Team Members (팀원 및 팀 소개)👥
| 신서원 | 안영은 | 박수현 | 정예준 | 이한샘 | 이동건 | 이주영 |
|:------:|:------:|:------:|:------:|:------:|:------:|:------:|
| <img src="https://github.com/user-attachments/assets/0c04cfa7-46a1-4d21-b68f-cf9bd68e6724" alt="신서원" width="150"> | <img src="https://github.com/user-attachments/assets/8a4fa797-a8b2-4a47-a8ce-8cfc93b691c2" alt="안영은" width="150"> | <img src="https://github.com/user-attachments/assets/ccbbaf69-0a69-4469-bc3e-e49a7ce28195" alt="박수현" width="150"> | <img src="https://github.com/user-attachments/assets/30c7b42d-0814-4749-ae95-12c071fa274d" alt="정예준" width="150"> | <img src="https://github.com/user-attachments/assets/bb17ef51-ebab-4d13-ad63-1e4bd8fd25ad" alt="이한샘" width="150"> | <img src="https://github.com/user-attachments/assets/54b14473-5b04-43c8-a006-e7d67055969c" alt="이동건" width="150"> | <img src="https://github.com/user-attachments/assets/b10e8431-bcef-4551-bf41-af6aeb938f99" alt="이주영" width="150"> |
| 기획, 발표, 프론트엔드 개발자 | 기획, 디자이너, 프론트엔드 개발자 | 데이터 관리자, 백엔드 개발자 | 데이터 관리자, 백엔드 개발자, AI 개발자 | 기획, 풀스택 개발자 | 기획, 디자이너, 프론트엔드 개발자  | 디자이너, 프론트엔드 개발자 |  
| [GitHub](https://github.com/sswilove1) | [GitHub](https://github.com/littlestar0261) | [GitHub](https://github.com/PSuHyeon) | [GitHub](https://github.com/Chungyezun) | [GitHub](https://github.com/damhs) | [GitHub](https://github.com/jlee4330) | [GitHub](https://github.com/leejuyoung0918) |

## 멘토링👨‍🏫

박상원 펠로우님 (늘픔가치) : 기획 지도

고세원 멘토님 (카카오 기술 멘토) : 기술적 조언, 진행방식 지도

김준형(에디) 님 (카카오 크루) : 기획 지도

류석영 교수님 : 방향 지도

## 기술 스택🖱

FE :  앱 개발 언어 (TypeScript), 앱 개발 프레임워크 (React Native)
BE :  백엔드 개발 언어 (JavaScript), 개발 프레임워크 (Node.js)
AI :  AI 개발 언어 (Python), 개발 프레임워크 (Pytorch, FastAPI)
ETC :  DB 언어 (MySQL), 서버 (아마존 ec2, Docker)

## Team
|팀원|소속|이메일|
|---|---|---|
|신서원|KAIST CS/BTM|sswilove1@kaist.ac.kr|
|안영은|KAIST BS|youngeun522@kaist.ac.kr|
|박수현|KAIST CS|0111suhyeon@kaist.ac.kr|
|정예준|KAIST CS|maple0729@kaist.ac.kr|
|이한샘|KAIST AE/CS|ihansaem1@kaist.ac.kr|
|이동건|KAIST ID|jlee4330@kaist.ac.kr|
|이주영|KAIST CS/EE|leejuyoung0918@kaist.ac.kr|

---

🎉 **약꾹**은 모두가 더 건강하고 행복한 복약 생활을 할 수 있도록 함께합니다!

////////아직 안 함

1. repository 이름은 "솔루션명칭_2024"로 해주시기를 바랍니다.
8. (선택 사항) 데모 영상
9. 연관 자료 (reference, 최종 발표 자료 링크, 펠로우 조직 사이트 포함)
11. 가능하면, README.md 내용은 한국어, 영어 병기를 부탁드립니다.

추가적으로, 이번에는 발표 자료뿐만아니라 GitHub repository 링크 제출이 필요합니다. 제출은 테크포임팩트 GitHub organization에 새로운 repository를 만드는 방식으로 진행될 예정입니다. Public repository를 권장하나, private으로 설정해 두어도 괜찮습니다.
각 팀별 대표는 11/22까지 조교에게 DM으로 GitHub 계정을 전달해주시면, 해당 organization에 추가해드리도록 하겠습니다.
Github repository 제출 시에 다음과 같은 사항을 지켜주시기를 바랍니다.

기술 스택 / 우리 소속과 카이 이메일?

아래 예시를 참고해서 작성해주시면 좋을 것 같습니다.
2023 데이스카우트 - 문제정의, 솔루션의 기대효과, 실행방법, 연관자료 (https://github.com/dayscout-kaist/dayscout-server)
2023 뉴웨이즈 - 팀원 역할, 솔루션 데모 (https://github.com/NewWays-TechForImpactKAIST)
2023 링크드니트 - 팀원 연락처 (https://github.com/permawintre/linkedneet)

