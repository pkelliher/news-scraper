// Controller for our headlines
// ============================
const db = require("../models");

module.exports = {
  // Find all headlines, sort them by date, send them back to the user
  findAll(req, res) {
    db.Headline
      .find(req.query)
      .sort({ date: -1 })
      .then(dbHeadline => {
        res.json(dbHeadline);
      });
  },
  // Delete the specified headline
  delete(req, res) {
    db.Headline.remove({ _id: req.params.id }).then(dbHeadline => {
      res.json(dbHeadline);
    });
  },
  // Update the specified headline
  update(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(dbHeadline => {
      res.json(dbHeadline);
    });
  }
};
