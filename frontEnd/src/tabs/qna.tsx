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
  Dimensions,
  Alert
} from 'react-native';
//icon 도입하면 image 대신 icon library를 불러서 쓰자
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import axios from 'axios';
import qnaStyles from './qnaComponents/qnaStyle';
const screenWidth = Dimensions.get('window').width;
import config from '../config';
import DeviceInfo from 'react-native-device-info';

interface QnAItem {
  id: string;
  question: string;
  content: string;
  pharmacist: string;
  answer: string;
}

interface AccordionItemProps {
  item: QnAItem;
}

interface TabBarProps {
  navigationState: { index: number; routes: { key: string; title: string }[] };
  position: any;
}

interface MyQAProps {
  searchQuery: string;
  userId: string;
}

interface FAQProps {
  searchQuery: string;
}

// Static data for similar questions
const SimilarQList: QnAItem[] = [
  { id: '6', question: '가장 유사한 질문1', content: '작성하신 질문과 비슷한 질문은~1', pharmacist: '박수현 약사', answer: 'AI 파이팅' },
  { id: '7', question: '가장 유사한 질문2길게하면길어져', content: '작성하신 질문과 비슷한 질문은~2', pharmacist: '정예준 약사', answer: '백 연결 할 수 있겠지' },
  { id: '8', question: '가장 유사한 질문3', content: '작성하신 질문과 비슷한 질문은~3', pharmacist: '카카오 약사', answer: '물론이지 ㅋㅋ' },
];

const AccordionItem: React.FC<AccordionItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={qnaStyles.itemContainer}>
      <Text style={qnaStyles.itemTitle}>{item.question}</Text>
      {isOpen && (
        <>
          <Text style={qnaStyles.itemContent}>{item.content}</Text>
          <Text style={qnaStyles.itemPharmacist}>{item.pharmacist === "알 수 없음" ? "답변한 약사가 아직 없어요" : item.pharmacist}</Text>
          <Text style={qnaStyles.itemAnswer}>{item.answer === "알 수 없음" ? "답변이 아직 없어요" : item.answer }</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
//qna화면에 뜨는 accordionItem이랑 modal에서 유사질문 추천의 accordionItem이랑 같으니까 조금 어색해서
//modalAccordionItem을 따로 만들어서 다른 디자인을 적용합시다 !
const ModalAccordionItem: React.FC<AccordionItemProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={qnaStyles.modalItemContainer}>
      <Text style={qnaStyles.modalItemTitle}>{item.question}</Text>
      {isOpen && (
        <>
          <Text style={qnaStyles.modalItemContent}>{item.content}</Text>
          <Text style={qnaStyles.modalItemPharmacist}>{item.pharmacist}</Text>
          <Text style={qnaStyles.modalItemAnswer}>{item.answer}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

//userID - 일단은 지정으로 하기
const MyQA: React.FC<MyQAProps> = ({ searchQuery, userId }) => {
  const [data, setData] = useState<QnAItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/qna/all-qnas`, {
          params: { userId },
        });
        console.log("Response data:", response.data);
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

const FAQ: React.FC<FAQProps> = ({ searchQuery }) => {
  //일단은 백연결 전 더미데이터
  const FAQList: QnAItem[] = [
    { id: '4', question: '이 약, 저한테 부작용 없을까요?', content: '부작용이 있을까요오', pharmacist: '이동건 약사', answer: '그럴수도 아닐수도' },
    { id: '5', question: '저처럼 바쁜 사람에게 약 시간 관리법은?', content: '약 시간 관리법 알려주세요오', pharmacist: '이주영 약사', answer: '제때 드세욥!' },
    { id: '6', question: '약을 식후에 먹어야 하나요?', content: '식후에 먹는게 좋다고 들었어요', pharmacist: '김민수 약사', answer: '식사 후 약을 드시면 흡수율이 더 좋아질 수 있어요. 하지만 약 종류에 따라 다를 수 있으니 설명서를 꼭 확인하세요.' },
    { id: '7', question: '두 가지 약을 같이 먹어도 되나요?', content: '두 약을 동시에 먹어도 되나요?', pharmacist: '정서윤 약사', answer: '약의 상호작용이 있을 수 있으니, 복용 전 반드시 전문가에게 상담받는 것이 좋습니다.' },
    { id: '8', question: '약을 먹은 후에 술을 마셔도 되나요?', content: '술을 마셔도 될까요?', pharmacist: '박성민 약사', answer: '대부분의 약은 술과 함께 복용하면 효과가 떨어지거나 부작용이 발생할 수 있습니다. 술을 마시기 전 약사와 상담하세요.' },
    { id: '9', question: '약을 빼먹었을 때 어떻게 해야 하나요?', content: '약을 빼먹었어요', pharmacist: '이동건 약사', answer: '빼먹은 약은 가능한 빨리 드세요. 그러나 다음 복용 시간이 가까워지면 한 번에 두 알을 먹지 않도록 주의하세요.' },
    { id: '10', question: '해열제를 얼마나 자주 먹을 수 있나요?', content: '해열제 먹는 간격이 궁금해요', pharmacist: '정서윤 약사', answer: '보통 해열제는 4~6시간 간격으로 복용이 가능하지만, 약의 종류와 개인의 상태에 따라 달라질 수 있습니다. 정확한 간격은 약사와 상담하세요.' },
  ]  

  //백 연결되면 아래의 FAQList -> data로 바꾸기
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
  //얘는 searchQuery가 아니라 input 받은 거 백(AI)에 보내서 filter해서 그걸 띄워야.
  //일단은 더미 데이터 띄운다 치고
  //이 const 안 쓰고 아래 코드에서 바로 modal의 Step2에 Flatlist 띄우도록 하자..

  const [similarQuestions, setSimilarQuestions] = useState<QnAItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSimilarQuestions = async () => {
      try {
        setLoading(true);
        console.log("searchQuery: ", searchQuery);
        const response = await axios.post(`${config.aiUrl}/rerank`, {
          question: searchQuery,
          top_k: 3,
        });

        const { ko_results } = response.data;
        console.log(ko_results);

        const parsedData = ko_results.map((item: any, index: number) => ({
          id: index.toString(),
          question: item[1],
          content: item[0],
          pharmacist: item[2] || '알 수 없는 약사',
          answer: item[3],
        }));

        setSimilarQuestions(parsedData);
      } catch (error) {
        console.error('Error fetching similar questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarQuestions();
  }, [searchQuery]);

  if (loading) {
    return <Text style={qnaStyles.loadingText}>Loading...</Text>;
  }

  return (
    <FlatList
      data={similarQuestions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AccordionItem item={item} />}
    />
  );
};

const App: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<{ key: string; title: string }[]>([
    { key: 'myQA', title: '나의 Q&A' },
    { key: 'faq', title: '자주하는 질문' },
  ]);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const uniqueId = await DeviceInfo.getUniqueId();
      setUserId(uniqueId);
    };

    fetchUserId();
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  // const userId = '1';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [titleText, setTitleText] = useState('');
  const [contentText, setContentText] = useState('');


  const handleSubmit = async () => {
    try {
      if (!titleText || !contentText) {
        Alert.alert('질문 제목과 내용을 모두 입력해주세요.');
        return;
      }
  
      const payload = {
        userId: userId,
        title: titleText,
        content: contentText,
      };
  
      const response = await axios.post(`${config.backendUrl}/qna/questions`, payload);
  
      if (response.status === 201) {
        Alert.alert('질문이 성공적으로 등록되었습니다!');
        setTitleText('');
        setContentText('');
        setStep(1);
        setIsModalVisible(false);
      } else {
        Alert.alert('질문 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
      Alert.alert('서버 오류로 인해 질문 등록에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };
  const renderScene = SceneMap({
    myQA: () => <MyQA searchQuery={searchQuery} userId={userId} />,
    faq: () => <FAQ searchQuery={searchQuery} />,
  });

  const renderTabBar = (props: any) => (
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
        initialLayout={{ width: screenWidth }}
        renderTabBar={renderTabBar}
      />
      <TouchableOpacity
        style={qnaStyles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          source={require('../assets/images/medication.png')}
          // 플로팅 버튼에 일단은 이미지 사용, 추후 적절한 아이콘으로 변경 예정
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
                  value={titleText}
                  onChangeText={setTitleText}
                />
                <TextInput
                  style={qnaStyles.textArea}
                  placeholder="안녕하세요 약사님, 최근에 OOO 약을 처방받았는데..."
                  value={contentText}
                  onChangeText={setContentText}
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
                <Text style={qnaStyles.modalExplain}>유사한 질문과 답변들을 가져오는 중이에요! 조금 걸려요..</Text>
                <SimilarQ searchQuery={contentText} />
                {/* <FlatList
                  data={SimilarQList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ModalAccordionItem item={item} />}
                /> */}
                <View style={qnaStyles.modalButtons}>
                  <Button title="취소" onPress={() => setIsModalVisible(false)} />
                  <Button title="이전으로" onPress={() => setStep(1)} />
                  <Button title="쪽지 부치기" onPress={handleSubmit} />
                  {/* onPress={handleNextStep} 아니면 handleSubmit() 하면서 DB에 추가되게*/}
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






