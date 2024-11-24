using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.Networking; // HTTP 요청에 필요

public class SignUpManager : MonoBehaviour
{
    public InputField userIDInputField; // UserID를 입력받을 InputField
    public InputField roomIDInputField; // RoomID를 입력받을 InputField
    public InputField medicationTime1InputField; // 복약시간1을 입력받을 InputField
    public InputField medicationTime2InputField; // 복약시간2을 입력받을 InputField
    public InputField medicationTime3InputField; // 복약시간3을 입력받을 InputField
    private string backendURL = "http://3.35.193.176:7777/mainPage/signUp"; // 회원가입용 백엔드 URL

    public void OnSignUpButtonClicked()
    {
        // 입력 값 가져오기
        string userID = userIDInputField.text;
        string roomID = roomIDInputField.text;
        string medicationTime1 = medicationTime1InputField.text;
        string medicationTime2 = medicationTime2InputField.text;
        string medicationTime3 = medicationTime3InputField.text;

        // 입력 값이 비어있으면 경고 메시지 출력
        if (string.IsNullOrEmpty(userID) || string.IsNullOrEmpty(roomID) ||
            string.IsNullOrEmpty(medicationTime1) || string.IsNullOrEmpty(medicationTime2) || 
            string.IsNullOrEmpty(medicationTime3))
        {
            Debug.LogWarning("모든 정보를 입력하세요.");
            return;
        }

        // 요청할 URL을 쿼리 스트링으로 구성
        string requestURL = backendURL + "?userId=" + userID + "&roomId=" + roomID + 
                            "&time1=" + medicationTime1 + "&time2=" + medicationTime2 + 
                            "&time3=" + medicationTime3;

        // HTTP 요청 시작
        GameData.Instance.IsLogin = false; // 회원가입 상태로 설정
        StartCoroutine(SendSignUpDataToServer(requestURL));
    }

    private IEnumerator SendSignUpDataToServer(string requestURL)
    {
        // GET 요청을 위해 URL 생성
        UnityWebRequest request = UnityWebRequest.Get(requestURL);

        Debug.Log($"서버로 요청: {requestURL}");

        // 요청 전송 및 대기
        yield return request.SendWebRequest();

        // 에러 처리
        if (request.result != UnityWebRequest.Result.Success)
        {
            Debug.LogError($"서버 요청 실패: {request.error}");
            yield break;
        }

        // 응답 데이터 확인
        string response = request.downloadHandler.text;
        Debug.Log($"Raw Response: {response}");

        if (string.IsNullOrEmpty(response))
        {
            Debug.LogError("응답 데이터가 비어 있습니다.");
            yield break;
        }

        try
        {
            // 서버에서 받은 응답 처리
            // 예시: {"userID": "user2", "roomID": 1, "medicationTimes": ["08:00", "12:00", "18:00"]}
            response = response.Trim('{', '}'); // 중괄호 제거
            string[] data = response.Split(','); // 쉼표로 분리

            string receivedUserID = data[0].Split(':')[1].Trim('\"'); // UserID 추출
            int receivedRoomID = int.Parse(data[1].Split(':')[1].Trim('\"')); // RoomID 추출
            // GameData에 저장
            if (GameData.Instance == null)
            {
                Debug.LogError("GameData.Instance가 null입니다. 초기화를 확인하세요.");
                yield break;
            }

            GameData.Instance.UserID = receivedUserID;
            GameData.Instance.RoomID = receivedRoomID;
            // GameData.Instance.MedicationTime1 = data[2].Split(':')[1].Trim('\"');
            // GameData.Instance.MedicationTime2 = data[3].Split(':')[1].Trim('\"');
            // GameData.Instance.MedicationTime3 = data[4].Split(':')[1].Trim('\"');

            // Game 씬으로 이동
            SceneManager.LoadScene("MainScene");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"응답 처리 중 오류 발생: {e.Message}");
        }
    }
}
