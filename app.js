const express = require('express');
const sha1 = require('sha1');
const {parseString} = require('xml2js');
const app = express();

app.use(async (req,res) => {
    console.log(req.query);
    const {signature, echostr, timestamp, nonce } = req.query;
    const token = 'javascript2019319';
    const sortedArr = [token, timestamp, nonce].sort();
    const sha1Str = sha1(sortedArr.join(''));

    if (req.method === 'GET'){
        if (sha1Str === signature){
            res.end(echostr);
        } else {
            res.end('error');
        }
    } else if (req.method === 'POST') {
        if (sha1Str !== signature) {
            res.end('error');
            return;
        }
        const xmlData = await new Promise((resolve, reject) => {
            let xmlData = '';
            req
                .on('data',data => {
                xmlData += data.toString();
            })
                .on('end', () => {
                    resolve(xmlData);
                });
        });
        let jsData = null;
        parseString(xmlData, {trim: true}, (err, result) =>{
            if (!err){
                jsData = result;
            } else{
                jsData = {};
            }
        });
        const {xml} = jsData;
        let userData = {};
        for (let key in xml){
            const value = xml[key];
            userData[key] = value[0];
        }
        console.log(userData);

        let content = '我扶摇不要面子的吗?';

        if (userData.content === '1') {
            content = '大吉大利,今晚吃鸡';
        } else if (userData.content.indexOf('2') !== -1) {
            content = '你属什么? \n 我属于你';
        }

        let replyMessage =  `<xml>
          <ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
          <FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
          <CreateTime>${Date.now()}</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[${content}]]></Content>
        </xml>`

        res.send(replyMessage);
    } else {
        res.end('error');
    }
});

app.listen(3880, err => {
    if (!err) {
        console.log('服务器启动成功');
    } else {
        console.log(err);
    }
});