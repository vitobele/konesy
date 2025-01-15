// .lib/plugins/markdownItFootnoteWithHeader.js

module.exports = function markdownItFootnoteWithHeader(md) {
    console.log('Plugin markdownItFootnoteWithHeader loaded');  // Tambahkan log saat build

    // Simpan metode asli
    const renderFootnotes = md.renderer.rules.footnote_block;

    // Definisikan metode baru
    md.renderer.rules.footnote_block = function(...args) {
        console.log('Rendering footnotes...');  // Tambahkan log ini
        // Tambahkan <h2> sebelum daftar catatan kaki
        const header = '<h2>Footnotes</h2>\n';
        const originalFootnotes = renderFootnotes(...args);
        return header + originalFootnotes;
    };
};