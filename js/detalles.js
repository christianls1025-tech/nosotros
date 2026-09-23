// Página de detalles: pequeñas animaciones al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Refrescar AOS después de que las imágenes se carguen
    window.addEventListener('load', () => {
        if (typeof AOS !== 'undefined') AOS.refresh();
    });

    // Efecto de entrada suave para el iframe de flores
    const iframe = document.querySelector('.detail-body iframe');
    if (iframe) {
        iframe.addEventListener('load', () => {
            iframe.style.opacity = '1';
        });
    }
});