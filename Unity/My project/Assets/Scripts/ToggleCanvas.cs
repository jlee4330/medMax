using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ToggleCanvas : MonoBehaviour
{
    // 관리할 Canvas
    public GameObject targetCanvas;

    // Canvas 활성화/비활성화 메서드
    public void ToggleCanvasVisibility()
    {
        if (targetCanvas != null)
        {
            // 현재 상태를 반전
            bool isActive = targetCanvas.activeSelf;
            targetCanvas.SetActive(!isActive);
        }
    }
}