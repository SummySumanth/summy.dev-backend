const express = require("express");
const { htmlToJson } = require("html-to-json-converter-44");

const { fetchBlogsList } = require("../../controllers/blogs/fetchBlogDetails");

const router = express.Router({ mergeParams: true });

router.get("/getBlogsList", (request, response) => {
  fetchBlogsList()
    .then((res) => {
      const blogList = res.items.map((item) => {
        const src = htmlToJson(
          `<div> ${item["content:encoded"]} </div>`,
          false
        );

        const imageSrc = src.children.find((item) => item.tag === "figure")
          .children[0].src;
        return {
          title: item.title,
          link: item.link,
          category: item.categories,
          imageSrc: imageSrc,
        };
      });

      response.send(blogList);
    })
    .catch((err) => {
      response.status(500);
      response.send(err);
    });
});

module.exports = router;
