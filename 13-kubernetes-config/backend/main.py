import os
from typing import List
import databases
import sqlalchemy
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    'http://localhost',
    'http://localhost:8000',
    'http://localhost:9000',
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

DATABASE_URL = os.environ.get('DATABASE_URL',
                              'postgres://postgres:postgres@db:5432/news')

database = databases.Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

news = sqlalchemy.Table(
    'news',
    metadata,
    sqlalchemy.Column('id', sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column('title', sqlalchemy.String),
    sqlalchemy.Column('short_description', sqlalchemy.String),
    sqlalchemy.Column('description', sqlalchemy.String),
    sqlalchemy.Column('preview', sqlalchemy.String),
)

engine = sqlalchemy.create_engine(
    DATABASE_URL
)
metadata.create_all(engine)


class ShortNote(BaseModel):
    id: int
    title: str
    short_description: str
    preview: str


class Note(BaseModel):
    id: int
    title: str
    short_description: str
    description: str
    preview: str


async def fill_db():
    news_objects = await database.fetch_all(news.select())
    if news_objects:
        return
    news_objects = []
    for i in range(25):
        news_objects.append({'title': f'title {i}',
                             'short_description': f'small text {i}' * 10,
                             'description': f'{i} some more text, ' * 100,
                             'preview': '/static/image.png'})
    query = news.insert()
    await database.execute_many(query=query, values=news_objects)


@app.on_event('startup')
async def startup():
    await database.connect()
    await fill_db()


@app.on_event('shutdown')
async def shutdown():
    await database.disconnect()


@app.get('/api/news/', response_model=List[ShortNote])
async def get_news():
    return await database.fetch_all(news.select())


@app.get('/api/news/{new_id}', response_model=Note)
async def read_item(new_id: int):
    return await database.fetch_one(news.select().where(news.c.id == new_id))
