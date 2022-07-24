const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');
const { PORT = 3004 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((result) =>
      console.info(`Успешное подключение к базе '${result.connection.name}'`)
    )
    .catch((err) => console.error(`ERROR: ${err}`));
  console.log('Сервер запущен');
});
