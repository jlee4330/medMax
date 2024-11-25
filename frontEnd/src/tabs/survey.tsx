import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import surveyStyles from './surveyComponents/surveyStyles';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import config from '../config';

const screenWidth = Dimensions.get('window').width;

const questions = [
    {
        id: 1,
        type: 'greeting',
        welcomeMessage: '만나서 반갑습니다 !\n커뮤니티 배정을 위해 몇가지를 여쭤볼게요 :)',
        image: require('../assets/images/user_2.png'), // Replace with the appropriate image path
    },
    {
        id: 2,
        type: 'question',
        question: '복용 중인 약의 이름은 무엇인가요?',
        answers: ['항우울제', '고지혈증 약', '당뇨병 약'],
    },
    {
        id: 3,
        question: '하루 몇 번 약을 복용하시나요?',
        answers: ['1회', '2회', '3회', '4회 이상'],
    },
    {
        id: 4,
        question: '복용 시간을 선택해주세요.',
        answers: ['아침', '점심', '저녁', '취침 전'],
    },
];

const Survey = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | undefined>>({});
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation();
    const UUID: string = DeviceInfo.getDeviceId();

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestionIndex]: answer,
        }));
    };

    const getRoomId = () => {
        const drugName = selectedAnswers[1];
        switch (drugName) {
            case '항우울제':
                return 1;
            case '고지혈증 약':
                return 2;
            case '당뇨병 약':
                return 3;
            default:
                return 0;
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            scrollViewRef.current?.scrollTo({ x: screenWidth * (currentQuestionIndex + 1), animated: true });
        } else {
            Alert.alert(
                '설문조사가 완료되었습니다!',
                '홈 화면으로 이동합니다.',
                [
                    { text: '확인', onPress: async () => {
                        try {
                            const roomId = getRoomId();
                            const time1 = '2024-11-25T08:00:00';
                            const time2 = '2024-11-25T14:00:00';
                            const time3 = '2024-11-25T20:00:00';
                            const response = await axios.get(`http://10.0.2.2:7777/mainPage/signUp`, {
                                params: {
                                    userId: UUID,
                                    roomId: roomId,
                                    time1: time1,
                                    time2: time2,
                                    time3: time3,
                                }
                            });
                            console.log('데이터 전송 성공:', response.data);
                            navigation.navigate('MainTabs');
                        } catch (error) {
                            console.error('데이터 전송 실패:', error);
                            Alert.alert('데이터 전송 실패', '다시 시도해주세요.');
                        }
                    }}
                ],
                { cancelable: false }
            );
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            scrollViewRef.current?.scrollTo({ x: screenWidth * (currentQuestionIndex - 1), animated: true });
        }
    };

    const isNextButtonActive = currentQuestionIndex === 0 || !!selectedAnswers[currentQuestionIndex];

    return (
        <SafeAreaView style={surveyStyles.safeArea}>
        <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
            showsHorizontalScrollIndicator={false}
        >
            {questions.map((question, index) => (
            <View key={question.id} style={[surveyStyles.questionContainer, { width: screenWidth }]}>
                {question.type === 'greeting' ? (
                <>
                    <View style={surveyStyles.greetingContainer}>
                    <Text style={surveyStyles.welcomeText}>{question.welcomeMessage}</Text>
                    <View style={surveyStyles.imageContainer}>
                        <Image source={question.image} style={surveyStyles.image} />
                    </View>
                    </View>
                </>
                ) : (
                <>
                    <Text style={surveyStyles.questionText}>{question.question}</Text>
                    <View style={surveyStyles.answersContainer}>
                    {question.answers?.map((answer, idx) => (
                        <TouchableOpacity
                        key={idx}
                        style={[
                            surveyStyles.answerButton,
                            selectedAnswers[currentQuestionIndex] === answer && surveyStyles.selectedAnswer,
                        ]}
                        onPress={() => handleAnswerSelection(answer)}
                        >
                        <Text
                            style={[
                            surveyStyles.answerText,
                            selectedAnswers[currentQuestionIndex] === answer && surveyStyles.selectedAnswerText,
                            ]}
                        >
                            {answer}
                        </Text>
                        </TouchableOpacity>
                    )) ?? <Text>No answers available</Text>}
                    </View>
                </>
                )}
            </View>
            ))}
        </ScrollView>
        <View style={surveyStyles.buttonContainer}>
            <TouchableOpacity
            style={[
                surveyStyles.nextButton,
                isNextButtonActive ? surveyStyles.nextButtonActive : surveyStyles.nextButtonInactive,
            ]}
            onPress={isNextButtonActive ? handleNext : undefined}
            disabled={!isNextButtonActive}
            >
            <Text style={surveyStyles.nextButtonText}>
                {currentQuestionIndex === questions.length - 1 ? '완료하기' : '다음으로'}
            </Text>
            </TouchableOpacity>
            {currentQuestionIndex > 0 && (
            <TouchableOpacity style={surveyStyles.previousButton} onPress={handlePrevious}>
                <Text style={surveyStyles.previousButtonText}>이전으로</Text>
            </TouchableOpacity>
            )}
        </View>
        </SafeAreaView>
    );
};

export default Survey;

