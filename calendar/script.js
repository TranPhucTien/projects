const currentDate = document.querySelector('.current-date');
const daysTag = document.querySelector('.days');
const nextPrevIcons = document.querySelectorAll('.icons span');

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
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
];

const renderCalendar = () => {
    const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(
        currYear,
        currMonth,
        lastDateOfMonth,
    ).getDay();
    const lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let days = '';

    for (let i = firstDayOfMonth; i > 0; i--) {
        days += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
        let isToday =
            i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()
                ? 'active'
                : '';
        days += `<li class='${isToday}'>${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) {
        days += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = days;
};

renderCalendar();

nextPrevIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
        if (icon.id === 'prev') {
            currMonth = currMonth - 1;
        }
        if (icon.id === 'next') {
            currMonth = currMonth + 1;
        }
        if (icon.id === 'current') {
            date = new Date()
            currYear = date.getFullYear()
            currMonth = date.getMonth()
        }

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth)
            currYear = date.getFullYear()
            currMonth = date.getMonth()
        } else {
            date = new Date()
        }

        renderCalendar();
    });
});