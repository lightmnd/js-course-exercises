(function() {

    function playSound(e){
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
        
        if(!audio){
            return; // stop the function
        }
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
    }
    
        function removeTransition(e){
            if(e.propertyName !== 'transition') {
                this.classList.remove('playing');
            }
            else {
                return;
            }
        }
        
        const keys = document.querySelectorAll('.key');
        keys.forEach((k) => {
            // console.log(k)
            k.addEventListener('transitionend', removeTransition)
        })

window.addEventListener('keydown', playSound);

})();
