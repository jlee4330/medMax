import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, Text, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import CockModal from './mainPageComponent/cockModal'; 
import CheckModal from './mainPageComponent/checkModal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Webview = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: 'http://3.35.193.176:8080/' }}
      />
    </SafeAreaView>
  );
};

// 메인 컴포넌트
export default function CustomComponent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMedicationModalVisible, setMedicationModalVisible] = useState(false); // 약 복용 체크 모달 상태
  const [roomID, setRoomID] = useState<number | null>(null); // roomID 상태
  const [times, setTimes] = useState<string[]>([]); // 복약 시간 상태
  const [progress, setProgress] = useState(0); // 진행률 값
  const userID = 'user3'; // 부여받은 userID (예시)

  // 서버에서 roomID와 times를 가져오는 useEffect
  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        const response = await fetch(`http://3.35.193.176:7777/mainpage/info?userId=${userID}`);
        const data = await response.json();
        
        if (data && data[0]) {
          const { RoomId, time_first, time_second, time_third } = data[0];
          setRoomID(RoomId); // RoomId 상태 설정
          setTimes([time_first, time_second, time_third]); // times 배열 상태 설정
        } else {
          console.error('Invalid response data');
        }
      } catch (error) {
        console.error('Failed to fetch room info:', error);
      }
    };

    fetchRoomInfo();
  }, [userID]);

  // API 호출을 통해 진행률 값을 가져오는 useEffect
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`http://3.35.193.176:7777/mainpage/progress?roomId=${roomID}`);
        console.log('API Response:', response); // 응답 로그
        const data = await response.json();
        console.log('Data from API:', data); // 응답 데이터 로그
        // TotalCheck 값을 progress 상태에 설정
        if (data && data[0] && data[0].TotalCheck !== undefined) {
          setProgress(data[0].TotalCheck); // TotalCheck 값을 progress에 설정
        } else {
          console.error('No TotalCheck value in response');
        }
      } catch (error) {
        console.error('Failed to fetch progress:', error);
      } 
    };

    fetchProgress();
  }, [roomID]); // roomID가 변경되면 다시 호출

  // 마을 정보 컴포넌트
  const VillageInfo = () => (
    <View style={styles.group7167}>
      <Image
        source={require('../assets/images/capsule.png')}
        style={styles.group288968}
        resizeMode="contain"
      />
      <View style={styles.textAndBarContainer}>
        <Text style={styles.villageText}>마을 123</Text>
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
      {/* WebView */}
      <Webview />

      {/* CustomComponent */}
      <View style={styles.componentContainer}>
        <VillageInfo />
        <PokeButton />
        <MedicationCheckButton />

        {/* CockModal 호출 */}
        <CockModal
          visible={isModalVisible}
          userID={userID} // userID 전달
          roomID={roomID} // roomID 전달
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
          }}
        />

        {/* 약 복용 체크 모달 */}
        <CheckModal
          visible={isMedicationModalVisible}
          userID={userID} // userID 전달
          roomID={roomID} // roomID 전달
          times={times} // 복약 시간 배열 전달
          onClose={() => setMedicationModalVisible(false)}
          onConfirm={() => {
            setMedicationModalVisible(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    position: 'absolute',
    top: windowHeight * 0.2,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webview: {
    width: windowWidth,
    height: windowHeight * 0.7,
  },
  group7167: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    marginTop: -windowHeight * 0.2,
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
    marginTop: windowHeight * 0.01,
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
    width: windowWidth * 0.6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
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
    top: windowHeight * 0.6,
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
    width: windowWidth * 0.14,
    height: windowHeight * 0.06,
    backgroundColor: '#FFDC90',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: windowWidth * 0.02,
  },
  cockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFDC90',
  },
  medicationText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4D4D4D',
    marginTop: windowHeight * 0.005,
  },
  notificationIcon: {
    width: windowWidth * 0.06,
    height: windowHeight * 0.03,
  },
  frame2609176: {
    position: 'absolute',
    width: windowWidth * 0.15,
    height: windowHeight * 0.07,
    left: windowWidth * 0.8,
    top: windowHeight * 0.6,
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
