const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop ]');

//функція генерування випадкового коду
 function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

let timerId = null;
stopBtn.disabled = true;
//ставимо прослуховувач на кнопку старт
 startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {           //таймер виконання функції зміни кольору
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000); 
    startBtn.disabled = true;
    stopBtn.disabled = false;
}); 

//ставимо прослуховувач на кнопку стоп
stopBtn.addEventListener('click', () => {
    clearInterval(timerId);      //метод зупинки функції 
    startBtn.disabled = false; 
    stopBtn.disabled = true;
 });  
