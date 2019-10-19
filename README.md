# NodeApp

**app.js altında**

* main.js module'unun tanımlanması 
```
var main = require('./modules/main');
```

* Ödeme için client'tan gelecek olan SendPayment Requestinin server tarafından karşılanmasının sağlanması
```
var app = express();
app.post('/SendPayment', function(req, res){
    var store = '';
    req.on('data', function(data) 
    {
        store += data;
    });

    req.on('end', function () {
        var input = JSON.parse(store);
        main.Start(input.amount, input.receiptMsgMerchant, input.receiptMsgCustomer).then(function (result) {
            res.setHeader("Content-Type", "text/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(result);
        });
    });
});
```

**#main.js altında**

* gerekli custom modüllerin tanımlanması 
```
var fileReader = require('./fileReader');
var service = require('./service');
```

* hem qr kodunu okuyacak hem de apiye request atacak methodların çağırılmasını sağlayacak start methodu
```
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
```

**#filereader.js altında**

* qr kodu txt'den okuyacak generic methodun tanımlanması
```
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
```

**#service.js altında**

* PostPayment isimli api call edecek methodun çağrılması
```
function PostPayment(amount, receiptMsgMerchant, receiptMsgCustomer,qrCode) {
```

**#index.pug altında**

* ödeme ekranının hazırlanması ve ödemeyi başlatacak olan ```Payment.Init()``` methodunun çağırılması.
 (Ödeme ekranında sadece amount, receiptMsgMerchant, receiptMsgCustomer bilgilerinin manuel girileceği varsayılmıştır )

**#paymentscreen.js**

* ödeme ekranından girilen dataların ajax request ile node serverına geçişini sağlayacak olan fonksiyon tanımlanmıştır.
  servisten geriye dönen true/false değerini ekranaki label'a basmaktadır.
```
 SendData: function () {
            var amount = $("#amount").val();
            var receiptMsgMerchant = $("#receiptMsgMerchant").val();
            var receiptMsgCustomer = $("#receiptMsgCustomer").val();
            var data = { "amount": amount, "receiptMsgMerchant": receiptMsgMerchant, "receiptMsgCustomer": receiptMsgCustomer };
            $.ajax({
                url: '/SendPayment',
                data: JSON.stringify(data),
                type: 'POST',
                dataType: "json",
                success: function (data) {
                    $("#labelResult").text(data);
                },
                error: function (xhr, status, error) {
                    console.log('Error connecting to the server.: ' + error.message);
                },
            })
        }
```

**NOT: işlem başarılı/hata sayfası/validasyon vs.. kısımları için herhangi bir geliştirme yapılmamıştır.
