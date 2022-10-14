const div = document.querySelector('div');

const id = Number.parseInt(window.location.href.split('?')[1].split('id=')[1]);
const index = app.products.findIndex((item) => item.id === id);
const item = app.products[index];

div.innerHTML = `
    <img src="${item.img}" alt="">
    <span class="name">${item.name}</span>
    <span class="price">${item.price}</span>
    `
