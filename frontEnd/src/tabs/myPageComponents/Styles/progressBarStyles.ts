import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../../sharedStyles';
const screenWidth = Dimensions.get('window').width;

const progressBarStyles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    ...sharedStyles.floatingShadow,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#F5F5FD',
    borderRadius: 10,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressSegment: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Legend styles
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the legend items in the container
    alignItems: 'center',
    marginTop: 15,
  },
  legendItem: {
    alignItems: 'center',
    marginHorizontal: 15, // Provides balanced spacing between items
  },
  legendCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 3,
  },
  legendLabel: {
    fontSize: 12,
    color: '#9CA0AB',
  },
});

export default progressBarStyles;

