const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.send(cards));
};

const getCard = (req, res) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => {
      if (!card) {
        res.status(404).send({
          message: 'Карточка с указанным _id не найдена',
        });
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

const createCard = (req, res) => {
  Card.create({ ...req.body })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.end(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports = {
  getCards,
  getCard,
  createCard,
  likeCard,
  dislikeCard,
};
