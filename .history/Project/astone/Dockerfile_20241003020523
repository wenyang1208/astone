FROM python:3.12.3-slim-bullseye

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app
COPY Project/astone/requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app
