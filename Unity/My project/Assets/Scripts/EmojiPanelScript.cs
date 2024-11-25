using UnityEngine;
using UnityEngine.UI;

public class EmojiPanelScript : MonoBehaviour
{
    public GameObject emojiPanel; // EmojiPanel을 참조
    public Sprite[] emojiSprites; // 9개의 이모지 이미지 배열
    private GameObject selectedPlayer; // 현재 선택된 플레이어

    // 이모지 버튼 클릭 시 호출되는 메서드
    public void OnEmojiButtonClicked(int emojiIndex)
    {
        if (selectedPlayer == null) return;

        // 선택된 Player의 EmojiBubble을 찾아 이미지 변경
        var emojiBubble = selectedPlayer.transform.Find("EmojiBubble").GetComponent<Image>();
        emojiBubble.sprite = emojiSprites[emojiIndex];
        emojiBubble.gameObject.SetActive(true); // 이모지 표시

        // 이모지 2초 후 자동 비활성화
        Invoke(nameof(HideEmoji), 2.0f);

        // 패널 닫기
        emojiPanel.SetActive(false);
    }

    // 패널을 열고 선택된 플레이어를 설정
    public void OpenEmojiPanel(GameObject player)
    {
        selectedPlayer = player;
        emojiPanel.SetActive(true); // 패널 표시
    }

    private void HideEmoji()
    {
        if (selectedPlayer == null) return;
        var emojiBubble = selectedPlayer.transform.Find("EmojiBubble").GetComponent<Image>();
        emojiBubble.gameObject.SetActive(false); // 이모지 숨기기
    }
}
