const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const identity = req.body.identity;
  const name = req.body.name;
  const password = req.body.password;
  const iban = req.body.iban;

  console.log(identity);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  User.findOne({ identity: identity }).then((user) => {
    if (user) {
      return res.status(422).json({ message: "User already exists." });
    }
    bcrypt
      .hash(password, 12)
      .then((hashedpw) => {
        const user = new User({
          name: name,
          identity: identity,
          password: hashedpw,
          iban: iban,
        });

        return user.save();
      })
      .then((user) => {
        return res
          .status(201)
          .json({ message: "New user is created.", user: user });
      })
      .catch((err) => {
        next(err);
      });
  });
};

exports.login = (req, res, next) => {
  const name = req.body.name;
  const identity = req.body.identity;
  const password = req.body.password;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  User.findOne({ identity: identity }).then((user) => {
    if (!user) {
      return res.status(422).json({ message: "There is no such a user." });
    }

    if (name.toString() !== user.name.toString()) {
      return res.status(422).json({ message: "There is no such a user." });
    }

    bcrypt.compare(password, user.password).then((doMatch) => {
      if (!doMatch) {
        return res.status(422).json({ message: "Password is wrong." });
      }

      const token = jwt.sign(
        {
          name: user.name,
          identity: user.identity,
          userId: user._id.toString(),
        },
        "somesupersecret",
        { expiresIn: "1h" }
      );

      user.status = true;
      return user.save().then(() => {
        return res
          .status(200)
          .json({ message: "Logged in.", user: user, token: token });
      });
    });
  });
};
