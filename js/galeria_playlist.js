function playSong(file, title, artist) {
    const player = document.getElementById('main-player');
    const source = document.getElementById('audio-source');
    const titleEl = document.getElementById('current-title');
    const artistEl = document.getElementById('current-artist');

    if (!player || !source) return;

    source.src = file;
    if (titleEl) titleEl.innerText = title;
    if (artistEl) artistEl.innerText = artist;

    player.load();
    player.play().catch(() => {});

    // Pequeña animación
    const card = document.querySelector('.now-playing');
    if (card) {
        card.style.transform = "scale(1.02)";
        setTimeout(() => card.style.transform = "scale(1)", 300);
    }
}