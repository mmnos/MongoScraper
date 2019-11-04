const express = require("express"),
      axios   = require("axios"),
      cheerio = require("cheerio"),
      db      = require("../models"),
      router  = express.Router();

router.get("", function(req, res) {

  db.Article.find({})
  .populate("comment")
  .sort({'date': -1})
  .limit(5)
    .then(function(dbArticle) {

      res.render("index", { articles : dbArticle });

    })
    .catch(function(err) {

      res.json(err);

    });

});

module.exports = router;