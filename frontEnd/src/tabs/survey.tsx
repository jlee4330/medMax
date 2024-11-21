import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, FlatList, TextInput, } from 'react-native';

// const SurveyScreen = ({ route }: { route: any }) => {
//   const { userName } = route.params;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>안녕하세요, {userName}님!</Text>
//       <Text style={styles.subtitle}>설문조사를 시작해볼까요?</Text>
//     </SafeAreaView>
//   );
// };
// //이건 라우팅 완료되면 username 잘 넘어오나 확인하자

const SurveyScreen = ({ navigation }: { navigation: any }) => {
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const drugOptions = ['항우울제', '고지혈증', '당뇨병'];
  const frequencyOptions = [1, 2, 3, 4, 5];

  // 만성질환 선택 핸들러
  const toggleDrugSelection = (drug: string) => {
    if (selectedDrugs.includes(drug)) {
      setSelectedDrugs(selectedDrugs.filter((item) => item !== drug));
    } else {
      setSelectedDrugs([...selectedDrugs, drug]);
    }
  };

  // 복약 빈도 선택 핸들러
  const handleFrequencySelection = (value: number) => {
    setFrequency(value);
    setTimeSlots(Array(value).fill('')); // 빈 시간대 배열 초기화
  };

  // 시간대 입력 핸들러
  const handleTimeSlotChange = (index: number, value: string) => {
    const updatedSlots = [...timeSlots];
    updatedSlots[index] = value;
    setTimeSlots(updatedSlots);
  };

  const handleNext = () => {
    if (!selectedDrugs.length) {
      alert('복용하는 약을 선택해주세요!');
      return;
    }
    if (!frequency) {
      alert('복약 빈도를 선택해주세요!');
      return;
    }
    if (timeSlots.some((slot) => !slot.trim())) {
      alert('모든 복약 시간대를 입력해주세요!');
      return;
    }
    // 다음 화면으로 이동
    navigation.navigate('NextScreen', { selectedDrugs, frequency, timeSlots });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>유형을 선택해주세요</Text>
      <Text style={styles.subtitle}>사용자의 복약 유형에 따라 적합한 커뮤니티로 배정됩니다</Text>

      {/* 복용하는 약 */}
      <Text style={styles.sectionTitle}>복용하는 약은 어떤 만성질환을 위한 건가요?</Text>
      <View style={styles.optionsContainer}>
        {drugOptions.map((drug) => (
          <TouchableOpacity
            key={drug}
            style={[
              styles.optionButton,
              selectedDrugs.includes(drug) && styles.selectedOptionButton,
            ]}
            onPress={() => toggleDrugSelection(drug)}
          >
            <Text
              style={[
                styles.optionText,
                selectedDrugs.includes(drug) && styles.selectedOptionText,
              ]}
            >
              {drug}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 복약 빈도 */}
      <Text style={styles.sectionTitle}>하루에 약을 먹는 빈도는 어떻게 되나요?</Text>
      <View style={styles.optionsContainer}>
        {frequencyOptions.map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.optionButton,
              frequency === value && styles.selectedOptionButton,
            ]}
            onPress={() => handleFrequencySelection(value)}
          >
            <Text
              style={[
                styles.optionText,
                frequency === value && styles.selectedOptionText,
              ]}
            >
              {value}회
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 복약 시간대 */}
      <Text style={styles.sectionTitle}>각각의 복약 시간대는 어떻게 되나요?</Text>
      <FlatList
        data={timeSlots}
        keyExtractor={(_, index) => `slot-${index}`}
        renderItem={({ item, index }) => (
          <TextInput
            style={styles.input}
            placeholder={`시간대 ${index + 1}`}
            value={item}
            onChangeText={(value) => handleTimeSlotChange(index, value)}
          />
        )}
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>다음으로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  optionButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    margin: 5,
    backgroundColor: '#FFF',
  },
  selectedOptionButton: {
    backgroundColor: '#6A5ACD',
    borderColor: '#6A5ACD',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: '#FFF',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  nextButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SurveyScreen;