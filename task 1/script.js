"use strict"
const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];
//добавляем значение по умолчанию
const renderGoodsItem = (title, price) => {
  return `<div class="goods-item"><h3>${title || 'Товар не задан'}</h3><p>${price || 'Цена не определена'}</p></div>`;
};


const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join(""); //делаем из массива строку и вместо запятой по умолчанию просим соединять пустой строкой 
}

renderGoodsList(goods);
