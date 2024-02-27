const data = [ 
    'An African police officer', 
    'An Irish businessperson', 
    'A Canadian judge',
    'A Brazilian TV host',
    'An Indian bodyguard',
    'A Korean Idol'
];

let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 3;

const drawnNumbers = [];

const generateNum = () => {
    if(drawnNumbers.length == 3){
        drawnNumbers.length = 0;
    }
    
    let num = Math.floor(Math.random() * (data.length + 1));
    numRepet = drawnNumbers.some(item => item == num);

    while(numRepet){
        let num = Math.floor(Math.random() * (data.length + 1));
        numRepet = drawnNumbers.some(item => item == num);

        if(!numRepet){
            drawnNumbers.push(num);
        }
    }
    return num;
}

console.log("here", generateNum());

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    console.log(voicesList);

    voicesList.forEach((item, i) => {
        if(i == 3 || i == 4 || i == 5){
            let optionEl = document.createElement('option');
            optionEl.setAttribute('value', i);
            optionEl.innerText = voicesList[i].name;
    
            voices.appendChild(optionEl);
        }
    })
})

button.addEventListener('click', () => {
    let voicesList = window.speechSynthesis.getVoices();
    
    let ut = new SpeechSynthesisUtterance(data[generateNum()]);

    ut.voice =  voicesList[selectedVoice];
    window.speechSynthesis.speak(ut);
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
})