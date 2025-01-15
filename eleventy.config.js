const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItFootnoteWithHeader = require('./lib/plugins/markdownItFootnoteWithHeader');

module.exports = function(eleventyConfig) {

  // Filter out draft posts during build
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy({"src/img":"/img"});
  eleventyConfig.addPassthroughCopy({"src/js":"/js"});
  eleventyConfig.addPassthroughCopy({"src/css/lib":"/css/lib"});

  // Markdown-it configuration with footnote plugin
  const markdownLib = markdownIt({
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    typographer: true // Enable smartypants and other typographic transformations
  }).use(markdownItFootnote).use(markdownItFootnoteWithHeader);

  // Using markdown-it configuration in 11ty
  eleventyConfig.setLibrary("md", markdownLib);

  // Add custom collections
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