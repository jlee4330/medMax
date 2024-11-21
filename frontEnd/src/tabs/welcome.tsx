import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, } from 'react-native';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    const [userName, setUserName] = useState('');

    const handleNext = () => {
        if (userName.trim() === '') {
            alert('사용자 이름을 입력해주세요!');
            return; }
        // survey로 이동하면서 이름 전달
        navigation.navigate('SurveyScreen', { userName });
    };

    return (
        <SafeAreaView style={styles.container}>
        {/* 상단 멘트 */}
        <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>만나서 반갑습니다 !</Text>
            <Text style={styles.welcomeText}>커뮤니티 배정을 위해 몇가지를 여쭤볼게요{':)'}</Text>
        </View>

        {/* 중앙 이미지 */}
        <View style={styles.imageContainer}>
            <Image
            source={require('../assets/images/user_2.png')} // 일단 아무 이미지
            style={styles.image}
            resizeMode="contain"
            />
        </View>

        {/* 하단 입력 */}
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="이름을 입력해주세요"
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#bbb"
            />
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>다음으로</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    //상단 텍스트
    textContainer: {
        marginTop: 30,
        marginBottom: 0,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        backgroundColor: '#FFF',
        padding: 5,
    },
    //중간 이미지
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    //하단 입력
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    textInput: {
        width: '80%',
        height: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 25,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        fontSize: 16,
        marginBottom: 20,
        color: '#333',
    },
    nextButton: {
        width: '80%',
        height: 50,
        backgroundColor: '#BCA4FF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default WelcomeScreen;