const express = require('express')
path = require("path"),
    request = require('request'),
    cheerio = require('cheerio'),
    cors = require('cors'),
    axios = require('axios'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    mongoUtil = require('./mongoUtil'),
    mongo = require('mongodb');

const PORT = 3000;

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));
app.use(require('./routes.js'));

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);

    mongoUtil.connectToServer(function(err, client) {
        if (err) console.log(err);

    });
});