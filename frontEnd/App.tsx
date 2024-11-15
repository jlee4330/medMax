import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

import HomeScreen from './src/tabs/main';
import SettingsScreen from './src/tabs/mypage';
import QnAScreen from './src/tabs/qna';

enableScreens();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
              height: 60,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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
            component={QnAScreen}
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
