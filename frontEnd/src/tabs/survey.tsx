import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import surveyStyles from './surveyComponents/surveyStyles';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import config from '../config';

const screenWidth = Dimensions.get('window').width;

//24시간 중에 횟수만큼 선택하도록 수정
const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}시`);

const questions = [
    {
        id: 1,
        type: 'greeting',
        welcomeMessage: '만나서 반갑습니다 !\n적합한 커뮤니티 배정을 위해\n몇 가지를 여쭤볼게요 :)',
        image: require('../assets/images/greetIcon.png'), // Replace with the appropriate image path
    },
    {
        id: 2,
        type: 'question',
        question: '어떤 질환 때문에 약을 복용 중이신가요?',
        answers: ['고혈압', '고지혈증', '당뇨병', '우울증'],
    },
    {
        id: 3,
        question: '하루에 몇 번 약을 복용하시나요?',
        answers: ['1회', '2회', '3회'],
    },
    {
        id: 4,
        question: '각 복용 시간을 선택해주세요.\n(이전 항목에서 선택한 횟수만큼)',
        //answers: ['아침', '점심', '저녁', '취침 전'],
    },
];

const Survey = () => {
    const [userName, setUserName] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | undefined>>({});
    const scrollViewRef = useRef<ScrollView>(null);
    const navigation = useNavigation();

    const handleAnswerSelection = (answer: string) => {
        setSelectedAnswers((prev) => {
            // 4번 질문(시간 선택)에만 maxSelections 적용, 다중 선택 가능하도록 !!
            if (currentQuestionIndex === 3) {
                const currentAnswers = prev[currentQuestionIndex] || []; //얘는 배열로 적용
                const maxSelections = parseInt(selectedAnswers[2]?.[0] ?? '0', 10); // 3번 질문의 복용 횟수를 max로 설정
                
                if (currentAnswers.includes(answer)) {
                    // 이미 선택된 경우, 제거
                    return {
                        ...prev,
                        [currentQuestionIndex]: currentAnswers.filter((item) => item !== answer),
                    };
                } else if (currentAnswers.length < maxSelections) {
                    // 선택 가능한 횟수를 넘지 않을 때만 추가
                    return {
                        ...prev,
                        [currentQuestionIndex]: [...currentAnswers, answer],
                    };
                } else {
                    // 선택 가능한 횟수를 넘은 경우 경고
                    Alert.alert('선택 제한', `최대 ${maxSelections}개까지만 선택할 수 있습니다.`);
                    return prev;
                }
            }
            else {
                // 다른 질문에서는 단일 선택 - 값으로 저장
                return {
                    ...prev,
                    [currentQuestionIndex]: answer,
                };
            }
        });
    };

    const getRoomId = () => {
        const drugName = selectedAnswers[1];
        switch (drugName) {
            case '고혈압':
                return 1;
            case '고지혈증':
                return 2;
            case '당뇨병':
                return 3;
            case '우울증':
                return 4;
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
                `${userName}님! 설문조사가 완료되었습니다!`,
                '홈 화면으로 이동합니다.',
                [
                    { text: '확인', onPress: async () => {
                        try {
                            const roomId = getRoomId();
                            const UUID: string = await DeviceInfo.getUniqueId();
                            // userName 받아서 넘기는 거 추가해야
                            const times = selectedAnswers[3] || [];
                            const medi_count = selectedAnswers[2].replace("회", "");
                            console.log(userName);
                            console.log(UUID);
                            console.log(medi_count);
                            // 원하는 타입으로 들어오는지 체크하고, 아니라면 변형
                            // 아래는 기존 코드
                            // const time1 = '2024-11-25T08:00:00';
                            // const time2 = '2024-11-25T14:00:00';
                            // const time3 = '2024-11-25T20:00:00';

                            const baseDate = "2024-11-26";
                            const time1 = times[0] ? `${baseDate}T${times[0].replace("시", "").padStart(2, '0')}:00:00` : null;
                            const time2 = times[1] ? `${baseDate}T${times[1].replace("시", "").padStart(2, '0')}:00:00` : null;
                            const time3 = times[2] ? `${baseDate}T${times[2].replace("시", "").padStart(2, '0')}:00:00` : null;
                            console.log(time1);
                            console.log(time2);
                            console.log(time3);
                            const response = await axios.get(`${config.backendUrl}/mainPage/signUp`, {
                                params: {
                                    userId: UUID,
                                    userName: userName,
                                    roomId: roomId,
                                    numMedi: medi_count,
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

    const isNextButtonActive =
        currentQuestionIndex === 0 ? userName.trim().length > 0 //username입력됐을 때만
        : currentQuestionIndex === 3 ? selectedAnswers[3]?.length === parseInt(selectedAnswers[2]?.[0] ?? '0', 10) //개수 맞을 때만
        : !!selectedAnswers[currentQuestionIndex]?.length;

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
                    <TextInput
                        style={surveyStyles.textInput} // TextInput 스타일 추가
                        placeholder="별명을 입력해주세요"
                        value={userName}
                        onChangeText={setUserName}
                    />
                    </View>
                </>
                ) : currentQuestionIndex === 3 ? (
                    <>
                    <Text style={surveyStyles.questionText}>{questions[currentQuestionIndex].question}</Text>
                    <View style={surveyStyles.answersContainer}>
                        {Array.from({ length: 6 }, (_, row) => (
                            <View key={row} style={surveyStyles.rowContainer}>
                                {timeSlots.slice(row * 4, row * 4 + 4).map((time, idx) => (
                                    <TouchableOpacity
                                        key={time}
                                        style={[
                                            surveyStyles.rowanswerButton,
                                            selectedAnswers[currentQuestionIndex]?.includes(time) && surveyStyles.rowselectedAnswer,
                                        ]}
                                        onPress={() => handleAnswerSelection(time)}
                                    >
                                        <Text
                                            style={[
                                                surveyStyles.rowanswerText,
                                                selectedAnswers[currentQuestionIndex]?.includes(time) && surveyStyles.rowselectedAnswerText,
                                            ]}
                                        >
                                            {time}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
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
                                selectedAnswers[currentQuestionIndex]?.includes(answer) && surveyStyles.selectedAnswer,
                            ]}
                            onPress={() => handleAnswerSelection(answer)}
                        >
                        <Text
                            style={[
                            surveyStyles.answerText,
                            selectedAnswers[currentQuestionIndex]?.includes(answer) && surveyStyles.selectedAnswerText,
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
            <Text style={surveyStyles.nextButtonText} > 
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




