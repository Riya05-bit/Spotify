const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const noResult = document.getElementById("noResult");
const box2 = document.getElementById("box2");

const songLines = document.querySelectorAll(".songLine");
const audioPlayer = document.getElementById("audioPlayer");
const selectedSong = document.getElementById("selectedSong");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const playPauseBtn = document.getElementById("playPauseBtn");
const rangeBar = document.getElementById("rangeBar");

let currentIndex = -1;
let isSeeking = false;

// ---------- SEARCH ----------
searchBtn.addEventListener("click", () => {
    const val = searchInput.value.toLowerCase().trim();
    let count = 0;
    if (!val) return resetList();

    songLines.forEach(song => {
        const name = song.innerText.toLowerCase();
        if (name.includes(val)) {
            song.style.display = "flex";
            count++;
        } else song.style.display = "none";
    });

    if (count === 0) {
        noResult.style.display = "block";
        selectedSong.textContent = "";
        audioPlayer.pause();
        audioPlayer.src = "";
        box2.style.animationPlayState = "paused";
    } else noResult.style.display = "none";
});

searchInput.addEventListener("input", () => {
    clearBtn.style.display = searchInput.value ? "block" : "none";
});

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    resetList();
    searchInput.focus();
});

function resetList() {
    songLines.forEach(song => song.style.display = "flex");
    noResult.style.display = "none";
}

// ---------- PLAY SONG ----------
function playSong(index) {
    const song = songLines[index];
    const name = song.querySelector("span").innerText;
    const src = song.getAttribute("data-audio");

    selectedSong.textContent = name;
    audioPlayer.src = src;
    audioPlayer.play();
    box2.style.animationPlayState = "running";
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

// ---------- SONG CLICK ----------
songLines.forEach((song, index) => {
    song.addEventListener("click", () => {
        currentIndex = index;
        playSong(currentIndex);
    });
});

// ---------- NEXT / PREV ----------
nextBtn.addEventListener("click", () => {
    if (currentIndex < songLines.length - 1) {
        currentIndex++;
        playSong(currentIndex);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        playSong(currentIndex);
    }
});

// ---------- PLAY / PAUSE BUTTON ----------
playPauseBtn.addEventListener("click", () => {
    if (!audioPlayer.src) {
        if (currentIndex === -1 && songLines.length > 0) {
            currentIndex = 0;
            playSong(currentIndex);
        }
        return;
    }

    if (audioPlayer.paused) {
        audioPlayer.play();
        box2.style.animationPlayState = "running";
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } else {
        audioPlayer.pause();
        box2.style.animationPlayState = "paused";
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});

// ---------- AUTO NEXT ----------
audioPlayer.addEventListener("ended", () => {
    if (currentIndex < songLines.length - 1) {
        currentIndex++;
        playSong(currentIndex);
    } else {
        box2.style.animationPlayState = "paused";
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    }
});


// ---------- ROTATION ----------
audioPlayer.addEventListener("play", () => box2.style.animationPlayState = "running");
audioPlayer.addEventListener("pause", () => box2.style.animationPlayState = "paused");
 

// ---------- RANGE / SEEKBAR ----------
audioPlayer.addEventListener("timeupdate", () => {
    if (!isSeeking && audioPlayer.duration) {
        rangeBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    }
});

// Pause rotation while dragging
rangeBar.addEventListener("input", () => {
    isSeeking = true;
    box2.style.animationPlayState = "paused";
});

// Resume music + rotation after releasing
rangeBar.addEventListener("change", () => {
    if (audioPlayer.duration) {
        audioPlayer.currentTime = (rangeBar.value / 100) * audioPlayer.duration;
    }
    isSeeking = false;
    if (!audioPlayer.paused) {
        box2.style.animationPlayState = "running";
    }
});
