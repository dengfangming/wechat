
module.exports = (userData) => {
    let options = {
        toUserName: userData.FromUserName,
        fromUserName: userData.ToUserName,
        createTime: Date.now(),
        type:'text',
        content: '我扶摇不要面子的吗?'
    };
   
    if (userData.MsgType === 'text') {
        if (userData.Content === '三岁') {
            options.content = '大吉大利,今晚吃鸡';
        } else if (userData.Content && userData.Content.indexOf('挽留') !== -1) {
            options.content = '我挽留不是狗吗? \n 那谁是狗?';
        }
    } else if (userData.MsgType === 'voice') {
        options.content = userData.Recognition;
    } else if (userData.MsgType === 'location') {
        userData.content = `地理位置纬度: ${userData.Location_X}
        \n 地理位置经度: ${userData.Location_Y}
        \n 地图缩放大小: ${userData.Scale}
        \n 地理位置信息: ${userData.Label}`;
    } else if (userData.MsgType === 'event') {
        if (userData.event ==='subscribe') {
            options.content = '欢迎订阅冥王吃鸡团队';
            if (userData.EventKey) {
                options.content = '欢迎扫码关注'
            }
        } else if (userData.event ==='unsubscribe') {
            console.log('无情取关')
            options.content = '';
        } else if (userData.Event === 'CLICK') {
            options.content = '用户点击了菜单';
        }
    } 
    return options;
};