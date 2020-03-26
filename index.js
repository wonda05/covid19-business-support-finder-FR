var express = require('express');
var app = express();
var path = require('path');

app.use("/static", express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/questionnaire', function(req, res) {
    res.sendFile(path.join(__dirname + '/questionnaire.html'));
});

app.get('/guidance', function(req, res) {
    res.sendFile(path.join(__dirname + '/guidance.html'));
});

app.listen(8080);