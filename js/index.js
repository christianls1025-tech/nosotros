// AOS
// En móvil, las animaciones fade-left / fade-right desplazan el elemento
// 100px hacia un lado, y eso hace que la página se vea corrida a la izquierda
// (o con scroll horizontal) hasta que termina la animación.
// Las cambiamos por fade-up, que es vertical y no mueve nada de lado.
if (window.innerWidth <= 900) {
    document
        .querySelectorAll('[data-aos="fade-right"], [data-aos="fade-left"]')
        .forEach(el => el.setAttribute('data-aos', 'fade-up'));
}

AOS.init({
    duration:1000,
    once:true
});

/* MUSIC (música de fondo) */

const music = document.getElementById('music');
const musicBtn = document.getElementById('musicBtn');

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
    Math.random() * 92 + 'vw';

    heart.style.fontSize =
    Math.random() * 20 + 10 + 'px';

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },5000);

}

setInterval(createHeart,800);

/* ==========================================================================
   MENU RESPONSIVO + DROPDOWN
   ========================================================================== */

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
}

const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const isDropdownToggle = item.classList.contains('dropdown-toggle');
        const isHashOnly = item.getAttribute('href') === '#';

        if (isDropdownToggle || isHashOnly) {
            e.preventDefault();
            return;
        }

        if (navLinks) navLinks.classList.remove('active');
    });
});

/* DROPDOWN EN MÓVIL */
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
   CÁPSULA DEL TIEMPO (compartida con Firebase Firestore)
   ========================================================================== */

// 👉 Pega aquí la configuración de TU proyecto de Firebase
//    (Configuración del proyecto → Tus apps → Web → "firebaseConfig").
const firebaseConfig = {
    apiKey: "AIzaSyBOgzJNEvdnq8sJDDHyWL33QSZjtZ_RZAM",
    authDomain: "nosotros-21669.firebaseapp.com",
    projectId: "nosotros-21669",
    storageBucket: "nosotros-21669.firebasestorage.app",
    messagingSenderId: "337443770890",
    appId: "1:337443770890:web:9e9fd67630c36ac89585f3"
};

// 👉 Las 2 cuentas de Google que pueden escribir, editar y borrar (en minúsculas).
//    Deben ser EXACTAMENTE las mismas que pongas en las reglas de Firestore.
//    Esto solo sirve para mostrar u ocultar botones; la seguridad real la ponen las reglas.
const ADMIN_EMAILS = [
    "christian.ls1025@gmail.com",
    "yincoral21@gmail.com"
];

const capsuleInput = document.getElementById('capsuleInput');
const saveCapsuleBtn = document.getElementById('saveCapsuleBtn');
const capsuleMessagesContainer = document.getElementById('capsuleMessages');

const MAX_NOTE_LENGTH = 500;
if (capsuleInput) capsuleInput.maxLength = MAX_NOTE_LENGTH;

let notesCol = null;
let auth = null;
let currentUser = null;
let lastNotes = [];        // [{ id, text, date }]
let notesLoaded = false;
let editingId = null;      // id de la nota que se está editando (si hay una)

function isAdmin() {
    return !!(currentUser && currentUser.email &&
        ADMIN_EMAILS.includes(currentUser.email.toLowerCase()));
}

function showCapsuleMessage(text) {
    if (!capsuleMessagesContainer) return;
    capsuleMessagesContainer.innerHTML = '';
    const p = document.createElement('p');
    p.style.color = '#b0b0c0';
    p.textContent = text;
    capsuleMessagesContainer.appendChild(p);
}

/* ---------- Barra de sesión (login con Google) ---------- */

const capsuleContainer = document.querySelector('.capsule-container');
const capsuleInputBox = document.querySelector('.capsule-input-box');

const authBar = document.createElement('div');
authBar.className = 'capsule-auth';
if (capsuleContainer) capsuleContainer.insertBefore(authBar, capsuleContainer.firstChild);

// Línea donde se muestran los errores de inicio de sesión
const authMsg = document.createElement('div');
authMsg.className = 'capsule-auth-msg';
authMsg.style.display = 'none';
if (capsuleContainer) capsuleContainer.insertBefore(authMsg, authBar.nextSibling);

function showAuthMsg(text) {
    authMsg.textContent = text;
    authMsg.style.display = text ? 'block' : 'none';
}

function makeAuthButton(label, onClick, secondary) {
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = label;
    if (secondary) b.classList.add('secondary');
    b.addEventListener('click', onClick);
    return b;
}

function signInWithGoogle() {
    showAuthMsg('');

    if (location.protocol === 'file:') {
        showAuthMsg('⚠️ Estás abriendo la página como archivo (file://). El inicio de sesión no funciona así: ábrela desde tu hosting o con un servidor local (por ejemplo Live Server en VS Code).');
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    auth.signInWithPopup(provider).catch(err => {
        console.error('Firebase Auth:', err.code, err.message);
        const host = location.hostname;

        if (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment') {
            auth.signInWithRedirect(provider);
        } else if (err.code === 'auth/unauthorized-domain') {
            showAuthMsg('⚠️ El dominio "' + host + '" no está autorizado. Agrégalo en Firebase → Authentication → Configuración → Dominios autorizados.');
        } else if (err.code === 'auth/operation-not-allowed') {
            showAuthMsg('⚠️ Google no está habilitado. Actívalo en Firebase → Authentication → Método de acceso y pulsa Guardar.');
        } else if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
            showAuthMsg('La ventana de Google se cerró antes de terminar. Si no la cerraste tú, revisa que "' + host + '" esté en Dominios autorizados y que tu navegador no bloquee ventanas emergentes.');
        } else if (err.code === 'auth/network-request-failed') {
            showAuthMsg('⚠️ Error de red al conectar con Google. Revisa tu conexión.');
        } else {
            showAuthMsg('⚠️ No se pudo iniciar sesión (' + err.code + '). Abre la consola (F12) para más detalles.');
        }
    });
}

function updateCapsuleUI() {
    authBar.innerHTML = '';
    const msg = document.createElement('span');

    if (!currentUser) {
        msg.textContent = '🔒 Solo Christian y Yin pueden escribir en la cápsula.';
        authBar.appendChild(msg);
        authBar.appendChild(makeAuthButton('<i class="fa-brands fa-google"></i> Iniciar sesión con Google', signInWithGoogle));
    } else if (!isAdmin()) {
        msg.textContent = 'La cuenta ' + currentUser.email + ' no tiene permiso para escribir.';
        authBar.appendChild(msg);
        authBar.appendChild(makeAuthButton('Cambiar de cuenta', () => auth.signOut(), true));
    } else {
        msg.textContent = '✍️ Sesión iniciada como ' + currentUser.email;
        authBar.appendChild(msg);
        authBar.appendChild(makeAuthButton('Cerrar sesión', () => auth.signOut(), true));
    }

    // El formulario solo se ve para las cuentas autorizadas
    if (capsuleInputBox) capsuleInputBox.style.display = isAdmin() ? '' : 'none';
}

/* ---------- Notas: borrar / editar / dibujar ---------- */

function deleteNote(id) {
    if (!notesCol) return;
    if (!confirm('¿Eliminar esta nota?')) return;

    notesCol.doc(id).delete().catch(err => {
        console.error('Firestore (borrar):', err.code, err.message);
        alert(err.code === 'permission-denied'
            ? 'No tienes permiso para eliminar esta nota.'
            : 'No se pudo eliminar la nota: ' + (err.code || err));
    });
}

function finishEditing() {
    editingId = null;
    renderNotes(lastNotes);
}

function startEdit(card, note) {
    editingId = note.id;

    const oldP = card.querySelector('p');
    const textarea = document.createElement('textarea');
    textarea.className = 'edit-note-input';
    textarea.maxLength = MAX_NOTE_LENGTH;
    textarea.value = note.text;
    card.replaceChild(textarea, oldP);

    card.querySelectorAll('.edit-note-btn, .delete-note-btn').forEach(b => b.remove());
    card.classList.remove('has-actions');

    const actions = document.createElement('div');
    actions.className = 'edit-note-actions';

    const saveBtn = makeAuthButton('Guardar', () => {
        const newText = textarea.value.trim();
        if (newText === '') return;
        saveBtn.disabled = true;

        notesCol.doc(note.id).update({ text: newText.slice(0, MAX_NOTE_LENGTH) })
            .then(finishEditing)
            .catch(err => {
                console.error('Firestore (editar):', err.code, err.message);
                alert(err.code === 'permission-denied'
                    ? 'No tienes permiso para editar esta nota.'
                    : 'No se pudo editar la nota: ' + (err.code || err));
                saveBtn.disabled = false;
            });
    });
    const cancelBtn = makeAuthButton('Cancelar', finishEditing, true);

    actions.appendChild(saveBtn);
    actions.appendChild(cancelBtn);
    card.appendChild(actions);
    textarea.focus();
}

function renderNotes(notes) {
    if (!capsuleMessagesContainer) return;
    capsuleMessagesContainer.innerHTML = '';

    if (!notes.length) {
        showCapsuleMessage('Aún no hay notas. ¡Escribe la primera! 💌');
        return;
    }

    notes.forEach(note => {
        const card = document.createElement('div');
        card.classList.add('note-card');

        // textContent (no innerHTML) para que nadie pueda inyectar HTML/JS
        const p = document.createElement('p');
        p.textContent = `"${note.text}"`;

        const date = document.createElement('div');
        date.classList.add('note-date');
        date.textContent = `💌 ${note.date}`;

        card.appendChild(p);
        card.appendChild(date);

        // Botones de editar / borrar solo para las cuentas autorizadas
        if (isAdmin()) {
            card.classList.add('has-actions');

            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-note-btn');
            editBtn.setAttribute('aria-label', 'Editar nota');
            editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
            editBtn.addEventListener('click', () => startEdit(card, note));

            const delBtn = document.createElement('button');
            delBtn.classList.add('delete-note-btn');
            delBtn.setAttribute('aria-label', 'Eliminar nota');
            delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            delBtn.addEventListener('click', () => deleteNote(note.id));

            card.appendChild(editBtn);
            card.appendChild(delBtn);
        }

        capsuleMessagesContainer.appendChild(card);
    });
}

/* ---------- Conexión con Firebase ---------- */

if (typeof firebase === 'undefined') {
    showCapsuleMessage('⚠️ No se cargó Firebase. Revisa que los <script> de Firebase estén en el HTML antes de index.js.');
    updateCapsuleUI();
} else {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    auth = firebase.auth();
    notesCol = db.collection('notas');

    showCapsuleMessage('Cargando notas... 💌');
    updateCapsuleUI();

    auth.onAuthStateChanged(user => {
        currentUser = user;
        if (user) showAuthMsg('');
        updateCapsuleUI();
        if (notesLoaded && editingId === null) renderNotes(lastNotes);
    });

    let loadedFromServer = false;

    // Si en 8 segundos no llega nada del servidor, algo anda mal (red o reglas)
    setTimeout(() => {
        if (!loadedFromServer) {
            console.error('Firestore: no se recibieron datos del servidor.');
            showCapsuleMessage('⚠️ No hay conexión con la base de datos. Abre la consola (F12) para ver el motivo.');
        }
    }, 8000);

    // Se ejecuta al cargar y cada vez que se agrega, edita o borra una nota
    notesCol.orderBy('timestamp', 'desc').limit(100).onSnapshot(snapshot => {
        if (!snapshot.metadata.fromCache) loadedFromServer = true;
        notesLoaded = true;
        lastNotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (editingId === null) renderNotes(lastNotes); // no interrumpir una edición en curso
    }, error => {
        console.error('Firestore (lectura):', error.code, error.message);
        showCapsuleMessage('⚠️ No se pueden leer las notas (' + error.code + '). Revisa las reglas de Firestore.');
    });
}

/* ---------- Guardar nota nueva ---------- */

if (saveCapsuleBtn && capsuleInput) {
    saveCapsuleBtn.addEventListener('click', () => {
        const text = capsuleInput.value.trim();
        if (text === '') return;

        if (!notesCol) {
            alert('La cápsula no está conectada a Firebase. Abre la consola (F12) para ver el motivo.');
            return;
        }

        if (!isAdmin()) {
            alert('Inicia sesión con una de las cuentas autorizadas para escribir.');
            return;
        }

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const today = new Date().toLocaleDateString('es-ES', options);

        saveCapsuleBtn.disabled = true;

        const save = notesCol.add({
            text: text.slice(0, MAX_NOTE_LENGTH),
            date: today,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Si no hay conexión, la promesa se queda esperando sin error.
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject({ code: 'timeout' }), 10000)
        );

        Promise.race([save, timeout])
        .then(() => {
            capsuleInput.value = '';
        })
        .catch(err => {
            console.error('Firestore (escritura):', err.code, err.message || '');
            if (err.code === 'permission-denied') {
                alert('Firebase rechazó la nota (permission-denied). Revisa que las reglas estén publicadas y que tu correo esté en ellas.');
            } else if (err.code === 'timeout') {
                alert('No hay respuesta de la base de datos. Revisa tu conexión y las reglas de Firestore.');
            } else {
                alert('No se pudo guardar la nota: ' + (err.code || err));
            }
        })
        .finally(() => {
            saveCapsuleBtn.disabled = false;
        });
    });
}