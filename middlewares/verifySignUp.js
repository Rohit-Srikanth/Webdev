const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
