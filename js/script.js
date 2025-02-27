//Função que chamará a API
async function fetchData() {
    const options = {
      method: 'GET',
      url: 'http://localhost:9030/texttostudy',
      headers: { 
        UUID: 'KWI046SK8HSKL93BQASO03HSDT20'
        }
    };
  
    try {
      const response = await axios.request(options);
      return response;
    } catch (error) {
      return error;
    }
}

let voices = document.querySelector('#voices');
let buttonNextOne = document.querySelector('#buttonNextOne');
let buttonToRepeat = document.querySelector('#buttonToRepeat');
let buttonShowText = document.querySelector('#buttonShowText');
let textH3 = document.querySelector('#textH3');

let textAPI = null;
let selectedVoice = 3;


//Retorna apenas as 3 vozes para o campo de voz
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

//Botão que retornará o próximo texto
buttonNextOne.addEventListener('click', async () => {
    let voicesList = window.speechSynthesis.getVoices();

    //Pega o retorno da API
    const response = await fetchData();

    //Retorna apenas o texto da API
    if(response.status === 404) {
        textH3.innerText = "You have finished your studies, now you can rest!";
        textAPI = "You have finished your studies, now you can rest!";

        let ut = new SpeechSynthesisUtterance(textAPI);
        ut.voice =  voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
    else {
        textAPI = response.data.data.deText;

        let ut = new SpeechSynthesisUtterance(textAPI);
        ut.voice =  voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
});

//Botão que repetirá o texto
buttonToRepeat.addEventListener('click', async () => {
    let voicesList = window.speechSynthesis.getVoices();

    let ut = new SpeechSynthesisUtterance(textAPI);
    ut.voice =  voicesList[selectedVoice];
    window.speechSynthesis.speak(ut);
});

buttonShowText.addEventListener('click', async () => {
    if(buttonShowText.innerText === "Show text") {
        buttonShowText.innerText = "Hidden text";
        textH3.innerText = textAPI;
    }
    else {
        buttonShowText.innerText = "Show text";
        textH3.innerText = "";
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
})