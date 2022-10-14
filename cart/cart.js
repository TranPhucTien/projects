const list = document.querySelector('.list');
const total = document.querySelector('.total');

const app = {
    cartList: JSON.parse(localStorage.getItem('cart')) || [],

    renderCartList() {
        let liItem = ``;

        if (this.cartList) {
            this.cartList.forEach((item, index) => {
                liItem += `
                <li class="item">
                    <div class="serial">${index + 1}</div>
                    <img src="${item.img}" alt="" class="item-img" />
                    <div class="content">
                        <span class="name">${item.name}</span>
                        <span class="price">${item.price}d</span>
                        <div class="actions">
                            <button onclick="app.decreaseItem(${
                                item.id
                            }, this)">-</button>
                            <input type="number" value="${
                                item.quantity
                            }" class="quantity" />
                            <button onclick="app.increaseItem(${
                                item.id
                            }, this)">+</button>
                            <button>Order</button>
                            <button onclick="app.deleteItem(${
                                item.id
                            })">X</button>
                        </div>
                    </div>
                </li>
                `;
            });

            list.innerHTML = liItem;
        } else {
            list.innerHTML = 'Your cart empty';
        }
    },

    decreaseItem(id, elem) {
        let index = this.cartList.findIndex((item) => item.id === id);

        if (this.cartList[index].quantity > 1) {
            this.cartList[index].quantity--;
            elem.parentElement.querySelector('input').value--;
            localStorage.setItem('cart', JSON.stringify(this.cartList));
            this.total();
        }
    },

    increaseItem(id, elem) {
        let index = this.cartList.findIndex((item) => item.id === id);
        this.cartList[index].quantity++;
        elem.parentElement.querySelector('input').value++;
        localStorage.setItem('cart', JSON.stringify(this.cartList));
        this.total();
    },
    
    deleteItem(id) {
        let index = this.cartList.findIndex((item) => item.id === id);
        this.cartList.splice(index, 1);
        this.renderCartList();
        localStorage.setItem('cart', JSON.stringify(this.cartList));
        this.total();
    },

    total() {
        let totalPrice = this.cartList.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0,
        );

        total.innerHTML = `Total: ${totalPrice}`;
    },

    start() {
        this.renderCartList();
        this.total();
    },
};

app.start();
