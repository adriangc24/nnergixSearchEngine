var express = require('express')
var router = express.Router();

router.use(express.static(path.join(__dirname + "/public")));

module.exports = (() => {
    router.get("/", (req, res) => {
        res.render(path.join(__dirname + "/public/index.html"))
    })

    router.post("/search", (req, res) => {
        res.send({ "status": "200" })
        console.log(req.body)
    })

    return router;
})();