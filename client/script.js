document.addEventListener('DOMContentLoaded', () => {

const socket = new WebSocket('ws://localhost:1337/')

socket.onopen = (event) => {
    console.log('connected to the websocket server', event)
}

socket.onerror = (error) => {
    console.log('WebScoket Error: ', error)
}

socket.onmessage = (event) =>{
    const chatBox = document.getElementById('chat-box')
    const newMessage = document.createElement('li')   
    newMessage.textContent =  event.data
    chatBox.appendChild(newMessage)
}

// message input
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const messageInput = document.getElementById('chat-input')
    const message = messageInput.value.trim()

    console.log('send btn clicked')
    if(message){
        socket.send(message)
        messageInput.value ="";
    }
})

document.getElementById('chat-input').addEventListener('keyup', (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        sendBtn.click()
    }
})

})
