using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using NativeWebSocket;

public class Networking : MonoBehaviour
{
    [SerializeField]
    private GameObject gameobject;
    // Start is called before the first frame update
    public WebSocket ws = new WebSocket("ws://3.35.193.176:7777");
    public bool isConnected = false;
    private bool isLogin;
    public GameSystemScript gameSystemScript;
    async void Start()
    {

       gameSystemScript = GetComponent<GameSystemScript>(); 
       ws.OnOpen += () =>
        {
            //TODO : CHECK IF LOGIN OR SIGNUP
            Debug.Log("Connected to WebSocket server.");
            Debug.Log(GameData.Instance.IsLogin);

            if (GameData.Instance.IsLogin){
                gameSystemScript.my_id = GameData.Instance.UserID;
                gameSystemScript.room_id = GameData.Instance.RoomID;

                Debug.Log($"Login 성공: UserID = {gameSystemScript.my_id}, RoomID = {gameSystemScript.room_id}");
                isConnected = true;
            } else{
                gameSystemScript.my_id = GameData.Instance.UserID;
                gameSystemScript.room_id = GameData.Instance.RoomID;
                // gameSystemScript.room_id = 1;
                isConnected = true;
                ws.SendText("new," + "," + gameSystemScript.my_id + "," +gameSystemScript.room_id);
            }
        };

        ws.OnError += (e) =>
        {
            Debug.LogError("WebSocket Error: " + e);
        };

        ws.OnClose += (e) =>
        {
            Debug.Log("WebSocket connection closed.");
            isConnected = false;
        };

        ws.OnMessage += (bytes) =>
        {
            var byteStr = System.Text.Encoding.UTF8.GetString(bytes);
            string[] parts = byteStr.Split(',');
            switch (parts[0]){
                case "newid":
                    isConnected = true; // Set to true once connected
                    break;

                default:
                    break;
            }
            // Debug.Log("byteStr : " + byteStr);
        };

        await ws.Connect();
    }

    // Update is called once per frame
    void Update()
    {
        #if !UNITY_WEBGL || UNITY_EDITOR
            ws.DispatchMessageQueue();
        #endif
    }

    private async void OnApplicationQuit()
    {
        if (ws != null)
        {
            await ws.Close();
        }
    }
}


// using System.Collections;
// using System.Collections.Generic;
// using UnityEngine;
// using NativeWebSocket;

// public class Networking : MonoBehaviour
// {
//     [SerializeField]
//     private GameObject gameobject;
//     // Start is called before the first frame update
//     public WebSocket ws = new WebSocket("ws://143.248.200.170:7777");
//     public bool isConnected = false;
//     private bool isLogin;
//     public GameSystemScript gameSystemScript;
//     async void Start()
//     {

//        gameSystemScript = GetComponent<GameSystemScript>(); 
//        ws.OnOpen += () =>
//         {
//             Debug.Log("Connected to WebSocket server.");
//             Debug.Log(GameData.Instance.IsLogin);

//             //TODO : CHECK IF LOGIN OR SIGN
//             if (GameData.Instance.IsLogin)
//             {
//                 // Login 상태일 때 UserID와 RoomID를 GameData에서 가져오기
//                 if (GameData.Instance == null)
//                 {
//                     Debug.LogError("GameData.Instance가 null입니다. 초기화를 확인하세요.");
//                     return;
//                 }

//                 gameSystemScript.my_id = GameData.Instance.UserID; // UserID를 정수형으로 변환
//                 gameSystemScript.room_id = GameData.Instance.RoomID;

//                 Debug.Log($"Login 성공: UserID = {gameSystemScript.my_id}, RoomID = {gameSystemScript.room_id}");
//                 isConnected = true;
//             }
//             else
//             {

//                 gameSystemScript.room_id = GameData.Instance.RoomID;

//                 string newUserMessage = $"new,{gameSystemScript.room_id}";
//                 ws.SendText(newUserMessage);

//                 Debug.Log($"SignUp 성공: RoomID = {gameSystemScript.room_id}, 서버로 메시지 전송: {newUserMessage}");
//             }
//         };

//         ws.OnError += (e) =>
//         {
//             Debug.LogError("WebSocket Error: " + e);
//         };

//         ws.OnClose += (e) =>
//         {
//             Debug.Log("WebSocket connection closed.");
//             isConnected = false;
//         };

//         ws.OnMessage += (bytes) =>
//         {
//             var byteStr = System.Text.Encoding.UTF8.GetString(bytes);
//             string[] parts = byteStr.Split(',');
//             switch (parts[0]){
//                 case "newid":
//                     gameSystemScript.my_id = int.Parse(parts[1]);
//                     Debug.Log("my id is" + gameSystemScript.my_id);
//                     isConnected = true; // Set to true once connected
//                     break;

//                 default:
//                     break;
//             }
//             // Debug.Log("byteStr : " + byteStr);
//         };

//         await ws.Connect();
//     }

//     // Update is called once per frame
//     void Update()
//     {
//         #if !UNITY_WEBGL || UNITY_EDITOR
//             ws.DispatchMessageQueue();
//         #endif
//     }

//     private async void OnApplicationQuit()
//     {
//         if (ws != null)
//         {
//             await ws.Close();
//         }
//     }
// }
