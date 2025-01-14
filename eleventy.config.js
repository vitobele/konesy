module.exports = function(eleventyConfig) {

    eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
      if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
        return false;
      }
    });

    // Merge data instead of overriding
    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    eleventyConfig.addPassthroughCopy({"src/img":"/img"});
    eleventyConfig.addPassthroughCopy({"src/js":"/js"});
    eleventyConfig.addPassthroughCopy({"src/css/lib":"/css/lib"});

    eleventyConfig.addCollection("posts", function (collectionApi) {
      return collectionApi.getFilteredByGlob("./src/content/posts/**/*.md").reverse();
    });
    eleventyConfig.addCollection("blog", function (collectionApi) {
      return collectionApi.getFilteredByGlob("./src/content/posts/blog/**/*.md").reverse();
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