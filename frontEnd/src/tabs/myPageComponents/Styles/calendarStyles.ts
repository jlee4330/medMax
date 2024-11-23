import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../../sharedStyles';

const screenWidth = Dimensions.get('window').width;

const calendarStyles = StyleSheet.create({
  calendarContainer: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    ...sharedStyles.floatingShadow,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 11,
  },
  dayLabel: {
    width: '14%',
    textAlign: 'center',
    color: '#9CA0AB',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  dayContainer: {
    width: '13%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10
  },
  todayBox: {
    width: '13%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    marginBottom: 10,
  },
  dayText: {
    color: '#9CA0AB',
    fontSize: 12,
  },
  todayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 5,
  },
});

export default calendarStyles;
