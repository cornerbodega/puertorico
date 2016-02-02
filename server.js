var express = require("express");
var request = require('request');
// console.log(express);
var app = express();
// app.use(express.logger());
var logger = require('morgan');
app.use(logger); //replaces your app.use(express.logger());

// Configuration

// app.configure(function(){
  app.set('views', __dirname + '/app');
  //app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
  app.engine('html', require('ejs').renderFile);
// });

app.get('/', function(request, response) {
  response.render('index.html')
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
