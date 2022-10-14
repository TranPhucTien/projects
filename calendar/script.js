const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.days');
const nextIcon = document.querySelector('#next');
const prevIcon = document.querySelector('#prev');
const renewIcon = document.querySelector('#renew');

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const app = {
    months: [
        'January',
        'February',
        'March',
        ' April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],

    renderCalendar() {
        const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
        const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
        const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
        const lastDayOfMonth = new Date(currYear, currMonth + 1, 0).getDay();

        let days = '';
        for (let i = firstDayOfMonth; i > 0; i--) {
            days += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateOfMonth; i++) {
            let isToday =
                i === date.getDate() &&
                currMonth === new Date().getMonth() &&
                currYear === new Date().getFullYear()
                    ? 'active'
                    : '';
            days += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayOfMonth; i < 6; i++) {
            days += `<li class="inactive">${i}</li>`;
        }

        currentDate.innerText = `${this.months[currMonth]} ${currYear}`;
        daysTag.innerHTML = days;
    },

    handleEvent() {
        nextIcon.onclick = () => {
            this.nextMonth();
            this.renderCalendar();
        };
        prevIcon.onclick = () => {
            this.prevMonth();
            this.renderCalendar();
        };
        renewIcon.onclick = () => {
            this.renew();
            this.renderCalendar();
        };
    },

    nextMonth() {
        currMonth++;
        if (currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
    },

    prevMonth() {
        currMonth--;
        if (currMonth < 0) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
    },

    renew() {
        date = new Date();
        currMonth = date.getMonth();
        currYear = date.getFullYear();
    },

    start() {
        this.renderCalendar();
        this.handleEvent();
    },
};

app.start();