// tambahkan margin itimatis untuk ol lebih dari 2 digit.
document.addEventListener("DOMContentLoaded", function () {
    // Ambil semua elemen ol di dalam PostBody
    const olElements = document.querySelectorAll('.PostBody ol');
    // Iterasi melalui setiap elemen ol
    olElements.forEach(ol => {
        // Ambil nilai atribut "start" dari elemen ol, jika ada
        const startValue = ol.hasAttribute('start')
            ? parseInt(ol.getAttribute('start'))
            : 1;
        // Ambil semua elemen li yang merupakan anak langsung dari ol
        const listItems = ol.querySelectorAll(':scope > li');
        // Iterasi untuk setiap li
        listItems.forEach((li, index) => {
            // Menghitung nomor urut dengan memperhitungkan atribut "start"
            const itemNumber = startValue + index;
            const numDigits = itemNumber.toString().length;
            // Panjang digit dari nomor urut Log ke konsol untuk debugging
            console.log('Item:', itemNumber, 'Panjang Digit:', numDigits);
            // Jika nomor urut lebih dari 2 digit, berikan margin sesuai dengan panjang digit
            if (numDigits > 2) { // Menyesuaikan kondisi untuk lebih dari 2 digit
                const marginLeft = numDigits * 0.5 + 'rem'; // Margin dinamis berdasarkan panjang digit
                li.style.marginLeft = marginLeft;
                // Terapkan margin pada elemen li Log ke konsol untuk debugging (uncomment script console untuk debuging)
                // console.log(`Applied margin-left of ${marginLeft} to item ${itemNumber}`);
            }
        });
    });
});