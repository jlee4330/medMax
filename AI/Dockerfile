FROM continuumio/miniconda3

WORKDIR /ai

RUN conda create -n rerank python=3.10 -y && \
    conda init bash

SHELL ["/bin/bash", "-c"]

COPY . /ai
RUN source ~/.bashrc && conda activate rerank && pip install -r requirements.txt

CMD ["/bin/bash", "-c", "conda activate rerank && python /ai/retrieve_and_rerank_api.py"]
