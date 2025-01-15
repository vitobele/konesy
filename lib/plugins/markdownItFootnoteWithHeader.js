// .lib/plugins/markdownItFootnoteWithHeader.js

module.exports = function markdownItFootnoteWithHeader(md) {
    console.log('Plugin markdownItFootnoteWithHeader loaded');  // Log ini muncul, jadi plugin dimuat

    // Simpan metode asli
    const renderFootnotes = md.renderer.rules.footnote_block;

    // Definisikan metode baru
    md.renderer.rules.footnote_block = function(...args) {
        console.log('Rendering footnotes...');  // Log ini untuk memastikan fungsi dipanggil
        // Tambahkan <h2> sebelum daftar catatan kaki
        const header = '<h2>Footnotes</h2>\n';
        const originalFootnotes = renderFootnotes(...args);
        console.log('Original footnotes:', originalFootnotes);  // Log isi dari footnotes asli
        return header + originalFootnotes;
    };
};