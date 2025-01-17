const markdownIt = require("markdown-it");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItHighlightjs = require("markdown-it-highlightjs");
const htmlmin = require('html-minifier-terser');
const filters = require('./lib/filters');

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

  // Watch Target
  eleventyConfig.addWatchTarget("./src/js/");

  // Passthrough file copy
  eleventyConfig.addPassthroughCopy({"src/img":"/img"});
  eleventyConfig.addPassthroughCopy({"src/css/lib":"/css/lib"});

  // Markdown-it configuration with footnote plugin
  const markdownLib = markdownIt({
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    typographer: true // Enable smartypants and other typographic transformations
  }).use(markdownItFootnote).use(markdownItHighlightjs); 

  eleventyConfig.setLibrary("md", markdownLib);

  // Add custom collections
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/posts/**/*.md").reverse();
  });
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./src/content/posts/blog/**/*.md").reverse();
  });

  // Import and apply filters
  filters(eleventyConfig);

  // Transform to add header before footnotes
  eleventyConfig.addTransform("footnoteHeader", function(content, outputPath) {
    if(outputPath && outputPath.endsWith(".html")) {
      const footnoteBlockIndex = content.indexOf('<section class="footnotes">');
      if (footnoteBlockIndex !== -1) {
        const header = '<h2 class="footnotes">Catatan kaki</h2>\n';
        content = content.slice(0, footnoteBlockIndex) + header + content.slice(footnoteBlockIndex);
      }
    }
    return content;
  });

  const isProduction = process.env.NODE_ENV === 'production';
  console.log(`Running in production mode: ${isProduction}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  if (isProduction) {
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
      if (outputPath && outputPath.endsWith(".html")) {
        console.log(`Minifying HTML: ${outputPath}`);
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        console.log(`Minified content for: ${outputPath}`);
        return minified;
      }
      return content;
    });
  }
  
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