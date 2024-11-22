import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
    FlatList, TextInput, //다른 survey
    ScrollView, } from 'react-native';

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
    const [selectedTimes, setSelectedTimes] = useState<number[]>([]);

    const drugOptions = ['항우울제', '고지혈증', '당뇨병'];
    const frequencyOptions = [1, 2, 3, 4, 5];
    const timeOptions = Array.from({ length: 24 }, (_, i) => i); // 0 ~ 23시

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
        setSelectedTimes([]); // 빈 시간대 초기화
    };

    // 시간대 선택 핸들러
    const toggleTimeSelection = (time: number) => {
        if (selectedTimes.includes(time)) {
        setSelectedTimes(selectedTimes.filter((item) => item !== time));
        }
        else if (selectedTimes.length < (frequency || 0)) {
        setSelectedTimes([...selectedTimes, time]);
        }
        else {
        alert(`최대 ${frequency}개의 시간대를 선택할 수 있습니다.`);
        }
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
        if (selectedTimes.length !== frequency) {
            alert(`정확히 ${frequency}개의 시간대를 선택해주세요!`);
            return;
        }
        // 다음 화면으로 이동
        navigation.navigate('NextScreen', { selectedDrugs, frequency, selectedTimes });
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
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
            <Text style={styles.sectionTitle}>복약 시간대를 선택해주세요</Text>
            <View style={styles.optionsContainer}>
            {timeOptions.map((time) => (
                <TouchableOpacity
                key={time}
                style={[
                    styles.timeButton,
                    selectedTimes.includes(time) && styles.selectedTimeButton,
                ]}
                onPress={() => toggleTimeSelection(time)}
                >
                <Text
                    style={[
                    styles.timeText,
                    selectedTimes.includes(time) && styles.selectedTimeText,
                    ]}
                >
                    {time}:00
                </Text>
                </TouchableOpacity>
            ))}
            </View>

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>다음으로</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 5,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
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
    timeButton: {
        width: '22%',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    selectedTimeButton: {
        backgroundColor: '#6A5ACD',
        borderColor: '#6A5ACD',
    },
    timeText: {
        fontSize: 14,
        color: '#333',
    },
    selectedTimeText: {
        color: '#FFF',
    },
    nextButton: {
        backgroundColor: '#6A5ACD',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SurveyScreen;