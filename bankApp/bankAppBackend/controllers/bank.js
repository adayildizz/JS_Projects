const User = require("../models/user");
const Transaction = require("../models/transaction");

exports.transfer = (req, res, next) => {
  const iban = +req.body.iban;
  const amount = +req.body.amount;
  const dummyId = 1111; //for current user
  const jwt = req.body.jwt;
  console.log(jwt);

  // Find the reciever
  User.findOne({ iban: iban })
    .then((user) => {
      if (!user) {
        return res.status().json({ message: "IBAN is not valid." });
      }

      //create the transaction
      const transaction = new Transaction({
        from: dummyId,
        to: user._id,
        amount: amount,
      });

      //update the reciever's account
      transaction
        .save()
        .then((transaction) => {
          user.account.transactions.push(transaction._id);
          user.account.balance += amount;
          user.save();

          //update the sender's account
          User.findById(dummyId)
            .then((currentUser) => {
              currentUser.accounts.transactions.push(transaction);
              currentUser.account.balance -= amount;
              return currentUser.save();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      return res.status(200).json({ message: "Transaction successful." });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loan = (req, res, next) => {
  const amount = +req.body.amount;
  const dummyId = 1111; //for current user

  User.findById(dummyId)
    .then((user) => {
      user.account.balance += amount;
      user.save();
    })
    .catch((err) => {
      console.log(err);
    });
  return res.status(200).json({ message: "Loan is successful." });
};
