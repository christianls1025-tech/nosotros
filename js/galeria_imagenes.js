// Generar galería de imágenes dinámicamente
document.addEventListener('DOMContentLoaded', () => {
    const masonry = document.getElementById('masonryGrid');
    if (!masonry) return;

    const totalImages = 73; // Ajusta según tus imágenes

    for (let i = 1; i <= totalImages; i++) {
        const card = document.createElement('div');
        card.className = 'masonry-item';
        card.setAttribute('data-aos', 'zoom-in');
        card.innerHTML = `<img src="img/1 (${i}).jpeg" alt="Recuerdo ${i}" loading="lazy">`;
        masonry.appendChild(card);
    }

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');

    if (lightbox && lightboxImg) {
        masonry.addEventListener('click', (e) => {
            if (e.target.tagName === 'IMG') {
                lightbox.style.display = 'flex';
                lightboxImg.src = e.target.src;
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    if (typeof AOS !== 'undefined') AOS.refresh();
});