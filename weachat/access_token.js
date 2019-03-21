const rp = require("request-promise-native");
const {writeFile} = require('fs');

 async function getAccessToken() {
    const appId = 'wx1ba4d19ae6f37de1';
    const appSecret = '42d74fc012c3ed714aa146d38a073386';
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    console.log(url);
    const result = await rp({method: 'GET', url, json: true});
    result.expires_in = Date.now() + 7200000 - 300000;

    writeFile('./accessToken.txt', JSON.stringify(result), (err) => {
        if (!err) console.log('文件保存成功');
        else console.log(err);
    });
     return result;
}
console.log(getAccessToken());

 module.exports = function fetchAccessToken () {

   return new Promise((resolve, reject) => {
        readFile('./accessToken.txt', (err, data) => {
            if (!err) {
                resolve(JSON.parse(data.toString()));
            } else {
                reject(err);
            }
        })
    })
        .then(res => {
            console.log(res);
            if (res.expires_in < Date.now()) {
                return getAccessToken();
            } else {
                return res;
            }
        })
        .catch(err => {
            return getAccessToken();
        })

};


