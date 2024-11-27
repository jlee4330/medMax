using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class DebuggingScript : MonoBehaviour, IPointerClickHandler // IPointerClickHandler 인터페이스 추가
{
    public RawImage panelImage;
    public Color clickColor = Color.red;

    private Texture2D panelTexture;

    void Start()
    {
        Debug.Log("start");
        if (panelImage == null)
        {
            Debug.LogError("RawImage가 할당되지 않았습니다.");
            return;
        }

        if (panelImage.texture is Texture2D sourceTexture)
        {
            panelTexture = new Texture2D(sourceTexture.width, sourceTexture.height, sourceTexture.format, false);
            panelTexture.SetPixels(sourceTexture.GetPixels());
            panelTexture.Apply();
            panelImage.texture = panelTexture;
        }
        else
        {
            Debug.LogError("RawImage 텍스처가 Texture2D 형식이 아닙니다.");
        }
    }

    // IPointerClickHandler의 OnPointerClick 메서드 구현
     public void OnPointerClick(PointerEventData eventData)
{
    if (panelTexture == null) return;
    Debug.Log(panelTexture);

    // 클릭 위치 계산
    RectTransformUtility.ScreenPointToLocalPointInRectangle(
        panelImage.rectTransform,
        eventData.position,
        eventData.pressEventCamera,
        out Vector2 localPoint
    );

    Rect rect = panelImage.rectTransform.rect;
    float xNormalized = (localPoint.x - rect.xMin) / rect.width;
    float yNormalized = (localPoint.y - rect.yMin) / rect.height;

    int texX = Mathf.FloorToInt(xNormalized * panelTexture.width);
    int texY = Mathf.FloorToInt(yNormalized * panelTexture.height);

    if (texX >= 0 && texX < panelTexture.width && texY >= 0 && texY < panelTexture.height)
    {
        
        panelTexture.SetPixel(texX, texY, clickColor);
        panelTexture.Apply();
        
        // 변경된 텍스처를 RawImage에 다시 설정
        panelImage.texture = panelTexture;
    }
}
}
