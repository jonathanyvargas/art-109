// Select the custom pointer
const customPointer = document.getElementById('customPointer');
// Listen for mousemove event to move the custom pointer
document.addEventListener('mousemove', (event) => {
    customPointer.style.left = `${event.pageX - 10}px`; // 10px offset from mouse
    customPointer.style.top = `${event.pageY - 10}px`; // 10px offset from mouse
});



// Open Wendy pop up
function openWendyPopup() {
    document.getElementById('wendy-popup').style.display = 'flex';
}
function closeWendyPopup() {
    document.getElementById('wendy-popup').style.display = 'none';
}



// Open Bella pop up
function openBellaPopup() {
    document.getElementById('bella-popup').style.display = 'flex';
}
function closeBellaPopup() {
    document.getElementById('bella-popup').style.display = 'none';
}

// Open Breezy pop up
function openBreezyPopup() {
    document.getElementById('breezy-popup').style.display = 'flex';
}
function closeBreezyPopup() {
    document.getElementById('breezy-popup').style.display = 'none';
}



// Open static video gif
function showGIF() {
    let gifOverlay = document.getElementById('gifOverlay');
    // Show the GIF
    gifOverlay.style.visibility = 'visible';
    gifOverlay.style.opacity = '1';
    // Hide the GIF after 3 seconds
    setTimeout(() => {
        gifOverlay.style.opacity = '0';
        setTimeout(() => {
            gifOverlay.style.visibility = 'hidden';
        }, 500); // Wait for fade-out to complete before hiding
    }, 3000);
}



// Open Brontie pop up
function showBrontieImage() {
    let overlay = document.getElementById('brontie-imageOverlay');
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
}
function closeBrontieImage() {
    let overlay = document.getElementById('brontie-imageOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
    }, 300); // Wait for fade-out animation
}


// Open Lindsay pop up
function showLindsayImage() {
    let overlay = document.getElementById('lindsay-imageOverlay');
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
}
function closeLindsayImage() {
    let overlay = document.getElementById('lindsay-imageOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
    }, 300); // Wait for fade-out animation
}

