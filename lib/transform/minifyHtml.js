const htmlmin = require('html-minifier-terser');

module.exports = function(eleventyConfig){

    let minifiedFilesCount = 0; // Counter for minified files

    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if (outputPath && outputPath.endsWith(".html")) {
          // console.log(`Minifying HTML: ${outputPath}`); //uncomment if necessary for debugging
          let minified = htmlmin.minify(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true,
            preserveLineBreaks: true // Explicitly preserve line breaks within <pre> and other elements
          });
          minifiedFilesCount++; // Increment the counter for each minified file
          // console.log(`Minified content for: ${outputPath}`);
          return minified;
        }
        return content;
      });
    
    eleventyConfig.on('afterBuild', () => {
    console.log(`  🎯   Minified ${minifiedFilesCount} files successfully. 👌😀`);
    });
};