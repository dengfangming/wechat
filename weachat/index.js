const rp = require('request-promise-native');
const fetchAccessToken = require('./access_token');

const menu = {
    "button":[
    {
        "type":"click",
        "name":"歌曲⚡",
        "key":"music",
        "sub_button":[
            {
                "type":"view",
                "name":"搜索",
                "url":"http://www.soso.com/"
            }]
    },
    {
        "name":"菜单🔯",
        "sub_button":[
            {
                "type":"view",
                "name":"搜索",
                "url":"http://www.soso.com/"
            },
            {
                "type":"click",
                "name":"赞一下我们",
                "key":"V1001_GOOD"
            },
            {
                "type": "scancode_waitmsg",
                "name": "扫码带提示",
                "key": "rselfmenu_0_0",
            },
            {
                "type": "scancode_push",
                "name": "扫码推事件",
                "key": "rselfmenu_0_1",

            },
            {
                "name": "发送位置",
                "type": "location_select",
                "key": "rselfmenu_2_0"
            },
            ]
    },
    {
        "name":"菜单🏄",
        "sub_button":[
            {
                "type":"view",
                "name":"搜索",
                "url":"http://www.soso.com/"
            },
            {
                "type":"click",
                "name":"赞一下我们",
                "key":"98K"
            },
            {
                "type": "pic_sysphoto",
                "name": "系统拍照发图",
                "key": "rselfmenu_1_0",
                "sub_button": [ ]
            },
            {
                "type": "pic_photo_or_album",
                "name": "拍照或者相册发图",
                "key": "rselfmenu_1_1",
                "sub_button": [ ]
            },
            {
                "type": "pic_weixin",
                "name": "微信相册发图",
                "key": "rselfmenu_1_2",
                "sub_button": [ ]


    },
            ]
    },
    ]
};

 async function createMenu() {
     const { access_token } = await fetchAccessToken();
     const url =`https://api.weixin.qq.com/cgi-bin/menu/create?access_token= ${access_token}`;

     const result = rp({ method: 'POST', url, json : true, body: menu});

     return result;
     // 模版字符串
}

async function deleteMenu() {
    const { access_token } = await fetchAccessToken();
    const url =`https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`;

    const result = rp({ method: 'GET', url, json : true});
    return result;
}
(async () => {
    let result = await deleteMenu();
    console.log(result);
    result = await createMenu();
    console.log(result);
})();