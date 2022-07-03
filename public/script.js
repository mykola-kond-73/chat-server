const socket = io();

const message=document.getElementById('message')
const messages=document.getElementById('messages')
const handleSubmitNewMessage=e=>{
    console.log('emmit')
    socket.emit('message',{data:message.value})
}

socket.on('messageS',({data})=>{
  handleNewMessage(data)
})

const handleNewMessage=message=>{
  messages.appendChild(buildNewMessage(message))
}
const buildNewMessage=(message)=>{
  const li=document.createElement("li")
  li.appendChild(document.createTextNode(message))
  return li
}