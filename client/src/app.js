var express = require('express');
var path = require('path');
var app = express();
var port = 8080;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', function (req, res) {
    res.render('pages/index', {
        title: 'React',
        header: 'Hello world!'
    });
});
app.get('/what-is-react', function (req, res) {
    res.render('pages/what-is-react');
});
app.get('/getting-started', function (req, res) {
    res.render('pages/getting-started');
});
app.get('/notable-features', function (req, res) {
    res.render('pages/notable-features');
});
app.get('/history', function (req, res) {
    res.render('pages/history');
});
app.get('/assessment', function (req, res) {
    res.render('pages/assessment');
});
app.listen(port, function () {
    console.log("App listening at http://localhost:" + port);
});
