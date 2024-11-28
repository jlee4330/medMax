import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
//설치시 navigation과 버전을 맞추기 위해 npm install @react-navigation/stack@^6 로 설치하세요 !!
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image, View } from 'react-native';

import HomeScreen from './src/tabs/main';
import SettingsScreen from './src/tabs/mypage';
import QnAScreen from './src/tabs/qna';
//import WelcomeScreen from './src/tabs/welcome';
import SurveyScreen from './src/tabs/survey';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import config from './src/config';

enableScreens();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
              height: 60,
              backgroundColor: '#ffffff',
              // borderTopLeftRadius: 20,
              // borderTopRightRadius: 20,
              paddingTop: 5,
            },
            tabBarLabelStyle: {
              marginBottom: 8,
              fontSize: 12,
            },
            tabBarActiveTintColor: '#6667AB',
            tabBarInactiveTintColor: '#8E8E93',
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="Question"
            component={QnAScreen} //여기 바꿔가면서 일단 하고, 라우팅은 StackNavigator 어케 해결해보기 ㅠ
            options={{
              title: '질문하기',
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={require('./src/assets/images/icon1.png')}
                  style={{
                    width: 24, 
                    height: 24,
                    tintColor: focused ? '#6667AB' : '#8E8E93'
                  }} 
                />
              ),
            }} 
          />
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: '홈',
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={require('./src/assets/images/icon2.png')}
                  style={{ 
                    width: 24, 
                    height: 24,
                    tintColor: focused ? '#6667AB' : '#8E8E93'
                  }} 
                />
              ),
            }} 
          />
          <Tab.Screen 
            name="MyPage" 
            component={SettingsScreen}
            options={{
              title: '마이 페이지',
              tabBarIcon: ({ focused }) => (
                <Image 
                  source={require('./src/assets/images/icon3.png')}
                  style={{ 
                    width: 24, 
                    height: 24,
                    tintColor: focused ? '#6667AB' : '#8E8E93'
                  }} 
                />
              ),
            }} 
          />
        </Tab.Navigator>
  );
}


function App() {
  const [initialRoute, setInitialRoute] = useState<boolean | null>(null);
  useEffect(() => {
    const checkDeviceId = async () => {
      try {
        const deviceId : string = await DeviceInfo.getUniqueId();
        console.log("Device ID:", deviceId);
        const response = await axios.get(`${config.backendUrl}/mainPage/getIds`, 
          { params: { 
            uID: deviceId 
          } }
        );
        const result = response.data;
        console.log("Get response:", result);
        if (result && result.length > 0) {
          setInitialRoute(true);
        } else {
          setInitialRoute(false);
        }
      } catch (error) {
        console.error("Error checking device ID:", error);
        setInitialRoute(false);
      }
    };
    checkDeviceId();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }} />
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute ? "MainTabs" : "Survey"}>
          {/* SurveyScreen을 첫 화면으로 */}
          <Stack.Screen
            name="Survey"
            component={SurveyScreen}
            options={{ headerShown: false }} // 헤더 숨김
          />
          {/* TabNavigator 추가 */}
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;





