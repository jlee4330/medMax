using UnityEngine;
using UnityEngine.UI;

public class EmojiPanelScript : MonoBehaviour {
    // public GameObject targetCanvas;
    public GameObject emojiPanel; // EmojiPanel을 참조
    public Sprite[] emojiSprites; // 9개의 이모지 이미지 배열
    private GameObject selectedPlayer; // 현재 선택된 플레이어


    public void OnEmojiButtonClicked(int emojiIndex)
    {
        selectedPlayer = GameObject.Find("player(Clone)");

        if (selectedPlayer == null) 
        {
            Debug.LogError("Selected player is null.");
            return;
        }

        // EmojiBubble을 찾기 전에, 해당 객체가 실제로 있는지 확인
        var emojiBubble = selectedPlayer.transform.Find("EmojiBubble");

        if (emojiBubble == null)
        {
            Debug.LogError("EmojiBubble not found in selected player.");
            return;
        }

        var spriteRenderer = emojiBubble.GetComponent<SpriteRenderer>();

        if (spriteRenderer == null)
        {
            Debug.LogError("SpriteRenderer component not found in EmojiBubble.");
            return;
        }

        spriteRenderer.sprite = emojiSprites[emojiIndex]; // 이모지 스프라이트 변경
        emojiBubble.gameObject.SetActive(true); // 이모지 표시

        // 이모지 2초 후 자동 비활성화
        Invoke(nameof(HideEmoji), 5.0f);

        // 패널 닫기
        emojiPanel.SetActive(false);
    }
    
    private void HideEmoji()
    {
        if (selectedPlayer == null) return;
        var emojiBubble = selectedPlayer.transform.Find("EmojiBubble");
        if (emojiBubble == null)
        {
            Debug.LogError("EmojiBubble not found in selected player.");
            return;
        }
        emojiBubble.gameObject.SetActive(false); // 이모지 숨기기
    }

}

// public class EmojiPanelScript : MonoBehaviour
// {
//     public GameObject emojiPanel; // EmojiPanel을 참조
//     public Sprite[] emojiSprites; // 9개의 이모지 이미지 배열
//     private GameObject selectedPlayer; // 현재 선택된 플레이어

//     // 이모지 버튼 클릭 시 호출되는 메서드
//     public void OnEmojiButtonClicked(int emojiIndex)
//     {
//         selectedPlayer = GameObject.Find("player(Clone)");

//         if (selectedPlayer == null) {
//             Debug.Log("선택된 플레이어가 없습니다.");
//             return;
//         }
        
//         // 선택된 Player의 EmojiBubble을 찾아 이미지 변경
//         Debug.Log("플레이어 존재 시작");
//         var emojiBubble = selectedPlayer.transform.Find("EmojiBubble").GetComponent<Image>();
//         Debug.Log("이모지 버블 만들기");
//         // emojiBubble.sprite = emojiSprites[emojiIndex];
//         Debug.Log("스프라이트 받기");
//         emojiBubble.gameObject.SetActive(true); // 이모지 표시
//         Debug.Log("이미지가 뜨나요?");

//         // 이모지 2초 후 자동 비활성화
//         Invoke(nameof(HideEmoji), 5.0f);

//         // 패널 닫기
//         emojiPanel.SetActive(false);
//     }

//     private void HideEmoji()
//     {
//         if (selectedPlayer == null) return;
//         var emojiBubble = selectedPlayer.transform.Find("EmojiBubble").GetComponent<Image>();
//         emojiBubble.gameObject.SetActive(false); // 이모지 숨기기
//     }
// }