using UnityEngine;
using NativeWebSocket;
public class NewBehaviourScript : MonoBehaviour
{
    private float moveSpeed = 5.0f;
    private Vector3 moveDirection = Vector3.zero;
    private Rigidbody2D rigid2D; 
    public WebSocket ws;
    public GameSystemScript gameSystemScript;
    public Networking networking;
    // Start is called before the first frame update
    async void Start()
    {
        gameSystemScript = GameObject.Find("Networking").GetComponent<GameSystemScript>();
        networking = GameObject.Find("Networking").GetComponent<Networking>();
        rigid2D = GetComponent<Rigidbody2D>();
        ws = networking.ws;
    }

    

    // Update is called once per frame
    async void Update()
    {
        
        float x = Input.GetAxisRaw("Horizontal");
        float y = Input.GetAxisRaw("Vertical");

        // moveDirection = new Vector3(x, y, 0);
        // transform.position += moveDirection * moveSpeed * Time.deltaTime;
        rigid2D.velocity = new Vector3(x,y,0) * moveSpeed;
        if (networking.isConnected){
            string message = "pos" + "," + gameSystemScript.my_id + "," + transform.position.x + "," + transform.position.y;
            await ws.SendText(message);
        }
    }
    

}
