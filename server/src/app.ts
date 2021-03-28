const express = require('express');
const app = express();
const port = 8081;

// TODO quiz routes and return json objects with data from database
// TODO login route
app.get('/', (req, res) => {
    res.send('TODO');
});

app.get('/topics', (req, res) => {
    res.send('TODO topics');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
