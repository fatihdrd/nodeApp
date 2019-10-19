
(function () {
    var privateMethods = {
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


    }
    //public:
    var publicMethods = {
        Init: function () {
            privateMethods.SendData();
        }

    };
    //expose public methods
    if (typeof Categories == 'undefined') {
        Payment = publicMethods;
    }
    else {
        Payment = $.extend({}, Payment, publicMethods);
    }

})();

