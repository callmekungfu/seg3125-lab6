const express = require('express');
const controller = require('./controllers/dataController');
const app = express();
const port = 3001;

app.get('/', (req, res) => res.send('Hello World!'));

controller(app);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
