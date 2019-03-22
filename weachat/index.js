const rp = require('request-promise-native');
const fetchAccessToken = require('./access_token');
const URL_PREFIX = 'https://api.weixin.qq.com/cgi-bin/';
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
     const url =`${URL_PREFIX}menu/create?access_token= ${access_token}`;

     const result = rp({ method: 'POST', url, json : true, body: menu});;

     return result;
     // 模版字符串
}

async function deleteMenu() {
    const { access_token } = await fetchAccessToken();
    const url =`${URL_PREFIX}menu/delete?access_token=${access_token}`;

    const result = rp({ method: 'GET', url, json : true});
    return result;
}
//创建标签
async function creatorTag(name) {
    const { access_token } = await fetchAccessToken();
    const url =`${URL_PREFIX}tags/create?access_token=${access_token}`;

    const result = rp({ method: 'POST', url, json : true, body: {tag :{ name}}});
    return result;
}
// 获取标签下粉丝列表
async function beanTag(tagid, next_openid = '') {
    const { access_token } = await fetchAccessToken();
    const url =`${URL_PREFIX}user/tag/get?access_token=${access_token}`;

    const result = rp({ method: 'POST', url, json : true, body: {tagid, next_openid}});
    return result;
}
//批量为用户打标签
async function membersTag( openid_list, tagid) {
    const { access_token } = await fetchAccessToken();
    const url =`${URL_PREFIX}tags/members/batchtagging?access_token=${access_token}`;

    const result = rp({ method: 'POST', url, json : true, body: { openid_list, tagid}});
    return result;
}


(async () => {
    let result1 = await creatorTag('绝地求生6666666');
    console.log(result1);
    let result2 = await membersTag(['oVFD952vUvpfdYbp_J_OWSfDeqo0','oVFD953hwVGFYXz4rVRnkcF00SZ4'],result1.tag.id);
    console.log(result2);
    let result3 = await beanTag(result1.tag.id);
    console.log(result3);
})();