const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
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
  const { _id } = req.user;
  req.body.owner = _id;
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

const deleteCard = (req, res) => {
  const { id } = req.params;

  Card.findOneAndRemove({ _id: id })
    .then((card) => {
      console.log(card);
      if (!card) {
        return res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      }
      console.log(card.owner, req.user._id);
      if (card.owner !== req.user._id) {
        return res.status(403).send({ message: 'Недостаточно прав!' });
      }
      return res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(400).send({ message: 'Карточка с указанным _id не найдена' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки',
        });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
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
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(404).send({
          message: 'Переданы некорректные данные для снятии лайка',
        });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
