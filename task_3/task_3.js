//находим элементы и складываем их в переменные
const chatForm = document.querySelector('.input_send_geolocation_box');
const btn = document.querySelector('.send');





//инициализируем websocket 
let ws_uri = "wss://echo-ws-service.herokuapp.com";
let websocket = new WebSocket(ws_uri);

//wesocket opem
websocket.onopen = function(event) {
    console.log('You have been connected');
};

//websocket close
websocket.onclose = function(event) {
    console.log('You have been disconnected');
};

//websocket error
websocket.onerror = function(event) {
    console.log('connection failed');
};

//получение сообщений от сервера, вывод 
websocket.onmessage = function(event) {
    let data = JSON.parse(event.data);

    if (data.type == 'message') {
      let receivedMessage = data.message.toString();
      //ДОДЕЛАЙ ВЫВОД СООБЩЕНИЯ ОТ СЕРВЕРА
      const replyMessage = document.querySelector('.reply-message');
      replyMessage.style.display = 'flex';
      replyMessage.textContent = `${receivedMessage}`;
    }    
}




//функция срабатывающая на кнопке отправить

chatForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let inputMessage = document.querySelector('.input');
    let message = inputMessage.value;
    if (message.toString().length) {
        let data = {
            type: 'message',
            message: message
        };

        websocket.send(JSON.stringify(data));
        inputMessage.value = '';
      
      //вносит текст в сообщение отправителя
      const myMessage = document.querySelector('.my-message');
      myMessage.style.display = 'flex';
      myMessage.textContent = `${message}`;
      
      
    }
}, false);

//ГЕОЛОКАЦИЯ 

const btnGeo = document.querySelector('.geolocation');
btnGeo.addEventListener('click', showGeolocation, false);

function showGeolocation() {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      //ДОДЕЛАЙ ВЫВОД СМС ГЕОДАННЫХ
      const geoMessage = document.querySelector('.geo_message');
      geoMessage.style.display = 'flex';
      geoMessage.textContent = ` ${coords.latitude}, ${coords.longitude}`
    })
  } else {
    console.log('geolocation is not supported by this browser or blocked')
  }
}