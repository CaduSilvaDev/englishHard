const data = [ 
    'An African police officer', 
    'An Irish businessperson', 
    'A Canadian judge',
    'A Brazilian TV host',
    'An Indian bodyguard',
    'A Korean Idol',
    'An Argentine actor',
    'A Mexican soccer player',
    'A Chinese photographer',
    'A Russia spy',
    'A Bolivian reporter',
    'An Australian writer',
    'Is Messi a good soccer player?',
    'Are they Bolivian writes?'
];

let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let selectedVoice = 3;
let qtStuding = 0;
const qtMustStuding = 5;
var drawnNumbers = [];

const generateNum = () => {
    if(drawnNumbers.length == data.length){
        let nuLastPosition = drawnNumbers[drawnNumbers.length - 1];
        drawnNumbers.length = 0;
        drawnNumbers.push(nuLastPosition);
        qtStuding++

        if(qtStuding == qtMustStuding){
            alert("Boaaa! Agora pode descansar um pouco.");
        }
    }

    let num = Math.floor(Math.random() * (data.length + 1));
    let numRepet = drawnNumbers.some(item => item == num);

    if(!numRepet){
        drawnNumbers.push(num);
    }else{
        while(numRepet){
            num = Math.floor(Math.random() * (data.length + 1));
            numRepet = drawnNumbers.some(item => item == num);
    
            if(!numRepet){
                console.log("Validação final: ", numRepet);
                drawnNumbers.push(num);
            }
        }
    }

    return num;
}


window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();

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
    console.log("Aquiiii", drawnNumbers);
    ut.voice =  voicesList[selectedVoice];
    window.speechSynthesis.speak(ut);
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
})