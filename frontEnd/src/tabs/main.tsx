// main.tsx -> final
import React, { useState, useEffect, useRef } from 'react';
import { Platform, SafeAreaView, StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import CockModal from './mainPageComponent/cockModal'; 
import CheckModal from './mainPageComponent/checkModal';
import DeviceInfo from 'react-native-device-info';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function CustomComponent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMedicationModalVisible, setMedicationModalVisible] = useState(false);
  const [roomID, setRoomID] = useState<number | null>(null);
  const [times, setTimes] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [userID, setUserId] = useState<string>('');
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        setUserId(deviceId);
      } catch (error) {
        console.error('Failed to get device ID:', error);
      }
    };

    fetchUserId();
  }, []); // 빈 배열로 첫 렌더링 시 한 번만 실행

  useEffect(() => {
    console.log(userID);
    if (!userID) return;
    const fetchRoomInfo = async () => {
      try {
        const response = await fetch(`http://3.35.193.176:7777/mainpage/info?userId=${userID}`);
        const data = await response.json();
        
        if (data && data[0]) {
          const { RoomId, time_first, time_second, time_third } = data[0];
          setRoomID(RoomId);
          setTimes([time_first, time_second, time_third]);
        } else {
          console.error('Invalid response data');
        }
      } catch (error) {
        console.error('Failed to fetch room info:', error);
      }
    };

    fetchRoomInfo();
  }, [userID]);

  useEffect(() => {
    if (!roomID) return;
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://3.35.193.176:7777/mainpage/progress?roomId=${roomID}`);
        const data = await response.json();
        if (data && data[0] && data[0].TotalCheck !== undefined) {
          setProgress(data[0].TotalCheck);
        } else {
          console.error('No TotalCheck value in response');
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      }
    };

    fetchProgress();
  }, [roomID]);

    // 마을 정보 컴포넌트
  const VillageInfo = () => (
    <View style={styles.group7167}>
      <Image
        source={require('../assets/images/capsule.png')}
        style={styles.group288968}
        resizeMode="contain"
      />
      <View style={styles.textAndBarContainer}>
        <Text style={styles.villageText}>
          {roomID !== null ? `마을 ${roomID}` : '마을0111'}
        </Text>
        <View style={styles.barGraphRow}>
          <View style={styles.barGraphContainer}>
            <View style={[styles.barSegment, { flex: progress / 10, backgroundColor: '#A6A2E9' }]} />
            <View style={[styles.barSegment, { flex: (100 - progress) / 10, backgroundColor: '#F5F5FD' }]} />
          </View>
          <Text style={styles.percentageText}>{progress}%</Text> {/* 퍼센티지 표시 */}
        </View>
      </View>
    </View>
  );

  // 콕 찌르기 컴포넌트
  const PokeButton = () => (
    <TouchableOpacity
      style={styles.group288915}
      onPress={() => setModalVisible(true)}
    >
      <View style={styles.intersect}>
        <Image
          source={require('../assets/images/bell.png')}
          style={styles.notificationIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cockText}>콕 찌르기</Text>
        <Text style={styles.medicationText}>복약을 응원해 주세요! </Text>
      </View>
    </TouchableOpacity>
  );
  // 약 복용 체크 컴포넌트
  const MedicationCheckButton = () => (
    <TouchableOpacity
      style={styles.frame2609176}
      onPress={() => setMedicationModalVisible(true)} // 약 복용 체크 모달 표시
    >
      <Image
        source={require('../assets/images/medication.png')}
        style={styles.medicationImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Village Information Component */}
          <VillageInfo /> {/* 마을 정보 컴포넌트 */}
          
          {/* WebView */}
          <View style={styles.webview}>
            <WebView
              ref={webViewRef}
              source={{ uri: `http://3.35.193.176:8080/?userId=${userID}` }}
              javaScriptEnabled
              originWhitelist={['*']} // Allow all origins
              allowsInlineMediaPlayback
              startInLoadingState
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.error('WebView error:', nativeEvent);
              }}
              style={{ flex: 1 }}
            />
          </View>
    
          {/* Floating Buttons */}
          <PokeButton />
          <MedicationCheckButton />
    
          {/* CockModal 호출 */}
          <CockModal
            visible={isModalVisible}
            userID={userID}
            roomID={roomID}
            onClose={() => setModalVisible(false)}
            onConfirm={() => {
              setModalVisible(false);
            }}
          />
    
          {/* 약 복용 체크 모달 */}
          <CheckModal
            visible={isMedicationModalVisible}
            userID={userID}
            roomID={roomID}
            times={times}
            onClose={async () => {
              setMedicationModalVisible(false);
          
              // CheckModal이 닫힐 때 progress 데이터 업데이트
              if (roomID) {
                try {
                  const response = await fetch(`http://3.35.193.176:7777/mainpage/progress?roomId=${roomID}`);
                  const data = await response.json();
                  if (data && data[0] && data[0].TotalCheck !== undefined) {
                    setProgress(data[0].TotalCheck);
                  } else {
                    console.error('No TotalCheck value in response');
                  }
                } catch (error) {
                  console.error('Failed to fetch progress:', error);
                }
              }
            }}
            onConfirm={() => {
              setMedicationModalVisible(false);
            }}
          />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: windowWidth,
    height: windowHeight - 60,
    zIndex : Platform.OS === 'ios' ? -1 : 0,
  },
  group7167: {
    position: 'absolute', // Ensure absolute positioning
    top: Platform.OS === 'ios' ? windowHeight * 0.07 : windowHeight * 0.03, // iOS와 안드로이드 위치 차이 설정
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    marginHorizontal: windowWidth * 0.05,
    backgroundColor: '#FFFFFF',
    borderRadius: 15.93,
    shadowColor: '#E7E7EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.03,
  },
  group288968: {
    width: windowWidth * 0.15,
    height: windowHeight * 0.1,
  },
  villageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4D4D4D',
    marginLeft: windowWidth * 0.03,
  },
  textAndBarContainer: {
    flex: 1,
    
  },
  barGraphRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  barGraphContainer: {
    flexDirection: 'row',
    height: windowHeight * 0.015,
    width: windowWidth * 0.55,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: windowWidth * 0.03
  },
  barSegment: {
    height: '100%',
  },
  percentageText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#4D4D4D',
  },
  group288915: {
    position: 'absolute',
    width: windowWidth * 0.5,
    height: windowHeight * 0.06,
    left: windowWidth * 0.05,
    bottom: windowHeight * 0.03, // Adjusted relative to navigation bar
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  intersect: {
    width: windowWidth * 0.13,
    height: windowHeight * 0.06,
    backgroundColor: '#FFDC90',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: windowWidth * 0.03,
    paddingVertical: 8,
  },
  cockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFDC90',
    lineHeight: 18
  },
  medicationText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4D4D4D',
    marginTop: windowHeight * 0.002,
  },
  notificationIcon: {
    width: windowWidth * 0.06,
    height: windowHeight * 0.03,
  },
  frame2609176: {
    position: 'absolute',
    width: windowWidth * 0.14,
    height: windowHeight * 0.06,
    left: windowWidth * 0.8,
    bottom: windowHeight * 0.03, // Adjusted relative to navigation bar
    backgroundColor: '#FFDC90',
    borderRadius: windowWidth * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationImage: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.05,
  },
});
