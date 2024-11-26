using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using NativeWebSocket;

public class GameSystemScript : MonoBehaviour
{
    
    public Dictionary<string, GameObject> playerDict;
    public int num_of_players;
    public string my_id = "";
    public int room_id = 2;
    public Networking networking;
    public WebSocket ws;
    public EmojiPanelScript emojiPanelScript; // EmojiPanelScript 참조
    
    // Start is called before the first frame update
    
    public void changePlayerPosition(string data, int roomID)
    {
        // 데이터를 "&"로 나누어 각 방의 데이터를 추출
        var rooms = data.Split('&');
        
        foreach (var room in rooms)
        {
            // roomID와 player 정보를 분리
            var roomData = room.Split('#', 2); // roomID&playerList 형식이므로 "&"를 기준으로 나눔

            if (roomData.Length < 2) continue;

            var currentRoomID = int.Parse(roomData[0]);
            var playerData = roomData[1];

            // roomID가 일치하는 경우 플레이어 리스트를 파싱
            if (currentRoomID == roomID)
            {
                var players = playerData.Split('/');

                foreach (var player in players)
                {
                    var playerInfo = player.Split(',');
                    if (playerInfo.Length == 3)
                    {
                        var id = playerInfo[0];
                        if (id == my_id){
                            if(!playerDict.ContainsKey(id)){
                                GameObject otherPlayer = Resources.Load<GameObject>("player");
                                GameObject clone = Instantiate(otherPlayer, new Vector3(float.Parse(playerInfo[1]), float.Parse(playerInfo[2]), 0), Quaternion.identity);
                                playerDict.Add(id, clone);

                                // // PlayerClick 추가 및 Canvas Prefab 연결
                                // var playerClick = clone.AddComponent<PlayerClick>();
                                // playerClick.canvasPrefab = Resources.Load<GameObject>("Emoji"); // Prefab 연결
                                // emojiPanelScript.SetSelectedPlayer(otherPlayer);
                            }
                            else{
                                playerDict[id].transform.GetComponent<NewBehaviourScript>().targetDirection = (new Vector3(float.Parse(playerInfo[1]), float.Parse(playerInfo[2]), 0));
                                
                            }
                        }
                        else{
                            if(!playerDict.ContainsKey(id)){
                                GameObject otherPlayer = Resources.Load<GameObject>("OtherPlayer");
                                GameObject clone = Instantiate(otherPlayer, new Vector3(float.Parse(playerInfo[1]), float.Parse(playerInfo[2]), 0), Quaternion.identity);
                                playerDict.Add(id, clone);
                            }
                            else{
                                
                                playerDict[id].transform.GetComponent<NewBehaviourScript>().targetDirection = (new Vector3(float.Parse(playerInfo[1]), float.Parse(playerInfo[2]), 0));
                            }
                        }
                    }
                }

                break; // 해당 roomID를 찾았으므로 종료
            }
        }

    }
    void Start()
    {
        networking = GetComponent<Networking>();
        playerDict = new Dictionary<string, GameObject>(); 
        ws = networking.ws;

        ws.OnMessage += (bytes) =>
        {
            var byteStr = System.Text.Encoding.UTF8.GetString(bytes);
            string[] pos_arr_all = byteStr.Split('/');
            switch (pos_arr_all[0]){
                case "allpos":
                    changePlayerPosition(byteStr.Substring(7), room_id);
                    // foreach(string pos_arr_str in pos_arr_all){
                    //     if (pos_arr_str == "allpos") continue;
                    //     string[] id_pos = pos_arr_str.Split(',');
                        
                    //     int id = int.Parse(id_pos[0]);
                    //     if (id == my_id){
                    //         if(!playerDict.ContainsKey(id)){
                    //             GameObject otherPlayer = Resources.Load<GameObject>("player");
                    //             GameObject clone = Instantiate(otherPlayer, new Vector3(float.Parse(id_pos[1]), float.Parse(id_pos[2]), 0), Quaternion.identity);
                    //             playerDict.Add(id, clone);
                    //         }
                    //         else{
                    //             // Debug.Log(id_pos[0] +  id_pos[1] + id_pos[2]);
                    //             playerDict[id].transform.GetComponent<NewBehaviourScript>().targetDirection = (new Vector3(float.Parse(id_pos[1]), float.Parse(id_pos[2]), 0));
                    //         }
                    //     }
                    //     else{
                    //         if(!playerDict.ContainsKey(id)){
                    //             GameObject otherPlayer = Resources.Load<GameObject>("OtherPlayer");
                    //             GameObject clone = Instantiate(otherPlayer, new Vector3(float.Parse(id_pos[1]), float.Parse(id_pos[2]), 0), Quaternion.identity);
                    //             playerDict.Add(id, clone);
                    //         }
                    //         else{
                    //             // Debug.Log(id_pos[0] +  id_pos[1] + id_pos[2]);
                    //             playerDict[id].transform.GetComponent<NewBehaviourScript>().targetDirection = (new Vector3(float.Parse(id_pos[1]), float.Parse(id_pos[2]), 0));
                    //         }
                    //     }
                    // }
                    break;
                default:
                    break;
            };
        };
        // num_of_players = 0;
    }

    // Update is called once per frame
    void Update()
    {

    }
}
