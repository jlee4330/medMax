import React, { useState } from 'react';
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
        source={{ uri: 'http://3.35.193.176:8000/'}}
      />
    </SafeAreaView>
  );
};

// 메인 컴포넌트
export default function CustomComponent() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isMedicationModalVisible, setMedicationModalVisible] = useState(false); // 약 복용 체크 모달 상태
  const userID = 'user123'; // 부여받은 userID (예시)
  const roomID = 1; // 현재 방 ID (int 형식)

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
            <View style={[styles.barSegment, { flex: 4, backgroundColor: '#A6A2E9' }]} />
            <View style={[styles.barSegment, { flex: 2, backgroundColor: '#F5F5FD' }]} />
          </View>
          <Text style={styles.percentageText}>67%</Text> {/* 퍼센티지 표시 */}
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
        <Text style={styles.medicationText}>아직 미복용 12명</Text>
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
    borderRadius: windowWidth * 0.1,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 5.33 },
    shadowOpacity: 1,
    shadowRadius: 5.33,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationImage: {
    width: '90%',
    height: '90%',
  },
});
