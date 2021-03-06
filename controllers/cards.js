const Card = require('../models/card');
const { handleErorr } = require('../errors/errorHandler');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleErorr(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.send({ data: card }))
  .catch((err) => handleErorr(err, res));
}

module.exports.deleteCard = (req, res) => {
  Card.deleteOne({ _id: req.params.cardId })
  .then(() => {
    res.send('DONE');
  })
  .catch((err) => handleErorr(err, res));
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
.then((card) => {res.send({data: card})})
.catch((err) => handleErorr(err, res));
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
.then((card) => {res.send({data: card})})
.catch((err) => handleErorr(err, res));
}