const express = require('express')
path = require("path"),
    request = require('request'),
    cheerio = require('cheerio'),
    cors = require('cors'),
    axios = require('axios'),
    bodyParser = require('body-parser'),
    routes = require('./routes');
/* var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webcrawler');
var db = mongoose.connection; */
const PORT = 3000;

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "/public")));
app.use(require('./routes.js'));

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});


/* axios.get('https://github.com/').then((response) => {
    const $ = cheerio.load(response.data)
    const urlElems = $('href')

    // We now loop through all the elements found
    for (let i = 0; i < urlElems.length; i++) {
        // Since the URL is within the span element, we can use the find method
        // To get all span elements with the `s1` class that are contained inside the
        // pre element. We select the first such element we find (since we have seen that the first span
        // element contains the URL)
        const urlSpan = $(urlElems[i]).find('span.s1')[0]

        // We proceed, only if the element exists
        if (urlSpan) {
            // We wrap the span in `$` to create another cheerio instance of only the span
            // and use the `text` method to get only the text (ignoring the HTML)
            // of the span element
            const urlText = $(urlSpan).text()

            // We then print the text on to the console
            console.log(urlText)
        }
    }
}) */