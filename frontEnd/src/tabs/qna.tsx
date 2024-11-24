import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Button,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import qnaStyles from './qnaComponents/qnaStyle';

// Static data for similar questions
const SimilarQList = [
  { id: '6', question: '가장 유사한 질문1', content: '작성하신 질문과 비슷한 질문은~1', pharmacist: '박수현 약사', answer: 'AI 파이팅' },
  { id: '7', question: '가장 유사한 질문2길게하면길어져', content: '작성하신 질문과 비슷한 질문은~2', pharmacist: '정예준 약사', answer: '백 연결 할 수 있겠지' },
  { id: '8', question: '가장 유사한 질문3', content: '작성하신 질문과 비슷한 질문은~3', pharmacist: '카카오 약사', answer: '물론이지 ㅋㅋ' },
];

const AccordionItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={qnaStyles.itemContainer}>
      <Text style={qnaStyles.itemTitle}>{item.question}</Text>
      {isOpen && (
        <>
          <Text style={qnaStyles.itemContent}>{item.content}</Text>
          <Text style={qnaStyles.itemPharmacist}>{item.pharmacist}</Text>
          <Text style={qnaStyles.itemAnswer}>{item.answer}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const MyQA = ({ searchQuery, userId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:7777/qna/all-qnas', {
          params: { userId },
        });
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [userId]);

  if (loading) {
    return <Text style={qnaStyles.loadingText}>Loading...</Text>;
  }

  const filteredData = data.filter((item) => item.question.includes(searchQuery));
  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AccordionItem item={item} />}
    />
  );
};

const FAQ = ({ searchQuery }) => {
  const FAQList = [
    { id: '4', question: '이 약, 저한테 부작용 없을까요?', content: '부작용이 있을까요오', pharmacist: '이동건 약사', answer: '그럴수도 아닐수도' },
    { id: '5', question: '저처럼 바쁜 사람에게 약 시간 관리법은?', content: '약 시간 관리법 알려주세요오', pharmacist: '이주영 약사', answer: '제때 드세욥!' },
  ];

  const filteredData = FAQList.filter((item) => item.question.includes(searchQuery));
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
  const userId = '1';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [modalText, setModalText] = useState('');

  const renderScene = SceneMap({
    myQA: () => <MyQA searchQuery={searchQuery} userId={userId} />,
    faq: () => <FAQ searchQuery={searchQuery} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={qnaStyles.tabContainer}
      indicatorStyle={qnaStyles.activeTabButton}
      labelStyle={qnaStyles.tabText}
      pressColor="#F5F5FD"
    />
  );

  return (
    <SafeAreaView style={qnaStyles.safeArea}>
      <View style={qnaStyles.headerContainer}>
        <Text style={qnaStyles.headerTitle}>Q&A</Text>
      </View>
      <TextInput
        style={qnaStyles.searchBar}
        placeholder="질문을 빠르게 찾기"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        renderTabBar={renderTabBar}
      />
      <TouchableOpacity
        style={qnaStyles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={require('../assets/images/medication.png')}
          style={qnaStyles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={qnaStyles.modalContainer}>
          <View style={qnaStyles.modalContent}>
            {step === 1 && (
              <>
                <Text style={qnaStyles.modalTitle}>Q&A 작성하기</Text>
                <TextInput
                  style={qnaStyles.titleArea}
                  placeholder="질문의 제목을 작성해주세요."
                  value={modalText}
                  onChangeText={setModalText}
                />
                <TextInput
                  style={qnaStyles.textArea}
                  placeholder="안녕하세요 약사님, 최근에 OOO 약을 처방받았는데..."
                  value={modalText}
                  onChangeText={setModalText}
                  multiline={true}
                />
                <View style={qnaStyles.modalButtons}>
                  <Button title="취소" onPress={() => setIsModalVisible(false)} />
                  <Button title="다음으로" onPress={() => setStep(2)} />
                </View>
              </>
            )}
            {step === 2 && (
              <>
                <Text style={qnaStyles.modalTitle}>AI 추천</Text>
                <FlatList
                  data={SimilarQList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <AccordionItem item={item} />}
                />
                <View style={qnaStyles.modalButtons}>
                  <Button title="취소" onPress={() => setIsModalVisible(false)} />
                  <Button title="이전으로" onPress={() => setStep(1)} />
                  <Button title="쪽지 부치기" onPress={() => setIsModalVisible(false)} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
