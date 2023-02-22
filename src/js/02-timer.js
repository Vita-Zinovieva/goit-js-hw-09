
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');
const dateInput = document.querySelector('input#datetime-picker');
const daysIndicator = document.querySelector('[data-days]');
const hoursIndicator = document.querySelector('[data-hours]');
const minutesIndicator = document.querySelector('[data-minutes]');
const secondsIndicator = document.querySelector('[data-seconds]');

startBtn.disable = true;
let currentDate = null;
let selectedDate = null;
let timerId = null;

//створений об'єкт з завданя
const options = {
    enableTime: true, //вимикає засіб вибору часу 
    time_24hr: true,  //Відображає засіб вибору часу в 24-годинному режимі 
    defaultDate: new Date(),//Встановлює початкові вибрані дати.
    minuteIncrement: 1,   //Регулює крок для введення хвилин
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      selectedDate = selectedDates[0].getTime();
      currentDate = new Date().getTime();
//додаєм перевірку валідної дати
      if( selectedDate < currentDate) {
        startBtn.disable = true;
        Notify.failure("Please choose a date in the future");
      } else {
       startBtn.disable = false;
                
      }
    }
  };
//функція створення екземпляру дати та часу
flatpickr(dateInput, options);
//запускаємо таймер по кліку на кнопку старт
startBtn.addEventListener('click', timerStart);
  
  //таймер відліку часу
  function timerStart() {
    let timerId = setInterval(() => {
      currentDate = new Date().getTime();
      //dateInput.disable = false;
      startBtn.disabled = true; 
      let count = selectedDate - currentDate;
      console.log(count); 
         
      if (count >= 0) {
        let timeData = convertMs(count);
          daysIndicator.textContent = timeData.days;
          hoursIndicator.textContent = timeData.hours;
          minutesIndicator.textContent = timeData.minutes;
          secondsIndicator.textContent = timeData.seconds;
      } 
       //dateInput.disable = false;
     }, 1000 );  
                   
    };
 
  
//функція, що викликає метод для форматування занчення(00:00:00)
function addLeadingZero(value) {
return String(value).padStart(2, '0')
};

//функція підрахунку (з завдання)
function convertMs(ms) {
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
  