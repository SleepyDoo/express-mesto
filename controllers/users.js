const User = require('../models/user');
const { handleErorr } = require('../errors/errorHandler');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleErorr(err, res));
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErorr(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErorr(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findOneAndUpdate({_id: req.user._id}, { name, about }, { new: true })
  .then((user) => {res.send({data: user})})
  .catch((err) => handleErorr(err, res));
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findOneAndUpdate({_id: req.user._id}, { avatar }, { new: true })
  .then((user) => {res.send({data: user})})
  .catch((err) => handleErorr(err, res));
}
