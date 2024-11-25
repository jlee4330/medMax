// using System.Collections;
// using System.Collections.Generic;
// using UnityEngine;
// using UnityEngine.UI;

// public class PlayerClick : MonoBehaviour
// {
//     public Canvas emojiCanvas; // Canvas를 Inspector에서 설정
//     [SerializeField] private Sprite[] buttonSprites; // 버튼별 이미지 배열 (Inspector에서 설정)
    
//     private void Start()
//     {
//         if (emojiCanvas != null)
//         {
//             emojiCanvas.gameObject.SetActive(false); // 시작 시 캔버스를 비활성화
//         }
//         else
//         {
//             Debug.LogError("Canvas가 설정되지 않았습니다!");
//         }
//     }

//     private void OnMouseDown()
//     {
//         if (emojiCanvas != null)
//         {
//             // 플레이어 오브젝트 클릭 시 캔버스 활성화/비활성화
//             emojiCanvas.gameObject.SetActive(!emojiCanvas.gameObject.activeSelf);
//         }
//     }

//     // 버튼 클릭 시 호출되는 메서드
//     public void OnButtonClick(int buttonIndex)
//     {
//         if (buttonIndex < 0 || buttonIndex >= buttonSprites.Length)
//         {
//             Debug.LogError("잘못된 버튼 인덱스입니다!");
//             return;
//         }

//         Sprite selectedSprite = buttonSprites[buttonIndex]; // 배열에서 선택된 이미지 가져오기

//         if (selectedSprite != null && imagePrefab != null)
//         {
//             // 프리팹 생성 및 플레이어 위에 이미지 설정
//             GameObject imageObj = Instantiate(imagePrefab, transform.position + new Vector3(0, 1, 0), Quaternion.identity);
//             imageObj.transform.SetParent(emojiCanvas.transform, false); // 캔버스의 자식으로 설정
            
//             // 이미지 컴포넌트 설정
//             Image imageComponent = imageObj.GetComponent<Image>();
//             if (imageComponent != null)
//             {
//                 imageComponent.sprite = selectedSprite;
//             }
//             else
//             {
//                 Debug.LogError("프리팹에 Image 컴포넌트가 없습니다!");
//             }
//         }
//         else
//         {
//             Debug.LogError("Sprite 또는 ImagePrefab이 설정되지 않았습니다!");
//         }
//     }
// }

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;  // UI 관련 기능을 사용하려면 필요합니다.

public class PlayerClick : MonoBehaviour
{
    private Canvas emojiCanvas;  // 씬에 있는 Canvas 참조

    public Sprite[] buttonSprites;  // 각 버튼의 이미지 (배열로 관리)

    private void Start()
    {
        // 씬에 존재하는 "Emoji" Canvas를 찾아서 참조
        emojiCanvas = GameObject.Find("Emoji").GetComponent<Canvas>();

        if (emojiCanvas != null)
        {
            emojiCanvas.gameObject.SetActive(false);  // 씬 로드 시 바로 캔버스를 비활성화
        }
        else
        {
            Debug.LogError("씬에 'Emoji'라는 이름의 Canvas가 존재하지 않습니다!");
        }
    }

    private void OnMouseDown()
    {
        if (emojiCanvas != null)
        {
            // 플레이어 오브젝트 클릭 시 캔버스 활성화/비활성화
            emojiCanvas.gameObject.SetActive(!emojiCanvas.gameObject.activeSelf);  // 현재 상태를 반전시켜 변경
        }
    }

    // 버튼 클릭 시 호출될 메서드
    public void OnButtonClick(int spriteIndex)
    {
        if (emojiCanvas != null && spriteIndex >= 0 && spriteIndex < buttonSprites.Length)
        {
            // 새 Image 오브젝트를 Canvas에 생성
            GameObject imageObj = new GameObject("EmojiImage");
            imageObj.transform.SetParent(emojiCanvas.transform, false);  // 캔버스의 자식으로 설정
            Debug.LogError("자식 설정 완료");

            // Image 컴포넌트 추가
            Image imageComponent = imageObj.AddComponent<Image>();
            imageComponent.sprite = buttonSprites[spriteIndex];  // 버튼의 이미지를 설정
            Debug.LogError("이미지 설정 완료");

            // 이미지 크기 및 위치 조정 (플레이어 위에 올리기)
            // imageObj.GetComponent<RectTransform>().anchoredPosition = new Vector2(transform.position.x, transform.position.y + 100f);  // 플레이어 위치 위에
            
            // 플레이어 위치를 스크린 좌표로 변환
            Vector3 worldPos = transform.position;  // 플레이어의 월드 좌표
            Vector3 screenPos = Camera.main.WorldToScreenPoint(worldPos);  // 화면 좌표로 변환
            Debug.LogError("좌표 변환");

            // 이미지 크기 및 위치 조정 (플레이어 위치 위에 올리기)
            RectTransform rectTransform = imageObj.GetComponent<RectTransform>();
            rectTransform.position = screenPos;  // 화면 좌표를 RectTransform의 위치에 적용
            Debug.LogError("위치 적용");


            // // 이미지가 일정 시간 후 사라지게 하려면 다음처럼 추가할 수 있습니다.
            // Destroy(imageObj, 2f);  // 2초 후 이미지 제거
            // emojiCanvas.gameObject.SetActive(false);
            emojiCanvas.gameObject.SetActive(!emojiCanvas.gameObject.activeSelf);
        }
    }
}
