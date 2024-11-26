FROM continuumio/miniconda3

WORKDIR /ai

# Conda 환경 생성
RUN conda create -n rerank python=3.10 -y && \
    conda clean -afy

SHELL ["/bin/bash", "-c"]

# 기본 파일을 이미지를 빌드할 때 복사
COPY ./requirements.txt /ai/

RUN source activate rerank && pip install -r requirements.txt

# API 코드 파일은 매번 마운트할 것이므로 여기서 COPY 하지 않음
# COPY . /ai

CMD ["bash", "-c", "source activate rerank && python /ai/retrieve_and_rerank_api.py"]
