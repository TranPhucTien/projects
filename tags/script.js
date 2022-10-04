const ul = document.querySelector('ul');
const input = ul.querySelector('input');
const button = document.querySelector('button');
const countNum = document.querySelector('.details span');

const maxTag = 10;
let tags = [];

const countTag = () => {
    countNum.innerText = maxTag - tags.length;
};

function createTag() {
    ul.querySelectorAll('li').forEach((li) => li.remove());
    tags.slice()
        .reverse()
        .forEach((tag) => {
            let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="removeTag(this, '${tag}')"></i></li>`;
            ul.insertAdjacentHTML('afterbegin', liTag);
        });
    countTag();
}

function removeTag(elem, tag) {
    const index = tags.indexOf(tag);
    elem.parentElement.remove();
    tags = [...tags.slice(0, index), ...tags.slice(index + 1, tags.length)];
    input.focus();
    countTag();
}

function addTag(e) {
    if (e.key === 'Enter') {
        let newTag = input.value.replace(/\s+/g, '');
        
        newTag.split(',').forEach((tag) => {
            if (tag.length > 1 && !tags.includes(newTag)) {
                tags.push(tag);
                input.value = '';
                createTag();
            }
        });
    }
}

ul.addEventListener('keyup', addTag);

button.addEventListener('click', removeAll);

function removeAll() {
    tags.length = 0;
    ul.querySelectorAll('li').forEach((li) => li.remove());
}
