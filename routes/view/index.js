const router = require("express").Router();
const db = require("../../models");

// This route renders the homepage
router.get("/", (req, res) => {
  db.Headline.find({ saved: false })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render("home", { articles: dbArticles });
    });
});

// This route renders the saved handlebars page
router.get("/saved", (req, res) => {
  db.Headline.find({ saved: true })
    .sort({ date: -1 })
    .then(dbArticles => {
      res.render("saved", { articles: dbArticles });
    });
});

module.exports = router;