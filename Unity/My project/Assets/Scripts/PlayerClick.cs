using UnityEngine;

public class PlayerClick : MonoBehaviour
{
    public GameObject emojiObject; // Emoji Prefab을 할당할 변수
    private EmojiPanelScript emojiPanelScript; // EmojiPanelScript 참조 변수
    private Canvas emojiCanvas; // EmojiCanvas 참조 변수
    private GameObject backgroundBlur; // BackgroundBlur 참조 변수

     public Vector3 spawnPosition = new Vector3(0, 0, 0);

    void Start()
    {
        if (emojiObject == null)
        {
            Debug.LogError("EmojiObject를 할당해야 합니다.");
            return;
        }
        Debug.LogError("emojiObject가 잘 할당 되었습니다.");

        // EmojiObject에서 EmojiCanvas와 BackgroundBlur, EmojiPanel을 찾음
        emojiCanvas = emojiObject.GetComponentInChildren<Canvas>(); // EmojiObject 아래의 Canvas 찾기
        if (emojiCanvas == null)
        {
            Debug.LogError("EmojiCanvas가 EmojiObject 아래에 존재하지 않습니다.");
            return;
        }
        Debug.Log("EmojiCanvas가 EmojiObject 아래에 존재합니다.");

        backgroundBlur = emojiCanvas.transform.Find("BackgroundBlur")?.gameObject; // EmojiCanvas 아래의 BackgroundBlur 찾기
        if (backgroundBlur == null)
        {
            Debug.LogError("BackgroundBlur가 EmojiCanvas 아래에 존재하지 않습니다.");
        }
        Debug.Log("BackgroundBlur가 EmojiCanvas 아래에 존재합니다.");

        emojiPanelScript = emojiObject.GetComponentInChildren<EmojiPanelScript>(); // EmojiObject 아래의 EmojiPanelScript 찾기
        if (emojiPanelScript == null)
        {
            Debug.LogError("EmojiPanelScript가 EmojiObject 아래에 존재하지 않습니다.");
        }
        Debug.Log("EmojiPanelScript가 EmojiObject 아래에 존재합니다.");

        // 초기 상태에서 모든 UI 요소 비활성화
        emojiObject.SetActive(false); // EmojiObject 전체 비활성화
    }

    void OnMouseDown()
    {
        Debug.Log("클릭이 잘 되었습니다");

        if (emojiPanelScript != null && emojiCanvas != null && backgroundBlur != null)
        {
            // // EmojiObject를 활성화하고, BackgroundBlur와 EmojiPanel 활성화
            // emojiObject.SetActive(true); // EmojiObject 활성화
            // emojiCanvas.enabled = true; // EmojiCanvas 활성화
            // backgroundBlur.SetActive(true); // BackgroundBlur 활성화
            Debug.Log("띄울겁니다");
            Instantiate(emojiObject, spawnPosition, Quaternion.identity);
        }
        else
        {
            Debug.LogWarning("필요한 요소들이 초기화되지 않았습니다.");
        }
    }
}
