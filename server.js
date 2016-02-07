var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var mailgunApiKey = 'key-8a6f961d68ed6c16ac83dfaf60b96001'
var mailgunDomain = 'sandbox1783d6090dde4d9f96975ffc132f7e2a.mailgun.org'
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain });
//TODO!!!! FIX
var TWILIO_ACCOUNT_SID = "ACe79d77e7c4ba09bf36b0fd4b75681bff"
var TWILIO_AUTH_TOKEN = "f236b24df4564cb72a9c2126066a778f"
var twilio = require('twilio')(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)
app.set('views', __dirname + '/app');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(request, response) {
    response.render('index.html');
});

app.post('/LCB/postWrapper', function(req, res) {
    console.log(req.body);
    request({
        url: "https://wslcb.mjtraceability.com/serverjson.asp",
        method: "POST",
        json: true,   // <--Very important!!!
        body: req.body
    }, function (error, response, body){
        res.send(body);
    });
})

app.post('/mail/testmessage/', function(req, res){
    // res.send(sendMail());
    var message = {};
    // console.log(req.body);

    // sendMail(message);
    res.send('hey')
})

app.post('/textMessage/test/', function(req, res){
    // res.send(sendMail());
    var message = {};
    var item = req.body.auction.item
    // console.log(req.body);
    var message = "You have agreed to purchase " + item.id + " " + item.productname + " on Potnet.net. If you are receiving this message in error, please reply 'Error' to this message. "

    sendTextMessage(message, function(r){
        res.send(r)
    })

    // sendMail(message);
    // res.send('hey')
})

function sendTextMessage(message, next){
    twilio.sendMessage({

        to:'+16178756637', // Any number Twilio can deliver to
        from: '+13602037989', // A number you bought from Twilio and can use for outbound communication
        body: message // body of the SMS message

    }, function(err, responseData) { //this function is executed when a response is received from Twilio
        console.log(responseData);
        console.log(err);
        if (!err) { // "err" is an error received during the request, if any

        // "responseData" is a JavaScript object containing data received from Twilio.
        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

        console.log(responseData.from); // outputs "+14506667788"
        console.log(responseData.body); // outputs "word to your mother."
        next(responseData)
    }
    // console.log(twilio);
});

}
function sendMail(message){
    var data = {
        from: 'Potnet Dotnet Robot <donotreply@potnet.net>',
        to: 'merhone@gmail.com',
        subject: 'Welcome to the future!',
        text: 'Get back to the house before the sun comes up!'
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
