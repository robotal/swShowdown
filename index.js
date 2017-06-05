var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get('/', function(req,res){
    res.render('index');
});

app.get('/scrape', function(req,res){
    res.render('scraper');
});

app.get('/scrapeOne', function(req,res){
    res.render('singleScraper');
});


app.listen(3000, function(){
    console.log('sw-showdown listening on port 3000');
});
