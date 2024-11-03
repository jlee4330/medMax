import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function CustomComponent() {
  return (
    <View style={styles.container}>
      {/* Group 288915 - 콕 찌르기 */}
      <View style={styles.group288915}>
        <View style={styles.intersect} />
        <Text style={styles.cockText}>콕 찌르기</Text>
        <Text style={styles.medicationText}>아직 미복용 12명</Text>
        <Image
          source={require('../assets/images/bell.png')}
          style={styles.notificationIcon}
          resizeMode="contain"
        />
      </View>

      {/* Frame 2609176 - 약 복용 체크 */}
      <View style={styles.frame2609176}>
        <Image
          source={require('../assets/images/medication.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Group 7167 - 마을 정보 */}
      <View style={styles.group7167}>
        <Text style={styles.villageText}>마을 123</Text>
        <Image
          source={require('../assets/images/capsule.png')}
          style={styles.group288968}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  group288915: {
    position: 'absolute',
    width: 187,
    height: 50,
    left: 16,
    top: 683.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  cockText: {
    position: 'relative',
    left: '36%',
    top: '-80%',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFDC90',
  },
  medicationText: {
    position: 'relative',
    left: '36%',
    top: '-70%',
    fontSize: 14,
    fontWeight: '700',
    color: '#4D4D4D',
  },
  intersect: {
    position: 'relative',
    width: 51.19,
    height: 50,
    left: 0,
    backgroundColor: '#FFDC90',
    borderRadius: 12,
  },
  notificationIcon: {
    position: 'relative',
    width: 24,
    height: 24,
    top: '-185%',
    left: '6%',
  },
  frame2609176: {
    position: 'absolute',
    width: 55,
    height: 55,
    left: 322,
    top: 681,
    backgroundColor: '#FFDC90',
    borderRadius: 400,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 5.33 },
    shadowOpacity: 1,
    shadowRadius: 5.33,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '196%',
    height: '196%',
  },
  group7167: {
    position: 'absolute',
    width: 360,
    height: 82.32,
    left: 17,
    top: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 15.93,
    shadowColor: '#E7E7EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  villageText: {
    position: 'relative',
    left: '25%',
    top: '20%',
    fontSize: 19.9167,
    fontWeight: 'bold',
    color: '#4D4D4D',
  },
  group288968: {
    position: 'absolute',
    width: 57.66,
    height: 56,
    left: '4%',
    top: '15%',
  },
});
