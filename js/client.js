const socket = io("http://localhost:8000");
const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".container")
var audio = new Audio('ding.mp3')


const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  if(position == 'left'){
    audio.play();
  }
};





// Ask new user for his or her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if the new user joined , recieved his name from the server
socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

//if server send some message , receive it !
socket.on('receive', data => {
    console.log("some thing got recieved");
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    console.log("some thing got recieved");
  append(`${name} left the chat`, 'left');
});

//if the form get submitted , send the mesaage to the server
form.addEventListener('submit' ,(e)=>{
    //page will no reload when using preventDefault
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    messageInput.value = '' 

})