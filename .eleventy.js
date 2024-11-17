// .eleventy.js

module.exports = function (config) {
  config.addWatchTarget("./src");
  config.addPassthroughCopy("./src/assets");

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
