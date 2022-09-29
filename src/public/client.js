// @ts-check

(() => {
    const socket = new WebSocket(`ws://${window.location.host}/ws`);
    const formEl = document.getElementById('form');
    const inputEl = document.getElementById('input');
    const chatsEl = document.getElementById('chats');

    if (!formEl || !inputEl || !chatsEl) {
        throw new Error('Init failed!');
    }

    const chats = [];

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
        chats.push(JSON.parse(event.data));

        chatsEl.innerHTML = '';

        chats.forEach(({ message, nickname }) => {
            const div = document.createElement('div');
            div.innerText = `${nickname}: ${message}`;
            chatsEl.appendChild(div);
        });
    });
})();
