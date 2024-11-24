FROM continuumio/miniconda3

WORKDIR /ai

RUN conda create -n rerank python=3.10 -y && \
    conda clean -afy

SHELL ["/bin/bash", "-c"]

COPY . /ai
RUN source activate rerank && pip install -r requirements.txt

CMD ["bash", "-c", "source activate rerank && python /ai/retrieve_and_rerank_api.py"]
