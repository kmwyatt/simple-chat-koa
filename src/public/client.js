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

    const adjectives = ['재미있는', '기가막힌', '잘생긴', '멋진'];
    const animals = ['펭귄', '강아지', '사자', '독수리', '사슴', '고양이'];

    function pickRandom(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const result = array[randomIndex];
        if (!result) {
            throw new Error('array length is 0.');
        }
        return result;
    }

    const myNickname = `${pickRandom(adjectives)} ${pickRandom(animals)}`;

    formEl.addEventListener('submit', (event) => {
        event.preventDefault();
        const dataToSend = JSON.stringify({
            nickname: myNickname,
            message: inputEl.value,
        });
        socket.send(dataToSend);
        inputEl.value = '';
    });

    function drawChats() {
        chatsEl.innerHTML = '';

        chats.forEach(({ message, nickname }) => {
            const div = document.createElement('div');
            div.innerText = `${nickname}: ${message}`;
            chatsEl.appendChild(div);
        });
    }

    socket.addEventListener('message', (event) => {
        const { type, payload } = JSON.parse(event.data);

        if (type === 'sync') {
            const { chats: syncedChats } = payload;
            chats.push(...syncedChats);
        } else if (type === 'chat') {
            const chat = payload;
            chats.push(chat);
        }

        drawChats();
    });
})();
