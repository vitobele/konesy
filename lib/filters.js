const { minify } = require('terser');

module.exports = function(eleventyConfig) {

    // filter for capital letters in first word
    eleventyConfig.addFilter('capFirstWord', function(str) {
        return str.replace(/^\w/, function(word) {
            return word.toUpperCase();
        });
    });

    // Filter to check for presence of <pre><code>...</code></pre> tags
    eleventyConfig.addFilter('containsPreCode', function(content) {
        // console.log('Content:', content); // uncomment for Debugging: log content
        const result = /<pre>\s*<code[^>]*>[\s\S]*?<\/code>\s*<\/pre>/.test(content);
        // console.log('Contains <pre><code>:', result); // uncomment for Debugging: log result
        return result;
    });

    // Filters to minify JavaScript
    eleventyConfig.addFilter('jsmin', async function(code) {
        try {
            const minified = await minify(code);
            return minified.code;
        } catch (err) {
            console.error("Terser error: ", err);
            return code;
        }
    });

};