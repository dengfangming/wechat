const express = require('express');
const reply = require('./reply');
const app = express();

app.use(reply());

app.listen(3880, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
});