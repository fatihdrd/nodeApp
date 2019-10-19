var fileReader = require('./fileReader');
var service = require('./service');
function start(amount, receiptMsgMerchant, receiptMsgCustomer) {
    return new Promise(function (resolve, reject) {
        fileReader.getQrCode("qr.txt").then(function (qrCode) {
            console.log(qrCode);
            service.PostPayment(amount, receiptMsgMerchant, receiptMsgCustomer, qrCode).then(function (result) {
                 resolve(result);
              });
        });
         
    });
}

module.exports.Start = start;