var express = require('express')
var router = express.Router();

router.use(express.static(path.join(__dirname + "/public")));

module.exports = (() => {
    router.get("/", (req, res) => {
        res.render("index.html")
    })

    router.get("/search", (req, res) => {
        try {
            var url = req.query.query;
            console.log(url)
            new URL(url)
        } catch (e) {
            res.send({ "error": "URL format invalid" })
            return "Invalid URL"
        }
        request(url, function(err, resp, body) {
            try {
                $ = cheerio.load(body)
            } catch (e) {
                res.send({ "error": "invalid URL" })
                return "Invalid URL"
            }
            links = $('*[href]'); //jquery get all hyperlinks
            let result = [];
            $(links).each(function(i, link) {
                if ($(link).text() != "") {
                    result.push($(link).text() + ':\n  ' + $(link).attr('href'));
                } else {
                    result.push($(link).attr('href'));
                }
            });
            res.send({ "result": result })
        });
    })

    return router;
})();