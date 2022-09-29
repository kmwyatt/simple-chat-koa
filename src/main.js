// @ts-check

const Koa = require('koa');
const Pug = require('koa-pug');
const path = require('path');
const route = require('koa-route');
const serve = require('koa-static');
const websocket = require('koa-websocket');
const mount = require('koa-mount');

const app = websocket(new Koa());

new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app,
});

app.use(mount('/public', serve('src/public')));

app.use(async (ctx) => {
    await ctx.render('main');
});

app.ws.use(
    route.all('/ws', (ctx) => {
        ctx.websocket.on('message', (message) => {
            console.log(message.toString());
        });

        ctx.websocket.send('Hello, client!');
    }),
);

app.listen(4000);
