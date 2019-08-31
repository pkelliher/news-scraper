// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
const axios = require("axios");
const cheerio = require("cheerio");

// This function will scrape the NYTimes website
const scrape = function() {
  // Scrape the NYTimes website
  return axios.get("http://www.nytimes.com").then(res => {
    const $ = cheerio.load(res.data);
    console.log("scraping");
    // Make an empty array to save our article info
    const articles = [];

    // Now, find and loop through each element that has the ".assetWrapper" class
    // (i.e, the section holding the articles)
    $(".assetWrapper").each((i, element) => {
      // In each article section, we grab the headline, URL, and summary

      // Grab the headline of the article
      const head = $(this)
        .find("h2")
        .text()
        .trim();

      // Grab the URL of the article
      const url = $(this)
        .find("a")
        .attr("href");

      // Grab the summary of the article
      const sum = $(this)
        .find("p")
        .text()
        .trim();

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        const sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        const dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };

        // Push new article into articles array
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;