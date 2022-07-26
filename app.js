const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62dd0baa9dd871538c319bea',
  };
  next();
});
app.use(router);

app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((result) => {
      console.log(`Успешное подключение к базе '${result.connection.name}'`);
    })
    .catch((err) => console.error(`ERROR: ${err}`));

  console.log('Сервер запущен');
});
