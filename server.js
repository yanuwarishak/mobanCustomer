var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//Middleware has access to that req and res, and most of modules have their own middleware
//View Engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

//Bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Static folder middleware, setting static path
app.use(express.static(path.join(__dirname,'public')));

//Global Vars
app.use(function(req, res, next){
    res.locals.errors = null;
    next();
});

//Routing
//Get home
app.get('/', function(req,res){
        res.render('index');
});

//Post Form
app.post('/send', function(req,res){

    var text = req.body.customText;
    var textEncodedurl = encodeURI(text);
    var noHP = req.body.noHP;
    var noHPEncodedurl = encodeURI(noHP);
    res.redirect("https://wa.me/"+noHPEncodedurl+"?text="+textEncodedurl+"");
});

app.listen(process.env.PORT || 8080);