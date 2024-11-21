using UnityEngine;

public class GameData : MonoBehaviour
{
    public static GameData Instance { get; private set; }

    public bool IsLogin { get; set; }

    // UserID와 RoomID를 저장하는 속성
    public string UserID { get; set; }
    public int RoomID { get; set; }

    // 복약시간 속성들 추가
    public string MedicationTime1 { get; set; }
    public string MedicationTime2 { get; set; }
    public string MedicationTime3 { get; set; }

    private void Awake()
    {
        // 싱글톤 패턴 구현
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);  // 씬 전환 후에도 오브젝트가 파괴되지 않도록
        }
        else
        {
            Destroy(gameObject);  // 중복된 인스턴스를 제거
        }
    }
}
