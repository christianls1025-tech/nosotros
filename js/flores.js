// ==========================================================================
// SINCRONIZACIÓN DE LETRAS CON LA MÚSICA
// ==========================================================================
const audio = document.getElementById('musicFlores');
const lyrics = document.getElementById('lyrics');

// Array de líneas con su tiempo de aparición en segundos
const lyricsData = [
    { text: "At the time", time: 15 },
    { text: "The whisper of birds", time: 18 },
    { text: "Lonely before the sun cried", time: 27 },
    { text: "Fell from the sky", time: 32 },
    { text: "Like water drops", time: 33 },
    { text: "Where I'm now? I don't know why", time: 41 },
    { text: "Nice butterflies in my hands", time: 47 },
    { text: "Too much light for twilight", time: 54 },
    { text: "In the mood for the flowers love", time: 59 },
    { text: "That vision", time: 67 },
    { text: "Really strong, blew my mind", time: 72 },
    { text: "Silence Let me see what it was", time: 78 },
    { text: "I only want to live in clouds", time: 83 },
    { text: "Where I'm now? I don't know why", time: 91 },
    { text: "Nice butterflies in my hands", time: 97 },
    { text: "Too much light for twilight", time: 104 },
    { text: "In the mood for the flowers love", time: 108 },
    { text: "At the time", time: 144 },
    { text: "The whisper of birds", time: 148 },
    { text: "Lonely before the sun cried", time: 153 },
    { text: "Fell from the sky", time: 158 },
    { text: "Like water drops", time: 164 },
    { text: "Where I'm now? I don't know why", time: 169 },
    { text: "Nice butterflies in my hands", time: 176 },
    { text: "Too much light for twilight", time: 183 },
    { text: "In the mood for the flowers", time: 188 },
    { text: "Love.", time: 140 }
];

function updateLyrics() {
    if (!audio || !lyrics) return;

    const time = Math.floor(audio.currentTime);
    const currentLine = lyricsData.find(
        (line) => time >= line.time && time < line.time + 6
    );

    if (currentLine) {
        const fadeInDuration = 0.1;
        const opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
        lyrics.style.opacity = opacity;
        lyrics.innerHTML = currentLine.text;
    } else {
        lyrics.style.opacity = 0;
        lyrics.innerHTML = "";
    }
}

if (audio && lyrics) {
    setInterval(updateLyrics, 1000);
}

// ==========================================================================
// OCULTAR EL TÍTULO DESPUÉS DE UN TIEMPO
// ==========================================================================
function ocultarTitulo() {
    const titulo = document.querySelector('.titulo');
    if (!titulo) return;

    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(() => {
        titulo.style.display = "none";
    }, 3000);
}

// Ocultar el título a los 216 segundos
setTimeout(ocultarTitulo, 216000);

// ==========================================================================
// BOTÓN DE CONTROL DE MÚSICA
// ==========================================================================
const musicFloresBtn = document.getElementById('musicFloresBtn');
let playingFlores = true;

if (musicFloresBtn && audio) {
    musicFloresBtn.addEventListener('click', () => {
        if (playingFlores) {
            audio.pause();
            musicFloresBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            playingFlores = false;
        } else {
            audio.play().catch(() => {});
            musicFloresBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            playingFlores = true;
        }
    });

    // Intentar reproducir al cargar (algunos navegadores lo bloquean)
    audio.play().catch(() => {
        musicFloresBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        playingFlores = false;
    });
}

// ==========================================================================
// ACTIVAR ANIMACIONES DESPUÉS DE CARGAR
// ==========================================================================
window.addEventListener('load', () => {
    document.body.classList.remove("container");
});