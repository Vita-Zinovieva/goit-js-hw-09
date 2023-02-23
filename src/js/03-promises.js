import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('click', newCreate);

 //створюэмо функцію в якій виконується ітерація по amount, вираховується час затримки і викликається  createPromise.
function newCreate(e) {
  e.preventDefault();                                     //відміна дії браузера по замовчуванню
  let amount = Number(formRef.amount.value);              //приводимо введенні дані до числа
  let delay = Number(formRef.delay.value);
  let step = Number(formRef.step.value);
  
  for (let i = 1; i <= amount; i += 1) {                  
    let timeDelay = delay + step * i;
      createPromise(i, timeDelay)
    }
}; 

//функція ззавдання
function createPromise(position, delay) {   
  const obj = { position, delay };                       //ствроюєм об'єкт який буде значенням промісів з властивостями (position,delay) 
                    
  return new Promise((resolve, reject) => {            //обгортаємо функцію в проміс  
    
    const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {                                //записуємо метод setTimeout() щоб запуск функції був після виконання промісу
        if (shouldResolve) {
          resolve(obj);                                  //якщо операція успішна(resolve)передаєм їй номер промісу (position), що створюється,
                                                          // і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).
        } else {                                          //в разі помилки(reject) те ж саме (щоб resolve, delay повернулись в повідомленні)
          reject(obj);
        }
      },delay );
  })
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); 
    
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    
  }) 
};  

