import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import surveyStyles from './surveyComponents/surveyStyles';

const screenWidth = Dimensions.get('window').width;

// Sample questions and answers
const questions = [
    {
        id: 1,
        question: '복용 중인 약의 종류는 무엇인가요?',
        answers: ['항우울제', '고혈압 약', '고지혈증 약', '당뇨병 약'],
    },
    {
        id: 2,
        question: '하루 몇 번 약을 복용하시나요?',
        answers: ['1회', '2회', '3회', '4회 이상'],
    },
    {
        id: 3,
        question: '복약 시간대를 선택해주세요.',
        type: 'timePicker', // Add a type to distinguish this question
    },
];

const Survey = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [selectedTime, setSelectedTime] = useState('08:00'); // Default time value
    const scrollViewRef = useRef<ScrollView>(null);

    const handleAnswerSelection = (answerIndex: number) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = answerIndex;
        setSelectedAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);

        // Scroll to the next question
        scrollViewRef.current?.scrollTo({
            x: screenWidth * (currentQuestionIndex + 1),
            animated: true,
        });
        } else {
        alert('설문조사를 완료했습니다!');
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);

        // Scroll to the previous question
        scrollViewRef.current?.scrollTo({
            x: screenWidth * (currentQuestionIndex - 1),
            animated: true,
        });
        }
    };

    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined || 
    questions[currentQuestionIndex].type === 'timePicker';

    return (
        <SafeAreaView style={surveyStyles.safeArea}>
        <ScrollView
            horizontal
            pagingEnabled
            ref={scrollViewRef}
            scrollEnabled={false} // Disable manual scroll
            contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            }}
            showsHorizontalScrollIndicator={false}
        >
            {questions.map((question, index) => (
            <View
                key={question.id}
                style={[
                surveyStyles.questionContainer,
                { width: screenWidth * 0.9, marginHorizontal: screenWidth * 0.05 }, // Center each question box
                ]}
            >
                <Text style={surveyStyles.questionText}>{question.question}</Text>
                <View style={surveyStyles.answersContainer}>
                {question.type === 'timePicker' ? (
                    <Picker
                    selectedValue={selectedTime}
                    onValueChange={(itemValue) => setSelectedTime(itemValue)}
                    style={surveyStyles.timePicker}
                    >
                    {Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`).map((time) => (
                        <Picker.Item key={time} label={time} value={time} />
                    ))}
                    </Picker>
                ) : (
                    question.answers?.map((answer, answerIndex) => (
                    <TouchableOpacity
                        key={answerIndex}
                        style={[
                        surveyStyles.answerButton,
                        selectedAnswers[currentQuestionIndex] === answerIndex &&
                            surveyStyles.selectedAnswer,
                        ]}
                        onPress={() => handleAnswerSelection(answerIndex)}
                    >
                        <Text
                        style={[
                            surveyStyles.answerText,
                            selectedAnswers[currentQuestionIndex] === answerIndex &&
                            surveyStyles.selectedAnswerText,
                        ]}
                        >
                        {answer}
                        </Text>
                    </TouchableOpacity>
                    ))
                )}
                </View>
            </View>
            ))}
        </ScrollView>
        <TouchableOpacity
            style={[
            surveyStyles.nextButton,
            { backgroundColor: isAnswerSelected ? surveyStyles.selectedAnswer.backgroundColor : '#E0E0E0' }, // Grey when not activated
            ]}
            onPress={isAnswerSelected ? handleNext : undefined} // Disable press if no answer selected
            disabled={!isAnswerSelected} // Disable button functionality when inactive
        >
            <Text style={surveyStyles.nextButtonText}>
            {currentQuestionIndex === questions.length - 1 ? '완료하기' : '다음으로'}
            </Text>
        </TouchableOpacity>
        {currentQuestionIndex > 0 && ( // Show '이전으로' button only if not on the first question
            <TouchableOpacity style={surveyStyles.previousButton} onPress={handlePrevious}>
            <Text style={surveyStyles.previousButtonText}>이전으로</Text>
            </TouchableOpacity>
        )}
        </SafeAreaView>
    );
    };

export default Survey;
