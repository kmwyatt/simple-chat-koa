// @ts-check

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://dbuser:dbpassword@practice.rcx14d8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

module.exports = client;
