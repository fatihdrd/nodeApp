var fs = require("fs");

function getQrCode(fileName) {
    var qrCode;
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (err, buf) {
            if (err) {
                reject(err);
            }
            else {
                resolve(buf.toString());
            }
        });
    });

}

module.exports.getQrCode = getQrCode;