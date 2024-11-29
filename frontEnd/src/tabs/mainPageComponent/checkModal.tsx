// checkModal.tsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Image, Modal, Text } from 'react-native';

interface CheckModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
  userID: string;
  times: string[];
}

const CheckModal: React.FC<CheckModalProps> = ({ visible, onClose, onConfirm, userID, times }) => {
  const pillData = [
    require('../../assets/images/pill_blue.png'),
    require('../../assets/images/pill_purple.png'),
    require('../../assets/images/pill_yellow.png'),
  ];

  const [pillAnimations, setPillAnimations] = useState(
    pillData.map(() => ({
      position: new Animated.ValueXY({ x: 0, y: 0 }),
      opacity: new Animated.Value(1),
    }))
  );

  const [timeEaten, setTimeEaten] = useState<{ [key: string]: string }>({
    medicineCheck1: "0",
    medicineCheck2: "0",
    medicineCheck3: "0",
  });

  const fetchTimeEaten = async () => {
    try {
      console.log(userID);
      const response = await fetch(`http://3.35.193.176:7777/mainPage/checkmed?userId=${userID}`);
      const data = await response.json();
      if (data && data.length > 0) {
        // 서버에서 가져온 복약 상태를 바로 반영
        setTimeEaten({
          medicineCheck1: data[0].medicineCheck1 || "0",
          medicineCheck2: data[0].medicineCheck2 || "0",
          medicineCheck3: data[0].medicineCheck3 || "0",
        });
      }
    } catch (error) {
      console.error("Error fetching timeEaten:", error);
    }
  };

  useEffect(() => {
    if (visible) {
      if(!Object.values(timeEaten).some((value) => value === "1")){
        fetchTimeEaten();
      }
      // fetchTimeEaten();
    }
  }, [visible]);

  const sendTimeEatenToServer = async (time: string, pillKey: string) => {
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const isoTime = `${currentDate}T${time}`;

      const response = await fetch(
        `http://3.35.193.176:7777/mainpage/eatMed?userId=${userID}&time=${isoTime}`,
        { method: 'GET' }
      );

      if (response.ok) {
        console.log('복약 여부가 서버에 업데이트되었습니다.');

        // 복약 상태를 로컬에서도 업데이트
        setTimeEaten((prev) => ({
          ...prev,
          [pillKey]: "1", // 현재 복약한 키를 "1"로 변경
        }));
      } else {
        console.error('서버로 복약 여부를 업데이트하는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버에 복약 여부를 전송하는 중 오류 발생:', error);
    }
  };

  const movePillToCenter = (index: number) => {
    Animated.parallel([
      Animated.spring(pillAnimations[index].position, {
        toValue: { x: 0, y: -300 },
        useNativeDriver: true,
      }),
      Animated.timing(pillAnimations[index].opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setPillAnimations((prevAnimations) => {
        // 기존 애니메이션 배열을 복사하고 값을 수정
        const updatedAnimations = [...prevAnimations];
        updatedAnimations[index] = {
          position: new Animated.ValueXY({ x: 0, y: 0 }), // 위치 초기화
          opacity: new Animated.Value(1), // 불투명도 초기화
        };
        return updatedAnimations;
      });
    });
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
          <View style={styles.speechBubble}>
            <Text style={styles.modalText}>약💊을 먹여주세요!</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/main_pot.png')}
              style={styles.medicationImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={styles.pillContainer}>
            {pillData.map((pillImage, index) => {
              console.log(userID);
              const pillKey = `medicineCheck${index + 1}`;
              console.log('pillKey:', pillKey); // pillKey 값 출력
              console.log(timeEaten[pillKey]);
              const isEaten = (timeEaten[pillKey] === "1"); // 복약 여부 체크
              console.log('isEaten:', isEaten); // isEaten 값 출력

              if (timeEaten[pillKey] == "1") {
                // 복약 완료 시 아무것도 렌더링하지 않음
                console.log('복약이 완료된 알약입니다');
                return null;
              }
              else{
                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.pill,
                      {
                        transform: [
                          { translateX: pillAnimations[index]?.position?.x },
                          { translateY: pillAnimations[index]?.position?.y },
                        ],
                      },
                      { opacity: pillAnimations[index]?.opacity },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        movePillToCenter(index);
                        onConfirm(times[index]);
                        sendTimeEatenToServer(times[index], pillKey);
                      }}
                    >
                      {pillImage && (
                        <Image
                          source={pillImage}
                          style={styles.pillImage}
                          resizeMode="contain"
                        />
                      )}  
                      <Text style={styles.timeText}>{times[index]}</Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              }
            })}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modalContainer: {
    width: 280, // 모달 크기 조정
    height : 500,
    padding: 20,
    backgroundColor: 'white', // 하얀색 배경
    borderRadius: 16, // 모서리 둥글게
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: 'rgba(0, 0, 0, 0.1)', // 그림자 효과
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  speechBubble: {
    position: 'absolute',
    top: 30,
    width: 180,
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
    lineHeight: 20,
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
    width: '80%',
    height: '80%',
    top : 100,
  },
  pillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    top : -50,
  },
  pill: {
    width: 50,
    height: 50,
  },
  pillImage: {
    width: '100%',
    height: '100%',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default CheckModal;

