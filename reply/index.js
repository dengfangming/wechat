const sha1 = require('sha1');
const { getUserDataAsync, parseXMLData, formatJsData } = require('../utils/tools');
const  template = require('./template');

module.exports = () => {
    return async (req,res) => {
        const {signature, echostr, timestamp, nonce } = req.query;
        const token = 'javascript2019319';
        const sha1Str = sha1([token, timestamp, nonce].sort().join(''));
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
            const xmlData = await getUserDataAsync(req);

            const jsData = parseXMLData(xmlData);

            const userData = formatJsData (jsData);

            let options = {
                toUserName: userData.FromUserName,
                fromUserName: userData.ToUserName,
                createTime: Date.now(),
                type:'text',
                content: '我扶摇不要面子的吗?'
            };

            if (userData.Content === '三岁') {
                options.content = '大吉大利,今晚吃鸡';
            } else if (userData.Content && userData.Content.indexOf('2') !== -1) {
                options.content = '你属什么? \n 我属于你';
            }

            if (userData.MsgType === 'image') {
                options.mediaId = userData.MediaId;
                options.type = 'image';
            }

            const  replyMessage = template(options);
            console.log(replyMessage);

            res.send(replyMessage);
        } else {
            res.end('error');
        }
    };
};