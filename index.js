var express = require('express');
var app = express();
var path = require('path');

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/result', function(req, res) {
    res.sendFile(path.join(__dirname + '/result.html'));
});

app.listen(8080);