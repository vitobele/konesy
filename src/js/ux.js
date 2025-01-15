// js untuk ux

// v.0.1.0 -- set offset untuk link rujukan catatan kaki, config dengan navbar
document.addEventListener("DOMContentLoaded", function() {
    // Ambil ketinggian navbar
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    // console.log("Navbar height:", navbarHeight);

    // Fungsi untuk menambahkan offset saat melakukan scroll ke anchor link
    function offsetAnchor() {
        if (location.hash.length !== 0) {
            const targetElement = document.querySelector(location.hash);
            // console.log("Hash changed to:", location.hash);
            // console.log("Target element:", targetElement);
            if (targetElement) {
                setTimeout(() => {
                    const scrollToPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    // console.log("Scrolling to:", scrollToPosition);
                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: "smooth"
                    });
                }, 0);
            } else {
                // console.log("Target element not found for hash:", location.hash);
            }
        }
    }

    // Panggil offsetAnchor pada load
    window.setTimeout(offsetAnchor, 1);

    // Panggil offsetAnchor saat hash di URL berubah
    window.addEventListener("hashchange", function() {
        window.setTimeout(offsetAnchor, 1);
    });

    // Menambahkan event listener pada anchor link untuk smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            // console.log("Anchor clicked:", targetId, targetElement);
            if (targetElement) {
                window.history.pushState(null, null, targetId);
                window.setTimeout(() => {
                    const scrollToPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    // console.log("Scrolling to:", scrollToPosition);
                    window.scrollTo({
                        top: scrollToPosition,
                        behavior: "smooth"
                    });
                }, 0);
            } else {
                // console.log("Target element not found for anchor:", targetId);
            }
        });
    });
});