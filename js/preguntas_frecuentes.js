// Acordeón personalizado
document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        if (header) {
            header.addEventListener('click', () => {
                // Opcional: cerrar los demás al abrir uno (comportamiento tipo acordeón clásico)
                const isActive = item.classList.contains('active');

                accordionItems.forEach(i => i.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Refrescar AOS
    if (typeof AOS !== 'undefined') AOS.refresh();
});