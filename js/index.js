// AOS
AOS.init({
    duration:1000,
    once:true
});

/* MUSIC */

const music =
document.getElementById('music');

const musicBtn =
document.getElementById('musicBtn');

let playing = false;

if (music && musicBtn) {
    musicBtn.addEventListener('click',()=>{

        if(!playing){

            music.play();

            musicBtn.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

            musicBtn.classList.add('playing');

            playing = true;

        }else{

            music.pause();

            musicBtn.innerHTML =
            '<i class="fa-solid fa-play"></i>';

            musicBtn.classList.remove('playing');

            playing = false;

        }

    });
}

/* RANDOM PHRASES */

const phrases = [

    "❤️ Contigo todo es más bonito.",

    "✨ Eres mi lugar favorito.",

    "🌸 Gracias por existir.",

    "💌 Mi recuerdo favorito eres tú.",

    "🌙 Siempre tú.",

    "💕 Cada momento contigo vale oro."

];

const randomPhrase =
document.getElementById('randomPhrase');

function changePhrase(){

    if (!randomPhrase) return;

    const random =
    Math.floor(Math.random() * phrases.length);

    randomPhrase.innerText =
    phrases[random];

}

if (randomPhrase) {
    changePhrase();
    setInterval(changePhrase,5000);
}

/* COUNTER */
const togetherDate = new Date('2024-11-07T17:00:00');
const counter = document.getElementById('timeTogether');

function updateCounter() {
    if (!counter) return;

    const now = new Date();

    let years = now.getFullYear() - togetherDate.getFullYear();
    let months = now.getMonth() - togetherDate.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }

    let lastAniversaryDate = new Date(togetherDate);
    lastAniversaryDate.setFullYear(togetherDate.getFullYear() + years);
    lastAniversaryDate.setMonth(togetherDate.getMonth() + months);

    if (now < lastAniversaryDate) {
        months--;
        if (months < 0) {
            months = 11;
            years--;
        }
        lastAniversaryDate = new Date(togetherDate);
        lastAniversaryDate.setFullYear(togetherDate.getFullYear() + years);
        lastAniversaryDate.setMonth(togetherDate.getMonth() + months);
    }

    const difference = now - lastAniversaryDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    let output = "❤️ ";
    
    output += `${years} ${years === 1 ? 'año' : 'años'}, `;
    
    output += `${months} ${months === 1 ? 'mes' : 'meses'}, `;
    
    output += `${days} ${days === 1 ? 'día' : 'días'}<br>`;
    output += `${hours} horas, ${minutes} minutos y ${seconds} segundos ❤️`;

    counter.innerHTML = output;
}

if (counter) {
    updateCounter();
    setInterval(updateCounter, 1000);
}

/* LIGHTBOX */

const images = document.querySelectorAll('.card img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

if (images.length && lightbox && lightboxImg) {
    images.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = img.src;
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImg) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        }
    });
}

/* PARTICLES */

if (document.getElementById('particles') && typeof tsParticles !== 'undefined') {
    tsParticles.load("particles", {
        particles: {
            number: { value: 50 },
            color: {
                value: ["#ff4d6d","#ffffff","#ffb3c1"]
            },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3 },
            move: {
                enable: true,
                speed: 1
            }
        }
    });
}

/* FLOATING HEARTS */

function createHeart(){

    const heart =
    document.createElement('div');

    heart.classList.add('heart');

    heart.innerHTML = '❤️';

    heart.style.left =
    Math.random() * 100 + 'vw';

    heart.style.fontSize =
    Math.random() * 20 + 10 + 'px';

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },5000);

}

setInterval(createHeart,800);

/* ==========================================================================
   MENU RESPONSIVO + DROPDOWN CORREGIDO
   ========================================================================== */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
}

/* 
  CERRAR EL MENÚ AL DAR CLIC EN UN ENLACE REAL (NO EN EL DROPDOWN TOGGLE)
  Excluimos:
    - Enlaces con clase .dropdown-toggle (los que abren el submenú)
    - Enlaces que tengan href="#"
*/
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const isDropdownToggle = item.classList.contains('dropdown-toggle');
        const isHashOnly = item.getAttribute('href') === '#';

        // Si es el toggle del dropdown o un enlace "#", NO cerramos el menú
        if (isDropdownToggle || isHashOnly) {
            e.preventDefault();
            return;
        }

        // En cualquier otro enlace, cerramos el menú
        if (navLinks) navLinks.classList.remove('active');
    });
});

/* DROPDOWN EN MÓVIL: abrir/cerrar sin cerrar el nav */
document.querySelectorAll('.nav-links li.dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            e.stopPropagation();
            const parent = link.parentElement;
            parent.classList.toggle('open');
        }
    });
});

/* ==========================================================================
   LÓGICA DEL REPRODUCTOR DE LA BANDA SONORA
   ========================================================================== */
const globalPlaylistAudio = document.getElementById('globalPlaylistAudio');
const songCards = document.querySelectorAll('.song-card');

songCards.forEach(card => {
    const playBtn = card.querySelector('.play-song-btn');
    const songSrc = card.getAttribute('data-song');

    if (playBtn && songSrc) {
        playBtn.addEventListener('click', () => {
            if (card.classList.contains('playing-now')) {
                globalPlaylistAudio.pause();
                card.classList.remove('playing-now');
                playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            } else {
                songCards.forEach(c => {
                    c.classList.remove('playing-now');
                    const btn = c.querySelector('.play-song-btn');
                    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
                });

                if (playing && music && musicBtn) {
                    music.pause();
                    playing = false;
                    musicBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                    musicBtn.classList.remove('playing');
                }

                globalPlaylistAudio.src = songSrc;
                globalPlaylistAudio.play()
                    .then(() => {
                        card.classList.add('playing-now');
                        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    })
                    .catch(err => {
                        console.log("Asegúrate de colocar un archivo válido en: " + songSrc);
                    });
            }
        });
    }
});

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (!playing) { 
            if (globalPlaylistAudio) globalPlaylistAudio.pause();
            songCards.forEach(c => {
                c.classList.remove('playing-now');
                const btn = c.querySelector('.play-song-btn');
                if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            });
        }
    });
}

/* ==========================================================================
   CÁPSULA DEL TIEMPO
   ========================================================================== */
const capsuleInput = document.getElementById('capsuleInput');
const saveCapsuleBtn = document.getElementById('saveCapsuleBtn');
const capsuleMessagesContainer = document.getElementById('capsuleMessages');

let savedNotes = JSON.parse(localStorage.getItem('coupleNotes')) || [];

function displayNotes() {
    if (!capsuleMessagesContainer) return;
    capsuleMessagesContainer.innerHTML = '';
    savedNotes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.innerHTML = `
            <p>"${note.text}"</p>
            <div class="note-date">💌 ${note.date}</div>
            <button class="delete-note-btn" onclick="deleteNote(${index})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        `;
        capsuleMessagesContainer.appendChild(noteCard);
    });
}

if (saveCapsuleBtn && capsuleInput) {
    saveCapsuleBtn.addEventListener('click', () => {
        const text = capsuleInput.value.trim();
        if (text === '') return;

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const today = new Date().toLocaleDateString('es-ES', options);

        const newNote = { text: text, date: today };
        savedNotes.push(newNote);
        
        localStorage.setItem('coupleNotes', JSON.stringify(savedNotes));
        displayNotes();
        
        capsuleInput.value = '';
    });
}

window.deleteNote = function(index) {
    savedNotes.splice(index, 1);
    localStorage.setItem('coupleNotes', JSON.stringify(savedNotes));
    displayNotes();
};

displayNotes();