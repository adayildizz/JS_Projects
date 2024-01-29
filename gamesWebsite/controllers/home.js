exports.getIndex = (req, res, next) => {
  res.redirect("/games/All");
};

exports.getHome = (req, res, next) => {
  const category = req.params.category;
  const searchMode = req.query.search;
  const searchStr = req.body.search;

  fetch(
    "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=All&categories=All&tags=All&subType=All&type=All&mobile=All&rewarded=all&amount=40&page=1&format=json",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      // Setting all categories
      let categories = ["All"];
      for (game of resData) {
        categories = categories.concat(game.Category);
      }

      categories = categories.filter(
        (item, index) => categories.indexOf(item) === index
      );

      if (!searchMode) {
        //Setting games which is in desired category
        let games = [];
        if (category.toString() === "All") {
          games = resData;
        } else {
          for (game of resData) {
            if (game.Category.includes(category)) {
              games.push(game);
            }
          }
        }
        return res.render("home", {
          games: games,
          categories: categories,
        });
      } else {
        let rawGames = resData.map((game) => {
          let gameStr = "";
          let infoArray = game.Category.concat(game.Tag);
          infoArray.push(game.Description);
          infoArray.push(game.Instructions);
          infoArray.push(game.Title);
          for (info of infoArray) {
            gameStr += info;
          }
          game["gameStr"] = gameStr;
          return game;
        });
        // console.log(rawGames[0]);
        // console.log(searchStr);
        let games = [];
        for (rawGame of rawGames) {
          if (rawGame.gameStr.toLowerCase().includes(searchStr)) {
            let { gameStr, ...game } = rawGame;
            games.push(game);
          }
        }

        return res.render("home", {
          games: games,
          categories: categories,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.goGame = (req, res, next) => {
  const gameTitle = req.params.gameTitle;
  fetch(
    "https://catalog.api.gamedistribution.com/api/v2.0/rss/All/?collection=All&categories=All&tags=All&subType=All&type=All&mobile=All&rewarded=all&amount=40&page=1&format=json",
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      let categories = ["All"];
      for (game of resData) {
        categories = categories.concat(game.Category);
      }

      categories = categories.filter(
        (item, index) => categories.indexOf(item) === index
      );

      for (game of resData) {
        if (game.Title.toString() === gameTitle.toString()) {
          let similarGames = [];
          resData.forEach((element) => {
            for (cat of game.Category) {
              if (element.Category.includes(cat)) {
                if (
                  !similarGames.includes(element) &&
                  game.Title.toString() !== element.Title.toString()
                ) {
                  similarGames.push(element);
                }
              }
            }
          });

          return res.render("play", {
            game: game,
            categories: categories,
            games: resData,
            similarGames: similarGames,
          });
        }
      }
    })

    .catch((err) => {
      console.log(err);
    });
};
