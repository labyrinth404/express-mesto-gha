const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/', (req, res) => {
  res.status(201);
  res.send('Hello world!');
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
