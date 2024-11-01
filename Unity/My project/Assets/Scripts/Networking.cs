using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using NativeWebSocket;

public class Networking : MonoBehaviour
{
    // Start is called before the first frame update
    public WebSocket ws = new WebSocket("ws://localhost:7777");
    public bool isConnected = false;
    public GameSystemScript gameSystemScript;
    async void Start()
    {
       gameSystemScript = GetComponent<GameSystemScript>(); 
       ws.OnOpen += () =>
        {
            Debug.Log("Connected to WebSocket server.");
            ws.SendText("new");
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
                    gameSystemScript.my_id = int.Parse(parts[1]);
                    Debug.Log("my id is" + gameSystemScript.my_id);
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
