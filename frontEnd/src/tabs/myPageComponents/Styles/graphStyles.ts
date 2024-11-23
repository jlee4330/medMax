import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../../sharedStyles';
const screenWidth = Dimensions.get('window').width;

const graphStyles = StyleSheet.create({
  graphContainer: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    ...sharedStyles.floatingShadow,
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  scrollView: {
    flexDirection: 'row',
  },
  itemContainer: {
    width: 56,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  barContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
  },
  bar: {
    width: 40,
    borderRadius: 8,
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  circleText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#404335',
  },
  label: {
    fontSize: 10,
    color: '#404335',
    marginTop: 5,
  },
});

export default graphStyles;
