// function to play the sound contains specific data-key
function playSound(e){

    // finding the target audio to play using data-key attribute
    const audio = document.querySelector(`audio[data-key="${e.key}"]`)
    const key = document.querySelector(`.key[data-key="${e.key}"]`)
    
    // if audio is null then return otherwise play
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();

    // adding the playing class in the key
    key.classList.add('playing');
}


//function to remove the playing class after transform ended
function removeTransform(e)
{
    if(e.propertyName !== 'transform') return; // skip if if it's not a transform
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend',removeTransform));

window.addEventListener('keydown', playSound);
