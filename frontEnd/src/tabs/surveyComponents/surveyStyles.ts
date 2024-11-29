import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../sharedStyles';

const screenWidth = Dimensions.get('window').width;

const surveyStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  questionContainer: {
    backgroundColor: 'white',
    padding: 10,
    alignSelf: 'center',
    alignItems: 'center',
    ...sharedStyles.floatingShadow,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#404335',
    marginBottom: 10,
    lineHeight: 24,
  },
  inputBox: {
    width: screenWidth * 0.8,
    height: 50,
    borderColor: '#E7E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5FD',
    fontSize: 16,
    color: '#404335',
  },
  questionText: {
    flexWrap: 'wrap', // Allow text wrapping
    fontSize: 18,
    fontWeight: '600',
    color: '#404335',
    textAlign: 'center',
    paddingVertical: 10,
    lineHeight: 22,
  },
  answersContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  answerButton: {
    backgroundColor: '#F5F5FD',
    paddingVertical: 12,
    width: screenWidth * 0.7, // Ensure answer buttons are slightly narrower
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    ...sharedStyles.floatingShadow,
  },
  selectedAnswer: {
    backgroundColor: '#897CDD',
    borderColor: '#6A5ACD',
    borderWidth: 2,
  },
  answerText: {
    fontSize: 16,
    color: '#9CA0AB',
    textAlign: 'center',
  },
  selectedAnswerText: {
    color: 'white',
  },
  nextButton: {
    backgroundColor: '#9C98E7',
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  completeButton: {
    backgroundColor: '#897CDD',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  previousButton: {
    backgroundColor: '#E7E7EB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  previousButtonText: {
    color: '#9CA0AB',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonActive: {
    backgroundColor: '#897CDD',
    borderColor: '#6A5ACD',
    borderWidth: 2,
  },
  nextButtonInactive: {
    backgroundColor: '#E7E7EB',
  },
  greetingContainer: {
    width : screenWidth * 0.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  textContainer: {
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageContainer: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 23,
    marginBottom: 15,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 25,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    fontSize: 16,
    marginTop: 20,
    color: '#333',
  },
  //4개씩 6줄로 띄우기 위한 ~ 여기에만 다른 스타일 적용 !!
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5, // 줄 간격
  },
  rowanswerButton: {
      width: '22%', // 4개의 버튼을 한 줄에 배치
      paddingVertical: 10, // 세로 패딩을 추가하여 버튼 높이를 조정
      paddingHorizontal: 5, // 가로 패딩으로 버튼을 넓게 보이도록 조정
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'transparent',
      backgroundColor: '#F5F5FD',
      ...sharedStyles.floatingShadow,
  },
  rowselectedAnswer: {
      backgroundColor: '#897CDD',
      borderColor: '#6A5ACD',
      borderWidth: 2,
  },
  rowanswerText: {
    fontSize: 16,
    color: '#9CA0AB',
    textAlign: 'center',
  },
  rowselectedAnswerText: {
      color: '#fff', // 선택된 버튼의 텍스트 색상
  },
});


export default surveyStyles;
