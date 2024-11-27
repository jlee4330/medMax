using UnityEngine;
using NativeWebSocket;
public class NewBehaviourScript : MonoBehaviour
{
    // private float moveSpeed = 5.0f;
    // private Vector3 moveDirection = Vector3.zero;
    private Rigidbody2D rigid2D; 
    public WebSocket ws;
    public GameSystemScript gameSystemScript;
    public Networking networking;
    public SpriteRenderer spriteRenderer; 
    public Sprite[] directionSprites;

    public float moveSpeed = 1.5f; // 이동 속도
    public float changeDirectionInterval = 1.5f; // 방향 변경 간격
    public Vector3 targetDirection = new Vector3(0,0,0); // 이동할 목표 방향
    private float timeSinceChange = 0f; // 마지막 방향 변경 이후 경과 시간
    // Start is called before the first frame update
    async void Start()
    {
        // gameSystemScript = GameObject.Find("Networking").GetComponent<GameSystemScript>();
        // networking = GameObjuect.Find("Networking").GetComponent<Networking>();
        rigid2D = GetComponent<Rigidbody2D>();
        // ws = networking.ws;
        // targetDirection = GetRandomDirection();
        // SetRandomInterval();
        spriteRenderer = GetComponent<SpriteRenderer>(); // SpriteRenderer 가져오기
        // spriteRenderer가 없으면 에러 메시지 출력
        if (spriteRenderer == null)
        {
            Debug.LogError("Player Object에 SpriteRenderer가 없습니다!");
        }
    }

    

    // Update is called once per frame
    async void Update()
    {
    //     timeSinceChange += Time.deltaTime;
    //     if (timeSinceChange >= changeDirectionInterval)
    //     {
    //         targetDirection = GetRandomDirection();
    //         SetRandomInterval();
    //         timeSinceChange = 0f;
    //     }

    //     // 자연스러운 움직임을 위해 Lerp로 방향을 전환
        Vector3 direction = (targetDirection - transform.position).normalized;

            // Rigidbody에 속도 설정
            rigid2D.velocity = direction * moveSpeed;

            // 목표 위치에 도달하면 속도 0
            if (Vector3.Distance(transform.position, targetDirection) < 0.1f)
            {
                rigid2D.velocity = Vector3.zero;
            }
    //     // float x = Input.GetAxisRaw("Horizontal");
    //     // float y = Input.GetAxisRaw("Vertical");
    //     // moveDirection = new Vector3(x, y, 0);
    //     // transform.position += moveDirection * moveSpeed * Time.deltaTime;
    // //     rigid2D.velocity = new Vector3(x,y,0) * moveSpeed;
    //     if (networking.isConnected){
    //         string message = "pos" + "," + gameSystemScript.my_id + "," + transform.position.x + "," + transform.position.y;
    //         await ws.SendText(message);
    //     }
        UpdateSprite(direction);
    }
    void UpdateSprite(Vector3 direction)
    {
        if (direction.y > 0.5f) // 위쪽
        {
            spriteRenderer.sprite = directionSprites[0];
        }
        else if (direction.y < -0.5f) // 아래쪽
        {
            spriteRenderer.sprite = directionSprites[1];
        }
        else if (direction.x > 0.5f) // 오른쪽
        {
            spriteRenderer.sprite = directionSprites[2];
        }
        else if (direction.x < -0.5f) // 왼쪽
        {
            spriteRenderer.sprite = directionSprites[3];
        }
    }
    Vector3 GetRandomDirection()
    {
        float randomX = Random.Range(-1f, 1f);
        float randomY = Random.Range(-1f, 1f);
        return new Vector3(randomX, randomY, 0).normalized;
    }
    private void SetRandomInterval()
    {
        changeDirectionInterval = Random.Range(0.1f, 1.0f); // Random interval between 1 and 5 seconds
    }
    

}
