using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TouchCharacter : MonoBehaviour
{
    public GameObject emojiPanel; // Emoji 패널을 드래그해 연결
    private GameObject currentPlayer; // 현재 선택된 캐릭터

    void Update()
    {
        if (Input.GetMouseButtonDown(0)) // 터치 또는 클릭 입력 감지
        {
            // 카메라에서 Ray 발사
            Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;

            if (Physics.Raycast(ray, out hit))
            {
                // 캐릭터를 터치한 경우
                if (hit.collider != null && hit.collider.CompareTag("Player")) // 캐릭터에 Player 태그 설정 필요
                {
                    // 터치된 캐릭터 정보 저장
                    currentPlayer = hit.collider.gameObject;

                    // Emoji 패널 활성화
                    ShowEmojiPanel();
                }
            }
        }
    }

    void ShowEmojiPanel()
    {
        if (emojiPanel != null && currentPlayer != null)
        {
            // Emoji 패널 위치를 캐릭터 근처로 설정
            emojiPanel.transform.position = currentPlayer.transform.position + new Vector3(0, 2, 0); // 캐릭터 위쪽
            emojiPanel.SetActive(true); // 패널 활성화
        }
    }
}
