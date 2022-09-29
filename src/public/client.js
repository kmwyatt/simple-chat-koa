// @ts-check

(() => {
    const socket = new WebSocket(`ws://${window.location.host}/ws`);

    socket.addEventListener('open', () => {
        socket.send('Hello, server!');
    });

    socket.addEventListener('message', (event) => {
        alert(event.data);
    });
})();
