// script.js

// Elements
const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const album_artDisplay = document.getElementById('album_art');

// Song list
const songs = [
    {
        src: 'Jo Tu Na Mila_320(PagalWorld.com.so).mp3',
        title: 'Jo Tu Na Mila',
        artist: 'Asim Azhar',
        albumArt: 'maxresdefault.jpg'
    },
    {
        src: 'Downers At Dusk_320(PagalWorld.com.so).mp3',
        title: 'Downers At Dusk',
        artist: 'Talha Anjum',
        albumArt: 'downers at dusk.jpg'
    },
    {
        src: '128-Teri Yaad - Aditya Rikhari 128 Kbps.mp3',
        title: 'Teri Yaad',
        artist: 'aditya rikhari',
        albumArt: 'teri yaad.jpg'
    },
    {
        src: '128-Le Jaa Tu Mujhe - F.A.L.T.U 128 Kbps.mp3',
        title: 'Le Jaa Tu Mujhe',
        artist: 'Atif Aslam',
        albumArt: 'leja.jpg'
    },
    {
        src: 'Tu Hai Kahan_320(PagalWorld.com.so).mp3',
        title: 'Tu Hai Kahan',
        artist: 'Talha Anjum',
        albumArt: 'tu hai kahan.jpg'
    }
];


let currentIndex = 0;
let isPlaying = false;

// Load song from local storage if exists
function loadSong(index) {
    const song = songs[index];
    if (song) {
        console.log(song);
        album_artDisplay.innerHTML = `<div id="artImg" style="background-image: url('${song.albumArt}');"></div>`
        localStorage.setItem('currentSongIndex', index);
        audio.src = song.src;
        document.getElementById('song-title').innerText = song.title;
        document.getElementById('artist-name').innerText = song.artist;

        // Set the background image directly
    }
}

// Initialize player
function initPlayer() {
    const storedIndex = localStorage.getItem('currentSongIndex');
    currentIndex = storedIndex !== null ? parseInt(storedIndex, 10) : 0;
    loadSong(currentIndex);

    audio.addEventListener('timeupdate', () => {
        const { currentTime, duration } = audio;
        if (duration) {
            progressBar.value = (currentTime / duration) * 100;
        }
        currentTimeDisplay.innerText = formatTime(currentTime);
        durationDisplay.innerText = formatTime(duration);
    });

    audio.addEventListener('ended', () => {
        nextSong();
    });

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.querySelector('i.fas').classList.replace('fa-pause', 'fa-play');
        } else {
            audio.play();
            playPauseBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
        }
        isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', () => {
        prevSong();
    });

    nextBtn.addEventListener('click', () => {
        nextSong();
    });

    progressBar.addEventListener('input', () => {
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    playPauseBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
    isPlaying = true;
    playPauseBtn.querySelector('i.fas').classList.replace('fa-play', 'fa-pause');
}

// Initialize the player
initPlayer();
