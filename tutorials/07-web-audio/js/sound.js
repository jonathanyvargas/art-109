document.addEventListener("DOMContentLoaded", function () {
    const song = document.querySelector("#wendy");
    song.volume = .5;
    
    const playBtn = document.querySelector("#play-button");
    const pauseBtn = document.querySelector("#pause-button");

    function showButtons() {
        playBtn.style.visibility = "visible";
        pauseBtn.style.visibility = "visible";
        pauseBtn.style.display = "none"; // Start with pause hidden
    }

    if (song.readyState >= 3) {
        showButtons();
    } else {
        song.addEventListener("loadeddata", showButtons);
    }

    playBtn.addEventListener("click", function () {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
    });

    pauseBtn.addEventListener("click", function () {
        song.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
    });
});

