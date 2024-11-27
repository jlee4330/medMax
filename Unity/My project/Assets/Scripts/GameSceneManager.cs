using UnityEngine;
using UnityEngine.UI;

public class GameSceneManager : MonoBehaviour
{
    public Text userInfoText; // UserID와 RoomID를 표시할 UI 텍스트

    void Start()
    {
        // GameData에서 UserID와 RoomID 가져오기
        string userID = GameData.Instance.UserID;
        int roomID = GameData.Instance.RoomID;

        // UI에 데이터 표시
        // userInfoText.text = $"Welcome, {userID}!\nYou are in Room {roomID}.";
    }
}
