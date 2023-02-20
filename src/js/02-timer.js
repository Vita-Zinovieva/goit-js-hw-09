// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const startBtn = document.querySelector('button[data-start]');
const timerFace = document.querySelector('.timer');
const dateInput = document.querySelector('input#datetime-picker');
const daysIndicator = document.querySelector('[data-days]');
const hoursIndicator = document.querySelector('[data-hours]');
const minutesIndicator = document.querySelector('[data-minutes]');
const secondsIndicator = document.querySelector('[data-seconds]');


function createTimerFace({ days, hours, minutes, seconds }) {
    daysIndicator.textContent = days;
    hoursIndicator.textContent = hours;
    minutesIndicator.textContent = minutes;
    secondsIndicator.textContent = seconds;
}

//функція створення екземпляру дати та часу
flatpickr(dateInput, options);

//створений об'єкт з завданя
const options = {
    enableTime: true, //вимикає засіб вибору часу 
    time_24hr: true,  //Відображає засіб вибору часу в 24-годинному режимі 
    defaultDate: new Date(),//Встановлює початкові вибрані дати.
    minuteIncrement: 1,   //Регулює крок для введення хвилин
    onClose(selectedDates) {
        onDateCheck(selectedDates);
      console.log(selectedDates[0]);
    },
  };

  //функція, що викликає метод для форматування занчення(00:00:00)
  function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  };
  //функція підрахунку (з завдання)
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
     
    const days = addLeadingZero(Math.floor(ms / day));// Remaining days
    const hours = addLeadingZero(Math.floor((ms % day) / hour));// Remaining hours
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));// Remaining minutes
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));// Remaining seconds
  
    return { days, hours, minutes, seconds };
  };

  //перевірка дати
  function onDateCheck(selectedDates) {
    endTime = selectedDates[0].getTime();
    currentTime = new Date().getTime();
  
    if( endTime < currentTime) {
        window.alert("Please choose a date in the future");
        startBtn.disable = false;
        return;
    } startBtn.disable = true;
  }; 

  //відлік часу
  const timer = {
    start() {
    const startTimer = Date.now();

    setInterval(() => {
        const currentTime = Date.now();
        const ms = endTime - currentTime  ;
        const time = convertMs;
        updateTimerFace(time);
    })
    }
  };
  //запускаємо таймер по кліку на кнопку старт
  startBtn.addEventListener('click', () => {
    timer.start();
  });


  //функція що оновлює інтерфейс таймеру
  function updateTimerFace({ days, hours, minutes, seconds }) {
    timerFace.textContent = '${days}:${hours}:${minutes}:${seconds}';
  };