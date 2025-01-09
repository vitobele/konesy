module.exports = function(eleventyConfig) {

    eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
      if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
        return false;
      }
    });

    eleventyConfig.addPassthroughCopy({"src/img":"/img"});

    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("./src/content/**/*.md").reverse();
    });
    eleventyConfig.addCollection("blog", function (collectionApi) {
      return collectionApi.getFilteredByGlob("./src/content/blog/**/*.md").reverse();
    });
    
    return {
      dir: {
        input: "src",
        includes: "_includes",
        output: "_site"
      },

      templateFormats: ["md", "njk", "html"],
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dataTemplateEngine: "njk",
    };
  };