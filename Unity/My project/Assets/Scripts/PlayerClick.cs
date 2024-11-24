using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerClick : MonoBehaviour
{
    public Canvas emojiPanel;  // 띄울 캔버스를 연결합니다.

    private void Start()
    {
        if (emojiPanel != null)
        {
            emojiPanel.enabled = false;  // 초기에는 캔버스를 비활성화
        }
    }

    // 플레이어 클릭 감지
    void OnMouseDown()
    {
        if (emojiPanel != null)
        {
            emojiPanel.enabled = true;  // 클릭 시 캔버스를 활성화
        }
    }
}

