using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObjectSpawner : MonoBehaviour
{
    // Start is called before the first frame update
    [SerializeField]
    private GameObject player;
    void Start()
    {
        Instantiate(player, new Vector3(0,0,0), Quaternion.identity);
        Instantiate(player, new Vector3(0,5,0), Quaternion.identity);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
