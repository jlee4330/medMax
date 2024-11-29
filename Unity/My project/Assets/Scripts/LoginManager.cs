using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine.Networking; // HTTP 요청에 필요

public class LoginManager : MonoBehaviour
{
    public InputField userIDInputField; // UserID를 입력받을 InputField
    private string backendURL = "http://3.35.193.176:7777/mainPage/getIds?uID="; // 백엔드 URL

    private string userId;

    // JavaScript에서 호출할 메서드
    public void SetUserId(string id)
    {
        userId = id;
        Debug.Log("UserId received: " + userId);

        // 예: userId에 따라 다른 로직 처리
        HandleUserId(userId);
    }

    private void HandleUserId(string id)
    {
        // userId에 따른 동작 구현
        Debug.Log("Handling userId: " + id);
    }

    public void OnStartButtonClicked()
    {
        // string userID = userIDInputField.text; // InputField에서 UserID 가져오기

        // if (string.IsNullOrEmpty(userID))
        // {
        //     Debug.LogWarning("UserID를 입력하세요.");
        //     return;
        // }

        // HTTP 요청 시작
        GameData.Instance.IsLogin = true; // 로그인 상태로 설정
        StartCoroutine(FetchDataFromServer("260dcd4e09745e47"));
    }

    private IEnumerator FetchDataFromServer(string userID)
    {
        string requestURL = backendURL + userID; // 요청 URL 생성
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
            // JSON 응답 처리
            response = response.Trim('[', ']'); // 대괄호 제거
            string[] data = response.Split(','); // 쉼표로 분리

            string receivedUserID = data[0].Trim('\"'); // UserID 추출
            int roomID = int.Parse(data[1]); // RoomID 추출

            if (GameData.Instance == null)
            {
                Debug.LogError("GameData.Instance가 null입니다. 초기화를 확인하세요.");
                yield break;
            }

            // GameData에 데이터 저장
            GameData.Instance.UserID = receivedUserID;
            GameData.Instance.RoomID = roomID;

            Debug.Log($"UserID: {receivedUserID}, RoomID: {roomID}");

            // Game 씬으로 이동
            SceneManager.LoadScene("MainScene");
        }
        catch (System.Exception e)
        {
            Debug.LogError($"응답 처리 중 오류 발생: {e.Message}");
        }
    }

}
