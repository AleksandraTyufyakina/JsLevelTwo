
class productItem {

  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="product-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}


class productList {
  constructor() {
    this.products = [];
  }
  fetchProduct() {
    this.products = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

//считаем общую сумму
  sumPrice() {
    let sum = 0;
    this.products.forEach(product => {
      sum += product.price;
    });
    console.log (sum);
    return sum;
  }


  render() {
    let listHtml = '';
    this.products.forEach(product => {
      const prod = new productItem(product.title, product.price);
      listHtml += prod.render();
    });
    document.querySelector('.product-list').innerHTML = listHtml;
  }
}

const list = new productList();
list.fetchproduct();
list.render();

//добавляем пустые классы для корзины товаров

class basket {
	constructor() {}
	addProduct() {} //добавить продукт в корзину
	deleteProduct() {} //удалить товар из корзины
	increaseItemAmount() {} //увеличить количество товаров
	decreaseItemAmount() {} //уменьшить количество товаров
	sumPrice() {} //получить итоговую сумму товаров
	getProductAmount() {} //получить количество товаров в корзине
	render() {}
	pay(){} //оплатить 

}

class basketItem {
	constructor() {} 
	render() {}
}


//Сорри, гамбургеры будут в другой раз