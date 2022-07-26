const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/', (req, res) => {
  res.status(201);
  res.send('Hello world!');
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
