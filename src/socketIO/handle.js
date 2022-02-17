function handleSocket(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('userConnect', (userId) => {
            console.log(`userId : ${userId} connected`);
            socket.join(userId);
        })
    });


}

module.exports = handleSocket;