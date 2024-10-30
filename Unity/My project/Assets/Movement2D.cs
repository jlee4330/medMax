using UnityEngine;
using NativeWebSocket;
public class NewBehaviourScript : MonoBehaviour
{
    private float moveSpeed = 5.0f;
    private Vector3 moveDirection = Vector3.zero;
    private Rigidbody2D rigid2D; 
    private WebSocket ws;
    bool isConnected = false;
    // Start is called before the first frame update
    async void Start()
    {
        rigid2D = GetComponent<Rigidbody2D>();
        ws = new WebSocket("ws://localhost:7777");

        ws.OnOpen += () =>
        {
            Debug.Log("Connected to WebSocket server.");
            isConnected = true; // Set to true once connected
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

        await ws.Connect();
    }

    

    // Update is called once per frame
    async void Update()
    {
        float x = Input.GetAxisRaw("Horizontal");
        float y = Input.GetAxisRaw("Vertical");

        // moveDirection = new Vector3(x, y, 0);
        // transform.position += moveDirection * moveSpeed * Time.deltaTime;
        rigid2D.velocity = new Vector3(x,y,0) * moveSpeed;
        if (isConnected){
            string message = "" + transform.position.x + "," + transform.position.y;
            await ws.SendText(message);
        }
    }
    private async void OnApplicationQuit()
    {
        if (ws != null)
        {
            await ws.Close();
        }
    }

}
