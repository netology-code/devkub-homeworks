import '../styles/index.less';
import {BASE_URL} from './config';

const URL_LIST = '/api/news/';
const URL_DETAIL = '/api/news/1/';

/**
 * Запрос данных
 */
function getData(url, detail = false) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (detail) {
                renderItem(data);
            } else {
                renderList(data);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Рендер списка
 */
function renderList(data = []) {
    if (!data.length) {
        return;
    }

    let content = document.querySelector('.js-list');

    for (let item of data) {
        let block = document.createElement('article');

        block.className = 'b-items__item b-preview';
        block.id = item.id;
        block.innerHTML = `
            <a href="/detail/${item.id}/"><h2 class="b-preview__title">${item.title}</h2></a>
            <img src="${item.preview}" class="b-preview__image" alt="${item.title}"/>
            <div class="b-preview__text">${item.short_description}</div>
        `;

        content.append(block);
    }
}

/**
 * Рендер деталки
 */
function renderItem (data) {
    if (!data) {
        return;
    }

    let block = document.querySelector('.js-item');

    block.innerHTML = `
        <a><h1 class="b-page__title">${data.title}</h1>
        <img src="${data.preview}" class="b-page__image" alt="${data.title}"/>
        <div class="b-page__text">${data.description}</div>
    `;
}

let url = window.location.pathname;
let regexp = /^\/$/;
let regexpDetail = /\/detail\/\d*\/$/;

console.log(BASE_URL);

if (regexpDetail.test(url)) {
    getData(BASE_URL + URL_DETAIL, true);
} else if (regexp.test(url)) {
    getData(BASE_URL + URL_LIST);
}
