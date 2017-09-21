'use strict';

var fs = require('fs');
exports.handler = (event, context, callback) => {

    var uri = event.Records[0].cf.request.uri;
    if(uri == "/") {
        uri = "index.html"
    }

    var response = fs.readFile("public/" + uri, function(error, data){
        if(error || ! data) {
            return callback(null, notFound());
        }
        return callback(null, ok(data.toString()));
    });
}

var ok = function(data) {
    return {
        status: "200",
        statusDescription: 'OK',
        headers: {
            'cache-control': [{
                key: "cache-control",
                value: "public, max-age=120",
            }],
        },
        body: data,
    };
};

var notFound = function() {
    return {
        status: "302",
        statusDescription: 'Found',
        headers: {
            'location': [{
                key: "location",
                value: "/404.html"
            }]
        },
    };
};
