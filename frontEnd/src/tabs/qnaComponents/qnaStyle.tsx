import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../sharedStyles';

const screenWidth = Dimensions.get('window').width;

const qnaStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7EB',
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#404335',
  },
  searchBar: {
    margin: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E7E7EB',
    borderRadius: 8,
    backgroundColor: '#F5F5FD',
    fontSize: 14,
    color: '#9CA0AB',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#897CDD',
    paddingVertical: 10,
    marginBottom: 30,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E7EB',
  },
  activeTabButton: {
    backgroundColor: '#BAB7EE',
    borderColor: '#BAB7EE',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA0AB',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    alignSelf: 'center',
    width: screenWidth * 0.9,
    ...sharedStyles.floatingShadow,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#404335',
  },
  itemContent: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA0AB',
    lineHeight: 20,
  },
  itemPharmacist: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#404335',
  },
  itemAnswer: {
    marginTop: 8,
    fontSize: 14,
    color: '#404335',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    ...sharedStyles.floatingShadow,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#404335',
  },
  modalExplain: {
    fontSize: 15,
    marginBottom: 10,
    color: '#9CA0AB',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFDC90',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    ...sharedStyles.floatingShadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textArea: {
    width: '100%',
    height: 120,
    borderWidth: 1,
    borderColor: '#E7E7EB',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    backgroundColor: '#F5F5FD',
    marginBottom: 10,
  },
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFDC90',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default qnaStyles;
