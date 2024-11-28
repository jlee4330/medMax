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
    { id: '4', question: '이 약, 저한테 부작용 없을까요?', content: '부작용이 있을까요오', pharmacist: '이동건 약사', answer: '약의 종류에 따라 부작용이 다를 수 있습니다. 예를 들어, 항생제(아목시실린)라면 소화불량이나 알레르기 반응이 있을 수 있습니다. 본인의 건강 상태와 복용 약을 약사에게 반드시 알려주세요.' },
    { id: '5', question: '저처럼 바쁜 사람에게 약 시간 관리법은?', content: '약 시간 관리법 알려주세요오', pharmacist: '이주영 약사', answer: '정해진 시간에 알람을 설정하거나, 한 번에 복용 가능한 지속 방출형 약물(메트포르민 XR)을 고려해 보세요. 정확한 방법은 약사와 상의하세요.' },
    { id: '6', question: '약을 식후에 먹어야 하나요?', content: '식후에 먹는게 좋다고 들었어요', pharmacist: '김민수 약사', answer: '일반적으로 소화제(알마겔)나 비타민제는 식후에 복용하면 좋습니다. 하지만 공복에 복용해야 효과가 더 좋은 약물(예: 레보티록신)도 있으니 약 설명서를 꼭 확인하거나 약사에게 문의하세요.' },
    { id: '7', question: '두 가지 약을 같이 먹어도 되나요?', content: '두 약을 동시에 먹어도 되나요?', pharmacist: '정서윤 약사', answer: '특정 약물(예: 이부프로펜과 와파린)은 상호작용이 있을 수 있어 위험할 수 있습니다. 복용 중인 약물을 모두 약사에게 알려야 안전한 조합을 확인할 수 있습니다.' },
    { id: '8', question: '약을 먹은 후에 술을 마셔도 되나요?', content: '술을 마셔도 될까요?', pharmacist: '박성민 약사', answer: '항생제(메트로니다졸)나 항우울제(서트랄린)는 술과 함께 복용 시 심각한 부작용을 초래할 수 있습니다. 약물과 술의 상호작용이 있으니 약사와 상의하세요.' },
    { id: '9', question: '약을 빼먹었을 때 어떻게 해야 하나요?', content: '약을 빼먹었어요', pharmacist: '이동건 약사', answer: '예를 들어, 혈압약(암로디핀)을 빼먹었을 경우 가능한 빨리 복용하세요. 하지만 다음 복용 시간이 가까우면 한 번에 두 알을 복용하지 마세요. 이런 상황은 약사와 상담하세요.' },
    { id: '10', question: '해열제를 얼마나 자주 먹을 수 있나요?', content: '해열제 먹는 간격이 궁금해요', pharmacist: '정서윤 약사', answer: '일반적인 해열제(예: 아세트아미노펜)는 4~6시간 간격으로 복용이 가능합니다. 하지만 특정 상태나 약물(예: 이부프로펜)에 따라 복용 간격이 달라질 수 있으니 약사와 상담하세요.' }
  ];


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




const SimilarQ = ({ searchQuery }: { searchQuery: string }) => {
  //얘는 searchQuery가 아니라 input 받은 거 백(AI)에 보내서 filter해서 그걸 띄워야.
  //일단은 더미 데이터 띄운다 치고
  //이 const 안 쓰고 아래 코드에서 바로 modal의 Step2에 Flatlist 띄우도록 하자..

  const [similarQuestions, setSimilarQuestions] = useState<QnAItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dotCount, setDotCount] = useState<number>(1);

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

  // dots animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <Text style={qnaStyles.loadingText}>
      유사 Q&A를 찾고 있어요! {"\n"}
      조금 걸려요{'.'.repeat(dotCount)}
    </Text>;
  }
  if (!similarQuestions.length) {
    return <Text style={qnaStyles.loadingText}>유사한 질문이 없습니다.</Text>;
  }

  return (
    <FlatList
      data={similarQuestions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={qnaStyles.similarQContainer}>
          <Text style={qnaStyles.similarQTitle}>{item.question}</Text>
          <Text style={qnaStyles.similarQContent}>{item.content}</Text>
          {item.pharmacist && (
            <Text style={qnaStyles.similarQPharmacist}>답변 약사: {item.pharmacist}</Text>
          )}
          {item.answer && (
            <Text style={qnaStyles.similarQAnswer}>답변: {item.answer}</Text>
          )}
        </View>
      )}
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
          source={require('../assets/images/pencil.png')}
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
                <View style={qnaStyles.buttonContainer}>
                    <TouchableOpacity style={qnaStyles.cancelButton} onPress={() => setIsModalVisible(false)}>
                        <Text style={qnaStyles.buttonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={qnaStyles.confirmButton} onPress={() => setStep(2)}>
                        <Text style={qnaStyles.buttonText}>다음으로</Text>
                    </TouchableOpacity>
                </View>
              </>
            )}
            {step === 2 && (
              <>
                <Text style={qnaStyles.modalTitle}>AI 추천</Text>
                <SimilarQ searchQuery={contentText} />

                {/* <FlatList
                  data={SimilarQList}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <ModalAccordionItem item={item} />}
            /> */}
                <View style={qnaStyles.buttonContainer}>
                    <TouchableOpacity style={qnaStyles.cancelButton} onPress={() => setIsModalVisible(false)}>
                        <Text style={qnaStyles.buttonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={qnaStyles.cancelButton} onPress={() => setStep(1)}>
                        <Text style={qnaStyles.buttonText}>이전으로</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={qnaStyles.confirmButton} onPress={handleSubmit}>
                        <Text style={qnaStyles.buttonText}>쪽지 부치기</Text>
                    </TouchableOpacity>
                </View>
                {/* onPress={handleNextStep} 아니면 handleSubmit() 하면서 DB에 추가되게*/}
                {/* Button은 디자인 변경이 어려워서, 자체 style 사용하는 touchableOpacity로 변경함*/}
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;







