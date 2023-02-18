const startButtob = document.querySelector('button[data-start = "Start"]');
const stoptButtob = document.querySelector('button[data-stop = "Stop"]');
const body = document.querySelector('body');


//ставимо прослуховувач на кнопку старт
startButtob.addEventListener(clic, () => {
    let timerId = setInterval(() => {           //таймер виконання функції зміни кольору
body.style.backgroundColor = getRandomHexColor;
}, 1000);
})

//ставимо прослуховувач на кнопку стоп
stoptButtob.addEventListener(click, () => {
    clearInterval(timerId);      //метод зупинки функції   
})


//фугкція генерування випадкового коду
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }