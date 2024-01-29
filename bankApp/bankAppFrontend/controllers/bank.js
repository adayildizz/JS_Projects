//exports.getTransfer = (req, res, next) => {};

exports.postTransfer = (req, res, next) => {
  console.log("Sending transferring request.");
  fetch("http://localhost:8080/transfer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + req.body.jwt,
    },
    body: JSON.stringify({
      iban: req.body.iban,
      amount: req.body.transfer_amount,
      jwt: req.body.jwt,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLoan = (req, res, next) => {
  console.log("Loaning money...");
  fetch("http://localhost:8080/loan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: req.body.loan_amount,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData.message);
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};
