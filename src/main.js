// @ts-check

const Koa = require('koa');
const Pug = require('koa-pug');
const path = require('path');
const route = require('koa-route');
const serve = require('koa-static');
const websocket = require('koa-websocket');
const mount = require('koa-mount');
const mongoClient = require('./mongo');

const app = websocket(new Koa());

new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app,
});

app.use(mount('/public', serve('src/public')));

app.use(async (ctx) => {
    await ctx.render('main');
});

const connectDB = mongoClient.connect();

async function getChatsCollection() {
    const client = await connectDB;
    return client.db('chat').collection('chats');
}

app.ws.use(
    route.all('/ws', async (ctx) => {
        const chatsCollection = await getChatsCollection();
        const chatsCursor = chatsCollection.find(
            {},
            {
                sort: {
                    createdAt: 1,
                },
            },
        );

        const chats = await chatsCursor.toArray();
        const syncData = JSON.stringify({
            type: 'sync',
            payload: {
                chats,
            },
        });

        ctx.websocket.send(syncData);

        ctx.websocket.on('message', async (data) => {
            const chat = JSON.parse(data);
            const chatsCollection = await getChatsCollection();
            await chatsCollection.insertOne({ ...chat, createdAt: new Date() });

            const { nickname, message } = chat;
            const { server } = app.ws;

            if (!server) {
                return;
            }

            const dataToSend = JSON.stringify({
                type: 'chat',
                payload: {
                    message,
                    nickname,
                },
            });

            server.clients.forEach((client) => {
                client.send(dataToSend);
            });
        });
    }),
);

app.listen(4000);
