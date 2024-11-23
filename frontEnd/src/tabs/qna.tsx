import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, TextInput, Modal, Image, Button } from 'react-native';
import qnaStyles from './qnaComponents/qnaStyle';

// Define a type for the Q&A items
interface QnAItem {
  id: string;
  question: string;
  content: string;
  pharmacist: string;
  answer: string;
}

// Sample data
const MyQList: QnAItem[] = [
  { id: '1', question: '체질에 맞는 약이 뭔가요?', content: '체질에 맞는 약이 뭐냐구우', pharmacist: '신서원 약사', answer: '오키바리' },
  { id: '2', question: '약이 너무 독한건가요?', content: '약이 너무 독하냐구우', pharmacist: '이한샘 약사', answer: '옛설' },
  { id: '3', question: '저한테 맞는 복용 방법은?', content: '나에게 맞는 복용방법이 뭐냐구우', pharmacist: '안영은 약사', answer: '흠 그것은 말이죠' },
];

const FAQList: QnAItem[] = [
  { id: '4', question: '이 약, 저한테 부작용 없을까요?', content: '부작용이 있을까요오', pharmacist: '이동건 약사', answer: '그럴수도 아닐수도' },
  { id: '5', question: '저처럼 바쁜 사람에게 약 시간 관리법은?', content: '약 시간 관리법 알려주세요오', pharmacist: '이주영 약사', answer: '제때 드세욥!' },
];

// Accordion component
const AccordionItem: React.FC<{ item: QnAItem }> = ({ item }) => {
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


const QnaPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMyQList = MyQList.filter((item) => item.question.includes(searchQuery));
  const filteredFAQList = FAQList.filter((item) => item.question.includes(searchQuery));

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
      <FlatList
        data={filteredMyQList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AccordionItem item={item} />}
      />
      <FlatList
        data={filteredFAQList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AccordionItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default QnaPage;
