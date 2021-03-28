var express = require('express');
var app = express();
var port = 8081;
// TODO quiz routes and return json objects with data from database
// TODO login route
app.get('/', function (req, res) {
    res.send('TODO');
});
app.get('/topics', function (req, res) {
    res.send('TODO topics');
});
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
