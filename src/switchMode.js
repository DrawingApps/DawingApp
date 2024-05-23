const switchMode = document.getElementById('switchMode');


switchMode.addEventListener('click', changeMode);

function changeMode(){
    const darkMode = document.getElementById('darkMode');
    const lightMode = document.getElementById('lightMode');
    darkMode.disabled = !darkMode.disabled;
    lightMode.disabled = !lightMode.disabled;
    }