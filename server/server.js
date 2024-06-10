const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')


app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // specify the client URL
        methods: ["GET", "POST"],
        credentials: true
    }
});

// this map tell about which socket id is mappped with the which user 
const userSocketmap = {}

const getAllContectedClients = (roomId) => {
    // return the room that have the same id  as the room id  from the array of room id
    // the return data structure is map and this map will be converted to array with the help of array from method 
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketmap[socketId]
        }
    })
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on('join', ({ roomId, username }) => {
        userSocketmap[socket.id] = username;
        socket.join(roomId)
        // return all the user that joins the room 
        const clients = getAllContectedClients(roomId)

        //  now we will display all the user information to all the users that joins the room 

        clients.forEach(({ socketId }) => io.to(socketId).emit('joined', {
            clients,
            username,
            socketId: socket.id,
        }))
    })
})


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))