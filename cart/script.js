const listPro = document.querySelector('ul.list');

const app = {
    products: [
        {
            id: 1,
            img: 'https://i.pinimg.com/236x/0a/d6/74/0ad67490a8291e5f073aad454adb58c7.jpg',
            name: 'Quan ao 1',
            price: 100000,
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/236x/83/78/9c/83789c455409dbf576db3a3e0d71b5f9.jpg',
            name: 'Quan ao 2',
            price: 110000,
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/736x/64/c3/54/64c354b7b63d8a16a82196335bdc2a9a.jpg',
            name: 'Quan ao 3',
            price: 120000,
        },
        {
            id: 4,
            img: 'https://i.pinimg.com/236x/63/2b/60/632b6037a7dd29e1431b15aa539443a8.jpg',
            name: 'Quan ao 4',
            price: 130000,
        },
        {
            id: 5,
            img: 'https://i.pinimg.com/736x/c4/09/b8/c409b8c8fdd1521cb6166e161d913849.jpg',
            name: 'Quan ao 5',
            price: 140000,
        },
        {
            id: 6,
            img: 'https://i.pinimg.com/236x/8d/a2/51/8da25173ffc36639b856717ab7c1c79f.jpg',
            name: 'Quan ao 6',
            price: 150000,
        },
        {
            id: 7,
            img: 'https://i.pinimg.com/236x/91/a2/eb/91a2eb995f9312864f3a5fa1530ea062.jpg',
            name: 'Quan ao 7',
            price: 160000,
        },
        {
            id: 8,
            img: 'https://i.pinimg.com/236x/0e/d7/ad/0ed7addedd296784e3e052f27ce1483d.jpg',
            name: 'Quan ao 8',
            price: 170000,
        },
        {
            id: 9,
            img: 'https://i.pinimg.com/236x/f5/c0/d3/f5c0d3563dbdc10b7209e1aa27ab64a4.jpg',
            name: 'Quan ao 9',
            price: 180000,
        },
        {
            id: 10,
            img: 'https://i.pinimg.com/236x/69/01/16/690116af7e6b51b89e96d0f14884ee3c.jpg',
            name: 'Quan ao 10',
            price: 190000,
        },
    ],

    cart: JSON.parse(localStorage.getItem('cart')) || [],

    renderProduct() {
        let item = ``;

        console.log(this.cart);

        this.products.forEach((product, index) => {
            item += `
                <li class="item" id="${product.id}">
                    <img src='${product.img}' alt="" class="item-img">
                    <a href="./detailPage.html?id=${product.id}" class="name">${product.name}</a>
                    <div class="item-footer">
                        <span class="price">${product.price}đ</span>
                        <button onclick="app.addToCart(${product.id}, '${product.img}','${product.name}', ${product.price})" class="add">+</button>
                    </div>
                </li>`;
        });

        listPro.innerHTML = item;
    },

    addToCart(id, img, name, price) {
        let index = this.cart.findIndex((item) => item.id === id);

        const isExistProduct = index >= 0;

        if (isExistProduct) {
            this.cart[index].quantity++;
        } else {
            this.cart.push({ id, img, name, price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        console.log(JSON.parse(localStorage.getItem('cart')));
    },

    start() {
        this.renderProduct();
    },
};

app.start();
