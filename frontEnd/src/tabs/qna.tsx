import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Modal, Button, } from 'react-native';
//매번 rendering 되는 게 효율적이니까 scrollview말고 flatlist 쓰자. 그리고 icon 도입하면 image 안 써도 됨. 하지만 icon library를 불러야 할듯, 검색하게 textinput 사용
import { TabView, SceneMap } from 'react-native-tab-view';
//두 종류를 옆으로 넘기기 위해서 tab view를 쓸 수 있대 -> 근데 FE에 tab view랑 pager view 설치해야 함 !!

const MyQList = [
  { id: '1', question: '체질에 맞는 약이 뭔가요?', content: '체질에 맞는 약이 뭐냐구우', pharmacist: '신서원 약사', answer: '오키바리' },
  { id: '2', question: '약이 너무 독한건가요?', content: '약이 너무 독하냐구우', pharmacist: '이한샘 약사', answer: '옛설' },
  { id: '3', question: '저한테 맞는 복용 방법은?', content: '나에게 맞는 복용방법이 뭐냐구우', pharmacist: '안영은 약사', answer: '흠 그것은 말이죠' },
];

const FAQList = [
  { id: '4', question: '이 약, 저한테 부작용 없을까요?', content: '부작용이 있을까요오', pharmacist: '이동건 약사', answer: '그럴수도 아닐수도' },
  { id: '5', question: '저처럼 바쁜 사람에게 약 시간 관리법은?', content: '약 시간 관리법 알려주세요오', pharmacist: '이주영 약사', answer: '제때 드세욥!' },
];

const SimilarQList = [
  { id: '6', question: '가장 유사한 질문1', content: '작성하신 질문과 비슷한 질문은~1', pharmacist: '박수현 약사', answer: 'AI 파이팅' },
  { id: '7', question: '가장 유사한 질문2길게하면길어져', content: '작성하신 질문과 비슷한 질문은~2', pharmacist: '정예준 약사', answer: '백 연결 할 수 있겠지' },
  { id: '8', question: '가장 유사한 질문3', content: '작성하신 질문과 비슷한 질문은~3', pharmacist: '카카오 약사', answer: '물론이지 ㅋㅋ' },
];

const AccordionItem = ({ item }) => { //토글로 열고 닫는 걸 accordion이라고 칭하자
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.question}</Text>
      {isOpen && (
      <>
        <Text style={styles.itemContent}>{item.content}</Text>
        <Text style={styles.itemPharmacist}>{item.pharmacist}</Text>
        <Text style={styles.itemAnswer}>{item.answer}</Text>
      </>)}
    </TouchableOpacity>
  ); //question, content, pharmacist, answer 각각의 디자인 추가하기
};

const ModalAccordionItem = ({ item }) => { //modal용 accordion은 따로 디자인하자!
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.modalItemContainer}>
      <Text style={styles.modalItemTitle}>{item.question}</Text>
      {isOpen && (
        <>
          <Text style={styles.modalItemContent}>{item.content}</Text>
          <Text style={styles.modalItemPharmacist}>{item.pharmacist}</Text>
          <Text style={styles.modalItemAnswer}>{item.answer}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};


const MyQA = ({ searchQuery }) => {
  const filteredData = MyQList.filter((item) => item.question.includes(searchQuery));
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AccordionItem item={item} />}
    />
  );
};
  
const FAQ = ({ searchQuery }) => {
  const filteredData = FAQList.filter((item) => item.question.includes(searchQuery));
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AccordionItem item={item} />}
    />
  );
};

const SimilarQ = ({ searchQuery }) => {
  //얘는 searchQuery가 아니라 input 받은 거 백에 보내서 filter해서 그걸 띄워야.
  //일단은 있는 데이터 띄운다 치고, 이 const 안 쓰고 바로 FlatList modal의 Step2에 띄우도록 하자..
  const filteredData = SimilarQList.filter((item) => item.question.includes(searchQuery));
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AccordionItem item={item} />}
    />
  );
};

const App = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'myQA', title: '나의 Q&A' },
    { key: 'faq', title: '자주하는 질문' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [step, setStep] = useState(1); // modal 단계 관리
  const [modalText, setModalText] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState(''); //category 설정 없애고 질문 제목 넣기

  const renderScene = SceneMap({
    myQA: () => <MyQA searchQuery={searchQuery} />,
    faq: () => <FAQ searchQuery={searchQuery} />,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Q&A</Text>
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="질문을 빠르게 찾기"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: '100%' }}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Image
            source={require('../assets/images/medication.png')} // 플로팅 버튼에 일단은 이미지 사용, 추후 적절한 아이콘으로 변경 예정
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* step을 나눠서 다른 내용 렌더링하자 */}
              {step === 1 && (
                <>
                <Text style={styles.modalTitle}>Q&A 작성하기</Text>
                {/* <View style={styles.categoryContainer}>
                <TouchableOpacity
                  style={[styles.categoryButton, selectedCategory === '복용' && styles.categoryButtonSelected]}
                  onPress={() => setSelectedCategory('복용')}
                >
                  <Text style={styles.categoryText}>복용</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryButton, selectedCategory === '건강 관리' && styles.categoryButtonSelected]}
                  onPress={() => setSelectedCategory('건강 관리')}
                >
                  <Text style={styles.categoryText}>건강 관리</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryButton, selectedCategory === '부작용' && styles.categoryButtonSelected]}
                  onPress={() => setSelectedCategory('부작용')}
                >
                  <Text style={styles.categoryText}>부작용</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.categoryButton, selectedCategory === '기타' && styles.categoryButtonSelected]}
                  onPress={() => setSelectedCategory('기타')}
                >
                  <Text style={styles.categoryText}>기타</Text>
                </TouchableOpacity>
                </View> */}
                <TextInput
                  style={styles.textArea}
                  placeholder="안녕하세요 약사님, 최근에 OOO 약을 처방받았는데..."
                  value={modalText}
                  onChangeText={setModalText}
                  multiline={true}
                />
                <View style={styles.modalButtons}>
                  <Button title="취소" onPress={() => setIsModalVisible(false)} />
                  <Button title="다음으로" onPress={() => setStep(2)} /> 
                </View>
                </>
              )}

              {step === 2 && (
                <>
                <Text style={styles.modalTitle}>AI 추천</Text>
                <Text style={styles.modalExplain}>유사한 질문과 답변들을 가져왔어요!</Text>
                <FlatList
                  data = {SimilarQList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ModalAccordionItem item={item} />}
                />
                <View style={styles.modalButtons}>
                  <Button title="취소" onPress={() => setIsModalVisible(false)} />
                  <Button title="이전으로" onPress={() => setStep(1)} />
                  <Button title="쪽지 부치기" onPress={() => setIsModalVisible(false)} />
                  {/* onPress={handleNextStep} 아니면 handleSubmit()*/}
                </View>
                </>
              )}
              
            </View>
          </View>
        </Modal>
        </View>
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({ 
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headerContainer: {
      paddingTop: 20,
      paddingBottom: 10,
      backgroundColor: '#fff',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    searchBar: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
      },
    //accordionItem 어케 보여줄 건지
    itemContainer: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemContent: {
      marginTop: 10,
      fontSize: 14,
      color: '#555',
    },
    itemPharmacist: {
      marginTop: 20,
      fontSize: 15,
    },
    itemAnswer: {
      marginTop: 10,
      fontSize: 14,
      color: '#555',
    },
    //modal은 다르게 띄우자
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
      backgroundColor: '#FFDC90',
      width: 55,
      height: 55,
      borderRadius: 27.5,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.25)',
      shadowOffset: { width: 0, height: 5.33 },
      shadowOpacity: 1,
      shadowRadius: 5.33,
      elevation: 5,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalExplain: {
      fontSize: 15,
      marginBottom: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    categoryButton: {
      padding: 8,
      borderWidth: 1,
      borderColor: 'lightgray',
      borderRadius: 8,
      marginHorizontal: 5,
    },
    categoryButtonSelected: {
      backgroundColor: 'purple',
      borderColor: 'purple',
    },
    categoryText: {
      color: 'black',
    },
    textArea: {
      width: '100%',
      height: 300,
      borderColor: 'lightgray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      textAlignVertical: 'top', // 여러 줄 입력 시 텍스트 위쪽 정렬
      marginBottom: 5,
    },
    modalButtons: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  });

export default App;