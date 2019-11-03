const express = require("express"),
      axios   = require("axios"),
      cheerio = require("cheerio"),
      db      = require("../models"),
      router  = express.Router();

router.get("/scrape", function(req, res) {

  axios.get("https://www.espn.com/").then(function(response) {

    let $ = cheerio.load(response.data);

    // console.log(response.data);

    $(".headlineStack__listContainer ul li").each(function(i, element) {

      let result = {};

      console.log(result);

      result.title = $(this).children("a").text();
      result.link = $(this).children("a").attr("href");

      db.Article.create(result)
        .then(function(dbArticle) {

          console.log(dbArticle);

        })
        .catch(function(err) {

          console.log(err);

        });

    });

    res.redirect("/");

  });

});

router.get("/articles/:id", function(req, res) {

  db.Article.findOne({ _id: req.params.id })
    .populate("comment")
    .then((dbArticle) => {

      res.json(dbArticle);

    })
    .catch((err) => {

      res.json(err);

    });

});

router.post("/articles/:id", function(req, res) {

  db.Comment.create(req.body)
    .then(function(dbComment) {

      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push : {
  
            comment: dbComment._id 
  
          }
        },
        { new: true });

    })
    .then(function(dbArticle) {

      res.json(dbArticle);

    })
    .catch(function(err) {

      res.json(err);

    });

});

router.post("/delete/:id", function(req, res) {

  console.log('calling delete');

  db.Article.deleteOne({_id : req.params.id})

  .then(() => {

    res.json({});

  });

});

module.exports = router;