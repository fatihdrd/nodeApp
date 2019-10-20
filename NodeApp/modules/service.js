var request = require("request");

function PostPayment(amount, receiptMsgMerchant, receiptMsgCustomer,qrCode) {
    var options = {
        method: 'POST',
        url: 'https://sandbox-api.payosy.com/api/payment',
        headers:
            {
                'accept': 'application/json',
                'content-type': 'application/json',
                'x-ibm-client-secret': 'bF1rB2nC1jY2tM4dL2bU1yO8sB1kX7cP3nK3pU0bV3gH1cN3uT',
                'x-ibm-client-id': 'd56a0277-2ee3-4ae5-97c8-467abeda984d'
            },
        body:
            {
                returnCode: 1000,
                returnDesc: 'success',
                receiptMsgCustomer: receiptMsgCustomer,
                receiptMsgMerchant: receiptMsgMerchant,
                paymentInfoList:
                    [{
                        paymentProcessorID: 67,
                        paymentActionList: [{ paymentType: 3, amount: amount, currencyID: 949, vatRate: 800 }]
                    }],
                QRdata: qrCode
            },
        json: true
    };
    console.log(options);
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                console.error('Failed: %s', error.message);
                reject(error.message); 
            };
            console.log('Success: ', body);
            resolve("işlem başarılı");
        });
    });
}

module.exports.PostPayment = PostPayment;