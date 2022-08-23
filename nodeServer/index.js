const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server,{
    cors: {
        origin: "*",
      },
})
 const users = {}



 //io.on is used to listen multiple connection like sudhanshu has joined , then aditya has joined and so on
 io.on("connection" , socket =>{

    //when a particular connection has established then particular connection ke sath kya hona chahiye
    //when new user joined the chat
    socket.on('new-user-joined' ,name =>{

        //console.log("new user" , name)
         users[socket.id] = name;

         //this is uses to emit event to all the users that have joined earlier when a new person joined (saare user to pata lag jaega ki new user ne join kiya hai)
         socket.broadcast.emit('user-joined',name)
    })
    

    //if someone message then saare users ko message mil jae socket.broadcast.emit() ke through
    socket.on('send' , message => {
        console.log(users[socket.id]);
        socket.broadcast.emit('receive' , {message:message , name : users[socket.id]})
    })
    
    socket.on('disconnect' , message => {
        socket.broadcast.emit('left' ,users[socket.id])
        delete users[socket.id];
    })

 })

 server.listen(8000 , ()=>{
    console.log("server is listening on port 8000");
})