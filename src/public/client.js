// @ts-check

(() => {
    const socket = new WebSocket(`ws://${window.location.host}/ws`);
    const formEl = document.getElementById('form');
    const inputEl = document.getElementById('input');

    if (!formEl || !inputEl) {
        throw new Error('Init failed!');
    }

    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const dataToSend = JSON.stringify({
            nickname: 'kmwyatt',
            message: inputEl.value,
        });
        socket.send(dataToSend);
        inputEl.value = '';
    });

    socket.addEventListener('message', (event) => {
        alert(event.data);
    });
})();
