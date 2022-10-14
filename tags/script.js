const ul = document.querySelector('ul');
const input = ul.querySelector('input');
const button = document.querySelector('button');
const countNum = document.querySelector('.details span');

const tagObj = {
    maxTag: 10,
    tags: [],

    handleEvent() {
        ul.addEventListener('keyup', (e) => this.addTag(e));
        // button.addEventListener('click', this.removeAll); --> `this` is button
        button.addEventListener('click', () => this.removeAll()); // --> this is tagObj
    },

    countTag() {
        countNum.innerText = this.maxTag - this.tags.length;
    },

    createTag(e) {
        ul.querySelectorAll('li').forEach((li) => li.remove());

        this.tags
            .slice()
            .reverse()
            .forEach((tag) => {
                let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="tagObj.removeTag(this, '${tag}')"></i></li>`;
                ul.insertAdjacentHTML('afterbegin', liTag);
            });

        this.countTag();
    },

    removeTag(elem, tag) {
        let index = this.tags.indexOf(tag);
        this.tags.splice(index, 1);
        elem.parentElement.remove();
        this.countTag();
    },

    removeAll() {
        this.tags.length = 0;
        console.log(this);
        ul.querySelectorAll('li').forEach((li) => li.remove());
    },

    addTag(e) {
        if (e.key === 'Enter') {
            let newTag = input.value.replace(/\s+/g, '');

            if (this.tags.length < 10 && newTag.split(',').length < 10) {
                newTag.split(',').forEach((tag) => {
                    if (tag.length > 1 && !this.tags.includes(tag)) {
                        this.tags.push(tag);
                        this.createTag();
                        e.target.value = '';
                    }
                });
            }
        }
    },

    start() {
        this.handleEvent();
    },
};

tagObj.start();
