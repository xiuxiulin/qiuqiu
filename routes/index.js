// 机器人
const mybot = require('../examples/starter-bot.js');
const login = require('../modules/login.js');
const scan = require('../modules/scan.js');
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// ======== new wxBot =========

const { Wechaty } = require('wechaty');

// const WECHATY_PUPPET_PADCHAT_TOKEN = 'puppet_padchat_d53cd4cff253d8f6';

// const puppet = 'wechaty-puppet-padchat'; // 使用ipad 的方式接入。

// const puppetOptions = {
//   token: WECHATY_PUPPET_PADCHAT_TOKEN,
// };

const bot = new Wechaty({
  name: 'mybot',
});

// const bot = new Wechaty({
//   name: 'mybot',
//   puppet,
//   puppetOptions,
// });

mybot(bot, eventEmitter);
login.loginFun(eventEmitter);
scan.scanFun(eventEmitter);
// ========= end ==========

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('login', {
      title: '请扫码登录',
      qrcode: scan.getQrcode(),
    });
  });

  app.get('/index', function(req, res) {
    res.render('index', {
      title: '请扫码登录',
      loginUser: login.getLoginUser(),
    });
  });
};
