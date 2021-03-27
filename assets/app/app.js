const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Title',
        header: 'Hello world!',
        content: 'Content'
    });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
