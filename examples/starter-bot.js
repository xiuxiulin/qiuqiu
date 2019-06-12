// /**
//  * Wechaty - WeChat Bot SDK for Personal Account, Powered by TypeScript, Docker, and 💖
//  *  - https://github.com/chatie/wechaty
//  */

module.exports = function(bot, eventEmitter) {
  // function onScan(qrcode, status) {
  //   require('qrcode-terminal').generate(qrcode, { small: true }); // show qrcode on console

  //   const qrcodeImageUrl = [
  //     'https://api.qrserver.com/v1/create-qr-code/?data=',
  //     encodeURIComponent(qrcode),
  //   ].join('');

  //   console.log(qrcodeImageUrl);
  // }

  // function onLogin(user) {
  //   console.log(`${user} login`);
  // }

  // function onLogout(user) {
  //   console.log(`${user} logout`);
  // }

  // async function onMessage(msg) {
  //   console.log(msg.toString());
  // }

  // const bot = new Wechaty();

  // bot.on('scan', onScan);
  // bot.on('login', onLogin);
  // bot.on('logout', onLogout);
  // bot.on('message', onMessage);

  // bot
  //   .start()
  //   .then(() => console.log('Starter Bot Started.'))
  //   .catch(e => console.error(e));

  // 设置完成

  // 运行 wechaty
  bot
    .on('scan', (qrcode, status) => {
      const qc = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrcode,
      )}`;

      console.log(
        `Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          qrcode,
        )}`,
      );
      eventEmitter.emit('handlerScan', qc);
    })
    .on('login', user => {
      console.log(`User ${user} logined`);
      eventEmitter.emit('handlerLogin', user);
    })
    .on('logout', user => {
      console.log(`User ${user} logout`);
    })
    .on('message', message => console.log(`Message: ${message}`))
    .start();
};
