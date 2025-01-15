module.exports = function(eleventyConfig) {

    eleventyConfig.addFilter('capFirstWord', function(str) {
        return str.replace(/^\w/, function(word) {
            return word.toUpperCase();
        });
    });

};