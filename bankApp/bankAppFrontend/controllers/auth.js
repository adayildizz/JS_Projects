exports.getIndex = (req, res, next) => {
  return res.render("../views/auth/index.ejs");
};

exports.getSignup = (req, res, next) => {
  console.log("going sign up page...");
  return res.render("../views/auth/signup.ejs");
};

exports.getLogin = (req, res, next) => {
  console.log("going log in page...");
  return res.render("../views/auth/login.ejs");
};

exports.postSignup = async (req, res, next) => {
  console.log("signing up...");
  fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: req.body.name,
      identity: req.body.identity,
      password: req.body.password,
      iban: Math.floor(Math.random() * 9000 + 1000),
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      console.log(resData.message);
      // redirect to another page.
      if (resData.user) {
        return res.render("./auth/login");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogin = (req, res, next) => {
  console.log("logging in...");
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: req.body.name,
      identity: req.body.identity,
      password: req.body.password,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      //console.log(resData.token);
      //localStorage.setItem("savedToken", resData.token);
      if (resData.user) {
        return res.render("./bank/bank.ejs", {
          jwt: resData.token,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
