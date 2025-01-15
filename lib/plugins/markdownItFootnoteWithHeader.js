// .lib/plugins/markdownItFootnoteWithHeader.js

module.exports = function markdownItFootnoteWithHeader(md) {
    console.log('Plugin markdownItFootnoteWithHeader loaded');

    // Tambahkan rule baru setelah footnotes diproses
    md.core.ruler.after('inline', 'footnote_with_header', (state) => {
        const tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'footnote_block_open') {
                console.log('Rendering footnotes...');
                // Tambahkan header sebelum footnote_block_open
                tokens.splice(i, 0, new state.Token('html_block', '', 0, {
                    content: '<h2>Footnotes</h2>\n'
                }));
                break;
            }
        }
    });
};