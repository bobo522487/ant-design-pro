module.exports = {
  "GET /api/currentUser": {
    "data": {
      "name": "Serati Ma",
      "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      "userid": "00000001",
      "email": "antdesign@alipay.com",
      "signature": "海纳百川，有容乃大",
      "title": "交互专家",
      "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
      "notifyCount": 12,
      "unreadCount": 11,
      "country": "China",
      "access": "admin",
      "geographic": {
        "province": { "label": "浙江省", "key": "330000" },
        "city": { "label": "杭州市", "key": "330100" }
      },
      "address": "西湖区工专路 77 号",
      "phone": "0752-268888888"
    }
  },
  "POST /api/login/account": {
    "status": "ok",
    "type": "account",
    "currentAuthority": "admin"
  },
  "POST /api/login/outLogin": {
    "data": {},
    "success": true
  }
};