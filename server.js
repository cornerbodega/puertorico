var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var mailgunApiKey = 'key-8a6f961d68ed6c16ac83dfaf60b96001'
var mailgunDomain = 'sandbox1783d6090dde4d9f96975ffc132f7e2a.mailgun.org'
var mailgun = require('mailgun-js')({ apiKey: mailgunApiKey, domain: mailgunDomain });

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

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
