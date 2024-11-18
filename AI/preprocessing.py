from rank_bm25 import BM25Okapi

def initialize_bm25(pairs):
    processed_pairs = [remove_stopwords(pair[0]) for pair in pairs]
    return BM25Okapi(processed_pairs)

stopwords = ["안녕하세요", "약사님", "혹시"]
def remove_stopwords(question):
    question = question.replace(",", "")
    words = question.split()
    return " ".join([word for word in words if word not in stopwords])