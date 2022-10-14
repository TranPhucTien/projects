const MENU_ITEMS = [
    {
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        title: 'Feedback and help',
    },
    {
        title: 'Keyboard shortcuts',
    },
];


const listDom = document.querySelector('.list');
let liItem = ``;
MENU_ITEMS.forEach((item, index) => {
    liItem += `<li class="item" data-index="${index}">${item.title}</li>`;
});

listDom.innerHTML = liItem;

listDom.addEventListener('click', (e) => {
    console.log(e.target.dataset.index);
    if (e.target.tagName === "LI") {
        let index = e.target.dataset.index;

        if (!!(MENU_ITEMS[index].data)) {
            liItem = ``;
            MENU_ITEMS[index].data.forEach((item, index) => {
                liItem += `<li class="item" data-index="${index}">${item.title}</li>`;
            });
            listDom.innerHTML = liItem;
        }
    }
})

