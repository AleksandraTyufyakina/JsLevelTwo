"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const Templates = {
    Product: (product) => {
        return `<div class="product-item">
            <img src="${product.img}" alt="Some img">
            <div class="desc">
                <h3>${product.product_name}</h3>
                <p>${product.price} $</p>
                <button class="buy-btn black-btn" data-id="${product.id_product}">Купить</button>
            </div>
        </div>`;
    },
    Busket: {
        SumPrice: function(amount, countGoods) {
            return `<div class="sum-price">Итого ${amount} руб. (Товаров: ${countGoods})</button>`;
        },
        Head: function(data) {
            return `<button class="btn-cart basket-btn" type="button">Корзина (${data.countGoods})</button>`;
        },
        Product: (data) => {
            return `<div class="busket-product-item">
                <h3>${data.product_name}</h3>
                <p class="price">${data.price * data.quantity} руб </p>
                <p class="quantity">
                    <button class="quantity-btn quantity-down" data-id="${data.id_product}">-</button>
                    <span>${data.quantity}</span>
                    <button class="quantity-btn quantity-up" data-id="${data.id_product}">+</button>
                </p>

                <button class="unbuy-btn black-btn" data-id="${data.id_product}">Удалить</button>
            </div>`;
        }
    }
}
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//   //window.ActiveXObject() => let xhr = new ActiveXObject()
//     xhr.open('GET', url, true);
//
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log ('error');
//             } else {
//                 cb (xhr.responseText);
//             }
//         }
//     }
//     xhr.send ();
// };

class ProductsList {
    constructor() {
        this.products = [];
        this.allProducts = [];
        this.init();
    }


    init() {
        this.showProducts();
    }

    getProducts() {
        return new Promise((resolve, reject) => {
            fetch(`${API}/catalogData.json`)
                .then(result => result.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.log(error)
                })
        });
    }

    showProducts() {
        var modules = document.getElementsByClassName("module");
        for(var i = 0; i < modules.length; i++){
            modules[i].style.display = "none";
        }
        document.querySelector('.products').style.display = "flex";

        var prom = this.getProducts();
        prom.then((data) => {
            this.products = [...data];
            this.render()
        })
    }

    render() {
        const block = document.querySelector('.products');
        let result = ''
        this.products.forEach(product => {
            const prod = new Product(product);
            this.allProducts.push(prod);
            result += prod.render();
        });
        block.innerHTML = result;
    }
    sumPrice() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
}

class Product {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img
    }
    addToBuy(e) {
        console.log(e)
    }
    render() {
        return Templates.Product(this);
    }
}

class BusketList {
    constructor() {
        this.amount = 0;
        this.contents = [];
        this.countGoods = 0;
        this.init();
    }

    init() {
        var prom = this.getBasket();
        prom.then((data) => {
            this.contents = [...data.contents];
            this.amount = data.amount;
            this.countGoods = data.countGoods;
            this.renderHeadButton()
        })
    }

    getBasket() {
        return new Promise((resolve, reject) => {
            fetch(`${API}/getBasket.json`)
                .then(result => result.json())
                .then(data => {
                    resolve(data);
                })
                .catch(error => {
                    console.log(error)
                })
        });
    }

    showBasket() {
        this.amount = this.getSum();
        this.countGoods = this.getCountGoods();

        var modules = document.getElementsByClassName("module");
        for(var i = 0; i < modules.length; i++){
            modules[i].style.display = "none";
        }
        document.querySelector('.busket-container').style.display = "block";
        this.render();
    }

    changeAmount(id, arrow) {
        this.contents.forEach(product => {
            if (product.id_product == id)
                product.quantity = Math.max(0, product.quantity + arrow);
        });
        this.showBasket();
    }

    renderHeadButton() {
        const block = document.querySelector('.busket-button-container');
        block.innerHTML = Templates.Busket.Head(this);
    }

    render() {
        const block = document.querySelector('.busket-container .goods-list');
        var result = Templates.Busket.SumPrice(this.amount, this.countGoods);
        
        this.contents.forEach(product => {
            result += Templates.Busket.Product(product)
        });

        block.innerHTML = result;
    }

    getSum() {
        return this.contents.reduce((accum, item) => accum += (item.price * item.quantity), 0);
    }

    getCountGoods() {
        return this.contents.reduce((accum, item) => accum += item.quantity, 0);
    }
}


let basket = new BusketList();
let products = new ProductsList();

// Events
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('buy-btn')) {
            var productId = parseInt(event.target.getAttribute('data-id'));
            window.event = event;
            console.log(event);
        }
        if (event.target.classList.contains('basket-btn')) {
            basket.showBasket();
        }
        if (event.target.classList.contains('products-btn')) {
            products.showProducts();
        }
        if (event.target.classList.contains('quantity-btn')) {
            var productId = parseInt(event.target.getAttribute('data-id'));
            if (event.target.classList.contains('quantity-up')) {
                basket.changeAmount(productId, 1);
            } else
                basket.changeAmount(productId, -1);
        }
    }, false);
