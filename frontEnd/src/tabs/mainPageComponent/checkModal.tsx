import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image, Modal, Text } from 'react-native';

interface CheckModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CheckModal: React.FC<CheckModalProps> = ({ visible, onClose, onConfirm }) => {
  const pillData = [
    require('../../assets/images/pill_blue.png'), // 첫 번째 알약 이미지
    require('../../assets/images/pill_purple.png'), // 두 번째 알약 이미지
    require('../../assets/images/pill_yellow.png'), // 세 번째 알약 이미지
  ];

  const [pillAnimations, setPillAnimations] = useState(
    pillData.map(() => ({
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      opacity: new Animated.Value(1),
    }))
  );

  const movePillToCenter = (index: number) => {
    Animated.parallel([
      Animated.spring(pillAnimations[index].position, {
        toValue: { x: 0, y: -100 }, // 항아리 중앙 위치로 이동
        useNativeDriver: true,
      }),
      Animated.timing(pillAnimations[index].opacity, {
        toValue: 0, // 투명도를 0으로 설정
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* 말풍선 추가 */}
          <View style={styles.speechBubble}>
            <Text style={styles.modalText}>아침약💊을 먹여주세요!</Text>
          </View>

          {/* 항아리 아이콘 */}
          <TouchableOpacity onPress={onConfirm} style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/main_pot.png')}
              style={styles.medicationImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* 알약 아이콘들 */}
          <View style={styles.pillContainer}>
            {pillData.map((pillImage, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.pill,
                  {
                    transform: [
                      { translateX: pillAnimations[index].position.x },
                      { translateY: pillAnimations[index].position.y },
                    ],
                  },
                  { opacity: pillAnimations[index].opacity },
                ]}
              >
                <TouchableOpacity onPress={() => movePillToCenter(index)}>
                  <Image
                    source={pillImage} // 알약 이미지
                    style={styles.pillImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute', // 화면 전체를 덮기 위해 position 추가
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000, // 다른 요소 위에 렌더링되도록 설정
  },
  modalContainer: {
    width: 300,
    height: 400,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speechBubble: {
    position: 'absolute',
    top: -70, // 항아리 위로 배치
    width: 200,
    padding: 10,
    backgroundColor: '#F5F6FB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'SF Pro',
    lineHeight: 20,
    letterSpacing: -0.5,
    color: '#9C98E7',
    textAlign: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicationImage: {
    width: '100%',
    height: '100%',
  },
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  pill: {
    width: 50,
    height: 50,
  },
  pillImage: {
    width: '100%',
    height: '100%',
  },
});

export default CheckModal;
