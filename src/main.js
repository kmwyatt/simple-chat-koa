// @ts-check

const Koa = require('koa');
const Pug = require('koa-pug');
const path = require('path');

const app = new Koa();

new Pug({
    viewPath: path.resolve(__dirname, './views'),
    app,
});

app.use(async (ctx) => {
    await ctx.render('main');
});

app.listen(4000);
