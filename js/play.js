window.onload = () => {
    socket.emit('getfiles');
    socket.on('files', (files) => {
        
    })
}