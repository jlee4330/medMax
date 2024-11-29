// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, FlatList, ScrollView } from 'react-native';

// interface CockModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
// }

// const CockModal: React.FC<CockModalProps> = ({ visible, onClose, onConfirm }) => {
//   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
//   const [userList, setUserList] = useState<{ id: string, name: string, lastActive: string }[]>([]);

//   useEffect(() => {
//     const fetchUserData = async () => {
//         // const currentTime = '2024-11-19T14:00:00';
//       const currentTime = new Date().toISOString(); // 현재 시각을 ISO 형식으로 가져옴
//       try {
//         const response = await fetch(`http://143.248.200.170:7777/mainPage/candidate?userId=user1&roomId=1&time=${currentTime}`);
//         const data = await response.json();
        
//         // 서버에서 받은 데이터를 기반으로 userList 상태 업데이트
//         const users = data.map((user: { UserID: string }) => ({
//           id: user.UserID, // UserID를 id로 사용
//           name: '수현', // 이름을 모두 '수현'으로 고정
//           lastActive: '4시간 전 접속', // 마지막 접속 시간도 고정
//         }));
//         setUserList(users); // 상태 업데이트
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (visible) {
//       fetchUserData(); // 모달이 보일 때만 데이터 요청
//     }
//   }, [visible]);

//   const renderUser = ({ item }: { item: { name: string; lastActive: string; id: string } }) => {
//     const isSelected = selectedUserId === item.id;

//     const handleBellPress = () => {
//       setSelectedUserId(isSelected ? null : item.id); // 선택된 사용자가 다시 클릭되면 해제
//     };

//     return (
//       <View style={styles.group7187}>
//         <View style={styles.rectangle22585} />
//         <Text style={styles.groupText}>{item.name}</Text>
//         <Text style={styles.groupTime}>{item.lastActive}</Text>
//         <TouchableOpacity
//           style={[styles.frame2609254, isSelected && styles.selectedBell]} // 선택된 경우 스타일 추가
//           onPress={handleBellPress}
//         >
//           <Image
//             source={require('../../assets/images/bell.png')}
//             style={styles.bellIcon}
//           />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Image
//               source={require('../../assets/images/close.png')}
//               style={styles.closeIcon}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>

//           <Text style={styles.modalTitle}>알림 보내기</Text>

//           <ScrollView style={styles.scrollContainer}>
//             <FlatList
//               data={userList}
//               renderItem={renderUser}
//               keyExtractor={(item) => item.id}
//             />
//           </ScrollView>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//               <Text style={styles.buttonText}>취소</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
//               <Text style={styles.buttonText}>완료</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     maxHeight: '90%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     padding: 30,
//     alignItems: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     width: 25,
//     height: 25,
//   },
//   closeIcon: {
//     width: '80%',
//     height: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   group7187: {
//     position: 'relative',
//     width: 268,
//     height: 64,
//     marginBottom: 10,
//   },
//   rectangle22585: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#F7F7F7',
//     borderRadius: 8,
//   },
//   groupText: {
//     position: 'absolute',
//     left: 10,
//     top: 10,
//     fontFamily: 'SF Pro',
//     fontWeight: '500',
//     fontSize: 16,
//     lineHeight: 19,
//     color: 'rgba(0, 0, 0, 0.7)',
//   },
//   groupTime: {
//     position: 'absolute',
//     left: 10,
//     top: 35,
//     fontFamily: 'SF Pro',
//     fontWeight: '500',
//     fontSize: 11,
//     lineHeight: 13,
//     color: 'rgba(0, 0, 0, 0.7)',
//     opacity: 0.4,
//   },
//   frame2609254: {
//     position: 'absolute',
//     width: 39,
//     height: 39,
//     right: 10,
//     top: 12,
//     backgroundColor: '#9C98E7',
//     borderRadius: 4,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   selectedBell: {
//     backgroundColor: '#D3D3D3', // 회색 배경을 설정
//   },
//   bellIcon: {
//     width: 24,
//     height: 24,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 10,
//   },
//   cancelButton: {
//     flex: 1,
//     marginRight: 10,
//     backgroundColor: '#CECECE',
//     borderRadius: 8,
//     padding: 10,
//     alignItems: 'center',
//   },
//   confirmButton: {
//     flex: 1,
//     backgroundColor: '#FFDC90',
//     borderRadius: 8,
//     padding: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   scrollContainer: {
//     maxHeight: 250,
//     width: '100%',
//     marginBottom: 20,
//   },
// });


///CockModal.tsx;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, FlatList, ScrollView } from 'react-native';

interface CockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userID: string; // userID 추가
  roomID: number; // roomID를 props로 받음
}

const CockModal: React.FC<CockModalProps> = ({ visible, onClose, userID, roomID }) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userList, setUserList] = useState<{ id: string, name: string, lastActive: string }[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      // const currentTime = '2024-11-19T14:00:00';
      const currentTime = new Date().toISOString(); // 현재 시각을 ISO 형식으로 가져옴
      try {
        const response = await fetch(`http://3.35.193.176:7777/mainPage/candidate?userId=${userID}&roomId=${roomID}&time=${currentTime}`);
        const data = await response.json();

        // data가 배열인지 확인
        if (Array.isArray(data)) {
          const users = data.map((user: { username: string }) => ({
            id: user.username,
            name: user.username,
            lastActive: '친구의 복약을 응원해요!',
          }));
          setUserList(users);
        } else {
          console.error('데이터가 배열이 아닙니다:', data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (visible) {
      fetchUserData(); // 모달이 보일 때만 데이터 요청
    }
  }, [visible]);

  const handleConfirm = async () => {
    if (selectedUserId) {
      // const currentTime = '2024-11-19T14:00:00';
      const currentTime = new Date().toISOString(); // 현재 시간 (ISO 형식)
      try {
        // URL에 파라미터를 쿼리 문자열로 추가
        const url = `http://3.35.193.176:7777/mainpage/poke?uto=${selectedUserId}&ufrom=${userID}&when=${currentTime}`;
    
        const response = await fetch(url, {
          method: 'GET',  // GET 방식으로 요청
        });
      } catch (error) {
        console.error('Error sending poke:', error);
        // alert('네트워크 오류가 발생했습니다.');
      }
    }
  
    onClose(); // 모달 닫기
  };

  const renderUser = ({ item }: { item: { name: string; lastActive: string; id: string } }) => {
    const isSelected = selectedUserId === item.id;

    const handleBellPress = () => {
      setSelectedUserId(isSelected ? null : item.id); // 선택된 사용자가 다시 클릭되면 해제
    };

    return (
      <View style={styles.group7187}>
        <View style={styles.rectangle22585} />
        <Text style={styles.groupText}>{item.name}</Text>
        <Text style={styles.groupTime}>{item.lastActive}</Text>
        <TouchableOpacity
          style={[styles.frame2609254, isSelected && styles.selectedBell]}
          onPress={handleBellPress}
        >
          <Image
            source={require('../../assets/images/bell.png')}
            style={styles.bellIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={require('../../assets/images/close.png')}
            style={styles.closeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.modalTitle}>알림 보내기</Text>

        {/* ScrollView 제거 */}
        <FlatList
          data={userList}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }} // 여유 공간 추가
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>
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
  },
  modalContent: {
    width: '80%',
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 25,
    height: 25,
  },
  closeIcon: {
    width: '80%',
    height: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  group7187: {
    position: 'relative',
    width: 268,
    height: 64,
    marginBottom: 10,
  },
  rectangle22585: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
  },
  groupText: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontFamily: 'SF Pro',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  groupTime: {
    position: 'absolute',
    left: 10,
    top: 35,
    fontFamily: 'SF Pro',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 13,
    color: 'rgba(0, 0, 0, 0.7)',
    opacity: 0.4,
  },
  frame2609254: {
    position: 'absolute',
    width: 39,
    height: 39,
    right: 10,
    top: 12,
    backgroundColor: '#9C98E7',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBell: {
    backgroundColor: '#D3D3D3',
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#CECECE',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FFDC90',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    maxHeight: 250,
    width: '100%',
    marginBottom: 20,
  },
});

export default CockModal;