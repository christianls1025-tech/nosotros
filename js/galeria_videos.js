document.addEventListener('DOMContentLoaded', () => {
    const listVideo = document.querySelectorAll('.vid-item');
    const mainVideo = document.getElementById('main_player');
    const mainTitle = document.getElementById('main_title');

    if (!mainVideo || !mainTitle) return;

    listVideo.forEach(video => {
        video.addEventListener('click', () => {
            listVideo.forEach(v => v.classList.remove('active'));
            video.classList.add('active');

            const src = video.dataset.src;
            const title = video.dataset.title;

            mainVideo.src = src;
            mainTitle.textContent = title;

            mainVideo.load();
            mainVideo.play().catch(() => {});
        });
    });
});