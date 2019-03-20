const sha1 = require('sha1');
const { getUserDataAsync, parseXMLData, formatJsData } = require('../utils/tools');
const  template = require('./template');
const  handleResponse = require('./handleResponse');

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

            const options = handleResponse(userData);

            const  replyMessage = template(options);
            console.log(replyMessage);

            res.send(replyMessage);
        } else {
            res.end('error');
        }
    };
};