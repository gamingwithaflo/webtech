const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'React',
        header: 'Hello world!'
    });
});
app.get('/what-is-react', (req, res) => {
    res.render('pages/what-is-react');
});
app.get('/getting-started', (req, res) => {
    res.render('pages/getting-started');
});
app.get('/notable-features', (req, res) => {
    res.render('pages/notable-features');
});
app.get('/history', (req, res) => {
    res.render('pages/history');
});
app.get('/assessment', (req, res) => {
    res.render('pages/assessment');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
