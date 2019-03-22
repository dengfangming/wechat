const { parseString } = require('xml2js');
const  { writeFile, readFile} = require('fs');
const { resolve } = require('path');
module.exports = {
    getUserDataAsync(req) {
        return new Promise((resolve, reject) => {
            let xmlData = '';
            req
                .on('data', data => {
                    xmlData += data.toString();
                })
                .on('end', () => {
                    resolve(xmlData);
                });
        });
    },
    parseXMLData(xmlData) {
        let jsData = null;
        parseString(xmlData, {trim: true}, (err, result) => {
            if (!err) {
                jsData = result;
            } else {
                jsData = {};
            }
        });
        return jsData;
    },
    formatJsData(jsData) {
        const {xml} = jsData;
        let userData = {};
        for (let key in xml) {
            const value = xml[key];
            userData[key] = value[0];
        }
        return userData;
    },
    writeFileAsync(filePath,data) {
        return new Promise((resolve, reject) => {
            filePath = resolve(__dirname,'../wechat', filePath);
            writeFile(filePath, JSON.stringify(data), (err) => {
                if (!err) resolve();
                else reject(err);
            })

        })
    },
    readFileAsync (filePath){
        return new Promise((resolve, reject) => {
            filePath = resolve(__dirname, '../wechat', filePath);
            readFile(filePath, (err, data) => {
                if (!err) {
                    resolve(JSON.parse(data.toString()));
                } else {
                    reject(err);
                }
            })
        })
    }
};