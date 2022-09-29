// @ts-check

const koa = require('koa');

const app = new koa();

app.use(async (ctx, next) => {
    ctx.body = 'koa server';
    await next();
    ctx.body = `[${ctx.body}]`;
});

app.use(async (ctx) => {
    ctx.body = `<${ctx.body}>`;
});

app.listen(4000);
