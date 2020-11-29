var mongoose = require('mongoose');

var referenceSchema = mongoose.Schema({
    URL: {
        type: String
    },
    links: {
        type: [String]
    }
})

var reference = module.exports = mongoose.model('reference', referenceSchema);

module.exports.getUrls = function(url, callback) {
    reference.findOne({ url: url }, callback)
}

module.exports.saveLinks = function(record, callback) {
    var newRecord = new reference(record);
    newRecord.save(callback);
}

exports.module = reference;