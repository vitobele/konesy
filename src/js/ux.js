// js untuk ux

// --------- set offset untuk link rujukan catatan kaki, config dengan navbar
document.addEventListener("DOMContentLoaded", function() {
    // Ambil ketinggian navbar
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
  
    // Fungsi untuk menambahkan offset saat melakukan scroll ke anchor link
    function offsetAnchor() {
      if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - navbarHeight);
      }
    }
  
    // Panggil offsetAnchor pada load
    window.setTimeout(offsetAnchor, 1);
  
    // Panggil offsetAnchor saat hash di URL berubah
    window.addEventListener("hashchange", offsetAnchor);
  });