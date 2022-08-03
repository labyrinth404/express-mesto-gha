const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(router);

app.use((err, req, res) => {
  res.send({ message: err.message });
});

app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log(`Успешное подключение к базе '${result.connection.name}'`);
    })
    .catch((err) => console.error(`ERROR: ${err}`));

  console.log('Сервер запущен');
});
