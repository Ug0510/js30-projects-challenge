// Get our Element
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// Build our function
function togglePlay() {
    // if(video.paused){
    //     video.play();
    // }
    // else{
    //     video.pause();
    // }

    const method = video.paused ? 'play' : 'pause';

    video[method]();
}

function updateButton(){ 

    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}


function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    progressBar.style.flexBasis = video.currentTime / video.duration * 100 + '%';
}
function scrub(e){
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
}

// Hook up the event listeners

progressBar.style.flexBasis = '0%';
let mousedown = false;

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton)
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip))
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
video.addEventListener('timeupdate',handleProgress);
progress.addEventListener('click', scrub);
document.addEventListener('mousedown',() => mousedown = true);
document.addEventListener('mouseup',() => mousedown = false);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));


