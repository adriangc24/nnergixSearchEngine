var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
var url = process.env.DB_URI;
var _db;

module.exports = {

    connectToServer: function(callback) {
        MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            _db = client.db('searchEngineDB');
            return callback(err);
        });
    },

    getDb: function() {
        return _db;
    }
};