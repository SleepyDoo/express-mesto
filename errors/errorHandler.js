const CAST_ERR = 404;
const VALIDATION_ERR = 400;
const BASE_ERR = 500;

module.exports.handleErorr = (err, res) => {
  if (err.name === "CastError") {
    return res.status(CAST_ERR).send({ message: "Не найдено"});
  }
  if (err.name === "ValidationError") {
    return res.status(VALIDATION_ERR).send({ message: "Переданы некорректные данные"});
  } else {
    return res.status(BASE_ERR).send({ message: "Произошла ошибка на стороне сервера"});
  }
}