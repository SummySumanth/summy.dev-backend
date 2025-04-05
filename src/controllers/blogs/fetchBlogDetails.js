const Parser = require("rss-parser");
const parser = new Parser({
  headers: { "User-Agent": "Mozilla/5.0 (Node.js RSS Reader)" },
});

const fetchBlogsList = () =>
  parser.parseURL("https://medium.com/feed/@sumanthbettadapura");

module.exports = { fetchBlogsList };
