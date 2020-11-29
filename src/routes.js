var express = require('express')
var router = express.Router();
var functions = require('./functions')

router.use(express.static(path.join(__dirname + "/public")));

module.exports = (() => {
    router.get("/", (req, res) => {
        res.render("index.html")
    })

    router.get("/search", async(req, res) => {
        try {
            var url = req.query.query;
            new URL(url)
        } catch (e) {
            res.send({ "error": "URL format invalid" })
            return "Invalid URL"
        }

        await functions.findReferences(url, function(urlObject) {
            if (urlObject == null || urlObject == undefined) {
                request(url, async function(err, resp, body) {
                    try {
                        $ = cheerio.load(body)
                    } catch (e) {
                        res.send({ "error": "invalid URL" })
                        return "Invalid URL"
                    }

                    links = $('*[href]'); //jquery get all hyperlinks
                    let result = [];
                    $(links).each(function(i, link) {
                        result.push($(link).attr('href'));
                    });
                    await functions.saveReferences(url, result)

                    res.send({ "result": result })
                });
            } else {
                res.send({ "result": urlObject.references })
            }
        })




    })

    return router;
})();