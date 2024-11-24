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
    borderRadius: 12,
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    ...sharedStyles.floatingShadow,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#404335',
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
    fontSize: 18,
    fontWeight: '600',
    color: '#404335',
    textAlign: 'center',
    marginBottom: 20,
  },
  answersContainer: {
    marginTop: 10,
  },
  answerButton: {
    backgroundColor: '#F5F5FD',
    paddingVertical: 12,
    width: screenWidth * 0.7, // Ensure answer buttons are slightly narrower
    borderRadius: 8,
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
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: screenWidth * 0.9,
  },
  completeButton: {
    backgroundColor: '#6A5ACD',
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
    backgroundColor: '#9C98E7',
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
  },
  image: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});


export default surveyStyles;
