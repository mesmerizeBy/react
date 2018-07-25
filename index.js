var express             = require('express');
var app                 = express();
var path                = require('path');
var bodyParser          = require("body-parser");  



app.set('views', path.join(__dirname, 'src'));  
app.set('view engine', 'html');  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'src')))


app.get('/', function (req, res) {
   res.render("index.html");
})

var server = app.listen(3001, function () {
 
  var host = server.address().address;
  var port = server.address().port;
 
  console.log("mypage，访问地址为 http://%s:%s", host, port);
 
})