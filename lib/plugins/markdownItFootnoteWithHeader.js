// .lib/plugins/markdownItFootnoteWithHeader.js

module.exports = function markdownItFootnoteWithHeader(md) {
    // Simpan metode asli
    const renderFootnotes = md.renderer.rules.footnote_block;

    // Definisikan metode baru
    md.renderer.rules.footnote_block = function(...args) {
        // Tambahkan <h2> sebelum daftar catatan kaki
        const header = '<h2>Catatan kaki</h2>\n';
        const originalFootnotes = renderFootnotes(...args);
        return header + originalFootnotes;
    };
};