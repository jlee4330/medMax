import { StyleSheet, Dimensions } from 'react-native';
import sharedStyles from '../sharedStyles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
    backgroundColor: '#F5F5FD',
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
    marginTop: 20,
    fontSize: 14,
    color: '#9CA0AB',
    lineHeight: 20,
  },
  itemPharmacist: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404335',
    marginTop: 20, 
  },
  itemAnswer: {
    marginTop: 10,
    fontSize: 14,
    color: '#6A5ACD',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: screenHeight * 0.6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    ...sharedStyles.floatingShadow,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 10,
    color: '#404335',
  },
  modalExplain: {
    fontSize: 15,
    marginBottom: 10,
    color: '#9CA0AB',
  },
  //modal은 accordionItem 다르게 띄우자
  modalItemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    
  },
  modalItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalItemContent: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  modalItemPharmacist: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#444',
  },
  modalItemAnswer: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6A5ACD',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...sharedStyles.floatingShadow,
  },
  image: {
    width: 30,
    height: 30,
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
  loadingText: {
    fontSize: 16,
    color: '#9CA0AB',
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 24
  },
  titleArea: {
    width: '100%',
    height: 40,
    borderColor: '#E7E7EB',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#F5F5FD',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  cancelButton: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#E0E0E0', // Gray for cancel
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
  },
  confirmButton: {
      flex: 1,
      marginLeft: 10,
      backgroundColor: '#897CDD', // constant color use!
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
  },
  buttonText: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  similarQContainer: {
    padding: 10,
    marginTop: 15,
    backgroundColor: '#F5F5FD', // White background for clarity
    borderRadius: 8,
    width: '100%',
    ...sharedStyles.floatingShadow, // Add shadow for a card-like appearance
  },
  
  similarQTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#404335',
    marginBottom: 20,
  },
  
  similarQContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  
  similarQPharmacist: {
    fontSize: 14,
    fontWeight: '500',
    color: '#404335',
    marginBottom: 10,
  },
  
  similarQAnswer: {
    fontSize: 14,
    color: '#6A5ACD', // to highlight answers
    lineHeight: 20,
  },
});

export default qnaStyles;
