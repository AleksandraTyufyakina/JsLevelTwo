
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

//������� ����� �����
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

//��������� ������ ������ ��� ������� �������

class basket {
  constructor() {}
  addProduct() {} //�������� ������� � �������
  deleteProduct() {} //������� ����� �� �������
  increaseItemAmount() {} //��������� ���������� �������
  decreaseItemAmount() {} //��������� ���������� �������
  sumPrice() {} //�������� �������� ����� �������
  getProductAmount() {} //�������� ���������� ������� � �������
  render() {}
  pay(){} //�������� 

}

class basketItem {
  constructor() {} 
  render() {}
}


//�����, ���������� ����� � ������ ���