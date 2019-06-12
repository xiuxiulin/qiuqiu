let qrcode = null;
const scanFun = function(eventEmitter) {
  eventEmitter.on('handlerScan', function(qc) {
    console.log('处理scan事件');
    qrcode = qc;
  });
};
const getQrcode = function() {
  return qrcode;
};
module.exports = {
  scanFun,
  getQrcode,
};
