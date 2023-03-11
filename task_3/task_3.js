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
      //ДОДЕЛАЙ ВЫВОД СООБЩЕНИЙ
      console.log(data.message.toString());
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
    }
}, false);

//ГЕОЛОКАЦИЯ 

const btnGeo = document.querySelector('.geolocation');
btnGeo.addEventListener('click', showGeolocation, false);

function showGeolocation() {
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      //ДОДЕЛАЙ ВЫВОД ГЕОДАННЫХ
      console.log(coords.latitude, coords.longitude);
    })
  } else {
    console.log('geolocation is not supported by this browser or blocked')
  }
}