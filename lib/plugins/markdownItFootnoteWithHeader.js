// .lib/plugins/markdownItFootnoteWithHeader.js

module.exports = function markdownItFootnoteWithHeader(md) {
    console.log('Plugin markdownItFootnoteWithHeader loaded');  // Pastikan plugin dimuat

    // Simpan metode asli
    const renderFootnotes = md.renderer.rules.footnote_block;

    if (renderFootnotes === undefined) {
        console.log('No footnote_block found');  // Jika tidak ada footnote_block ditemukan
        return;
    }

    // Definisikan metode baru
    md.renderer.rules.footnote_block = function(...args) {
        console.log('Rendering footnotes...');  // Pastikan fungsi dipanggil
        // Tambahkan <h2> sebelum daftar catatan kaki
        const header = '<h2>Footnotes</h2>\n';
        const originalFootnotes = renderFootnotes(...args);
        console.log('Original footnotes:', originalFootnotes);  // Log isi dari footnotes asli
        return header + originalFootnotes;
    };
};