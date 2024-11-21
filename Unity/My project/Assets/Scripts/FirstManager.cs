using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class FirstManager : MonoBehaviour
{
    public void clickLogin()
    {
    SceneManager.LoadScene("Login");
    }
    public void clickSignUp()
    {
    SceneManager.LoadScene("SignUp");
    }
}

