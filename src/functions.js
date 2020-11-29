var mongoUtil = require('./mongoUtil');
var db;

findReferences = async(url, callback) => {
    if (db == null || db == undefined) {
        db = await mongoUtil.getDb();
    }
    await db.collection('urls').findOne({ url: url }, function(err, doc) {
        if (err) {
            console.log("Error: " + err)
        } else {
            if (doc == undefined || doc == null) {
                callback(null);
            } else {
                callback(doc);
            }
        }
    })
}

saveReferences = async(url, references) => {
    db = await mongoUtil.getDb();
    await db.collection('urls').insertOne({ url: url, references: references }, function(err, res) {
        if (err) {
            throw err;
        }
    })
}

module.exports.findReferences = findReferences;
module.exports.saveReferences = saveReferences;