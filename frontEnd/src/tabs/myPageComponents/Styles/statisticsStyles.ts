import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../../sharedStyles';
const screenWidth = Dimensions.get('window').width;

const statisticsStyles = StyleSheet.create({
  statisticsContainer: {
    width: screenWidth * 0.9, // Set width to 90% of the screen
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 15,
    ...sharedStyles.floatingShadow,
    alignItems: 'center', // Center content within the container
    alignSelf: 'center'
  },
  statistic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Ensure statistic items span the full width of the container
    paddingVertical: 5,
  },
  statLabel: {
    color: '#9FA195',
    fontSize: 14,
  },
  statValue: {
    color: '#404335',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default statisticsStyles;
