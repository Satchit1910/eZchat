const socket = io()

const clientsTotal = document.getElementById('clients-count')
const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
    messageInput.value = ""
})

socket.on('clients-total', (data) => {
    clientsTotal.innerHTML = `Total Members: ${data}`
})

socket.on('chat-message', (data) => {
    console.log(data)
    addMessageToUI(false,data)
})

function sendMessage() {
    if(messageInput.value=="") return
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    addMessageToUI(true,data)
    socket.emit('message',data)
}

function addMessageToUI(isOwnMessage,data) {
    const messageElement = `<li class="clearfix">
                                <div class="${!isOwnMessage ? "message-data" : "message-data text-right"}">
                                    <span class="message-data-time">${data.name} • ${moment(data.dateTime).fromNow()}</span>
                                </div>
                                <div class="${!isOwnMessage ? "message my-message" : "message other-message float-right"}">
                                    ${data.message}
                                </div>                                    
                            </li>  `
    messageContainer.innerHTML += messageElement
}