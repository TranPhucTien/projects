const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');
const popupTitle = document.querySelector('header p');
const closeIcon = document.querySelector('header i');
const addBtn = document.querySelector('button');
const titleTag = document.querySelector('input');
const descTag = document.querySelector('textarea');

const app = {
    isUpdate: false,
    updateId: null,
    notes: JSON.parse(localStorage.getItem('notes') || '[]'),
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],

    handleEvent() {
        addBox.onclick = () => {
            this.handleShowPopup();
            titleTag.value = '';
            descTag.value = '';
        };
        closeIcon.onclick = () => {
            this.handleHiddenPopup();
        };

        addBtn.addEventListener('click', (e) => {
            e.preventDefault();

            let noteTitle = titleTag.value.trim();
            let descTitle = descTag.value.trim();

            if (noteTitle || descTitle) {
                this.addNote();
                this.handleHiddenPopup();
                this.showNote();

                titleTag.value = '';
                descTag.value = '';
            }
        });
    },

    addNote() {
        let noteTitle = titleTag.value.trim();
        let descTitle = descTag.value.trim();
        let date = new Date();
        let year = date.getFullYear();
        let month = this.months[date.getMonth()];
        let day = date.getDate();

        const noteInfo = {
            title: noteTitle,
            desc: descTitle,
            date: `${month} ${day}, ${year}`,
        };

        if (this.isUpdate) {
            this.notes[this.updateId] = noteInfo;
        } else {
            this.notes.push(noteInfo);
        }

        localStorage.setItem('notes', JSON.stringify(this.notes));
    },

    showNote() {
        document.querySelectorAll('.note').forEach((note) => note.remove());
        this.notes.forEach((note, index) => {
            let liTag = `<li class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span
                        >${note.desc}
                    </span>
                </div>
                <div class="bottom-content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <i onclick="app.handleClickMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                            <li onclick="app.updateNote(${index}, '${note.title}', '${note.desc}')">
                                <i class="uil uil-pen"></i>
                                Edit
                            </li>
                            <li onclick="app.deleteNote(${index})">
                                <i class="uil uil-trash"></i>
                                Delete
                            </li>
                        </ul>
                    </div>
                </div>
            </li>`;
            addBox.insertAdjacentHTML('afterend', liTag);
        });
    },

    updateNote(noteId, title, desc) {
        this.isUpdate = true;
        this.handleShowPopup();
        this.updateId = noteId;
        popupTitle.innerText = 'Update Note';
        addBtn.innerText = 'Update a Note';
        titleTag.value = title || '';
        descTag.value = desc || '';
    },

    deleteNote(noteId) {
        this.notes.splice(noteId, 1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        this.showNote();
    },

    handleClickMenu(elem) {
        this.showMenu(elem);

        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'I' || e.target !== elem) {
                this.hiddenMenu(elem);
            }
        });
    },

    showMenu(elem) {
        elem.parentElement.classList.add('show');
    },

    hiddenMenu(elem) {
        elem.parentElement.classList.remove('show');
    },

    handleShowPopup() {
        popupBox.classList.add('show');
        titleTag.focus();
    },

    handleHiddenPopup() {
        this.isUpdate = false;
        popupBox.classList.remove('show');
        popupTitle.innerText = 'Add a new Note';
        addBtn.innerText = 'Add Note';
    },

    start() {
        this.showNote();
        this.handleEvent();
    },
};

app.start();
