const bgCanvas = document.getElementById('bgCanvas');
const ctx = bgCanvas.getContext('2d');

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;


function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(Math.random() * bgCanvas.width, Math.random() * bgCanvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0.2) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

bgCanvas.addEventListener('mousemove', function(e) {
    for(let i = 0; i < 5; i++) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

let percentage = 0;

function loadPercentage() {
    if (percentage <= 100) {
        document.getElementById('loadingBar').style.width = percentage + '%'; 

        percentage++;
        setTimeout(loadPercentage, 100); 
    }
}

window.onload = function () {
    init();
    animate();
    loadPercentage();
};

const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');
const volumeControl = document.getElementById('volumeControl');

audioPlayer.volume = volumeControl.value;

playPauseButton.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = 'Play';
    }
});

volumeControl.addEventListener('input', function() {
    audioPlayer.volume = this.value;
});