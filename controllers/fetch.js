// Controller for our scraper
// ============================
const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines(req, res) {
    // scrape the NYT
    return scrape()
      .then(articles => {
        // then insert articles into the db
        return db.Headline.create(articles);
      })
      .then(dbHeadline => {
        if (dbHeadline.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbHeadline.length + " new articles!"
          });
        }
      })
      .catch(err => {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.json({
          message: "Scrape complete!!"
        });
      });
  }
};
