FROM python:3.9-buster

RUN mkdir /app && python -m pip install pipenv

WORKDIR /app

ADD Pipfile /app/Pipfile
ADD Pipfile.lock /app/Pipfile.lock

RUN pipenv install

ADD main.py /app/main.py

CMD pipenv run uvicorn main:app --reload --host 0.0.0.0 --port 9000
