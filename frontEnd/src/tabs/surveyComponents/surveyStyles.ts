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
    width: screenWidth * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...sharedStyles.floatingShadow,
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
    paddingHorizontal: 15,
    width: screenWidth * 0.7,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'transparent', // just in case...
  },
  selectedAnswer: {
    backgroundColor: '#6A5ACD',
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
  timePicker: {
    width: screenWidth * 0.8,
    height: 200,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 20,
    ...sharedStyles.floatingShadow,
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
  activatedButton: {
    backgroundColor: '#6A5ACD',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  previousButton: {
    backgroundColor: '#F5F5FD',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: screenWidth * 0.9,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  previousButtonText: {
    color: '#9CA0AB',
    fontSize: 16,
  },
});

export default surveyStyles;
