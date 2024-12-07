const CONFIG = {
    voiceLanguage: 'en-US',
    weatherApiKey: '052705f1cdd45406b4b930d95da02ada',
    newsApiKey: '2996213bb59e41308db1d0cb5ae6477e',     
};

const speechSynthesis = window.speechSynthesis;
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = CONFIG.voiceLanguage;

let uptime = 0;
let commandsProcessed = 0;

const contacts = {
    mummy: '+919518444234',
    papa: '+918168192234',
    shreya: '+919310147652',
    srishti: '+917048998009',
    pragya: '+917007316642',
    anuj: '+919350406511'
};

async function addContact(command) {
    const [_, name, number] = command.match(/add contact (\w+) (\+\d+)/) || [];
    if (name && number) {
        contacts[name.toLowerCase()] = number;
        speak(`${name} has been added to your contact list.`);
    } else {
        speak('Please provide a valid name and phone number to add a contact.');
    }
}

document.getElementById('talk-btn').addEventListener('click', () => {
    recognition.start();
    speak('Listening...');
});

recognition.onresult = async (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById('current-command-text').innerText = command;
    await processCommand(command);
};

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = CONFIG.voiceLanguage;
    speechSynthesis.speak(utterance);
}

async function processCommand(command) {
    commandsProcessed++;
    document.getElementById('commands-processed').innerText = commandsProcessed;

    if (command.includes('hello') || command.includes('hi') || command.includes('good morning') || command.includes('good evening')) {
        speak('Hello! How can I assist you today?');
    } else if (command.includes('jarvis')) {
        speak('Yes, I am here. How can I help you?');
    } else if (command.includes('open')) {
        await handleOpenCommand(command);
    } else if (command.includes('call') || command.includes('message')) {
        await handleCommunicationCommand(command);
    } else if (command.includes('weather')) {
        const city = command.split('weather in ')[1] || 'Delhi';
        const weather = await getWeather(city);
        if (weather) {
            speak(
                `The current weather in ${city} is ${weather.temperature}°C with ${weather.description}. ` +
                `The humidity is ${weather.humidity}% and wind speed is ${weather.windSpeed} km/h.`
            );
            document.getElementById('weather-result').innerText = 
                `${city}: ${weather.temperature}°C, ${weather.description}`;
        }
    } else if (command.includes('news')) {
        const news = await getNews();
        if (news && news.length > 0) {
            speak('Here are the latest headlines.');
            document.getElementById('news-list').innerHTML = news
                .map(article => `<li>${article}</li>`)
                .join('');
        }
    } else if (command.includes('meaning of')) {
        const word = command.split('meaning of ')[1];
        const meaning = await getDictionary(word);
        if (meaning) {
            speak(`The meaning of ${word} is: ${meaning}`);
            document.getElementById('dictionary-result').innerText = meaning;
        }
    } else if (command.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        speak(`The current time is ${currentTime}`);
        document.getElementById('current-time').innerText = currentTime;
    } else {
        speak('Command not recognized. Please try again.');
    }
}

async function handleOpenCommand(command) {
    if (command.includes('youtube')) {
        window.open('https://www.youtube.com', '_blank');
        speak('Opening YouTube.');
    } else if (command.includes('whatsapp')) {
        window.open('https://web.whatsapp.com', '_blank');
        speak('Opening WhatsApp.');
    } else if (command.includes('telegram')) {
        window.open('https://web.telegram.org', '_blank');
        speak('Opening Telegram.');
    } else if (command.includes('instagram')) {
        window.open('https://www.instagram.com', '_blank');
        speak('Opening Instagram.');
    } else {
        speak('Platform not recognized for opening.');
    }
}

async function handleCommunicationCommand(command) {
    const [action, platform] = command.includes('message') ? ['message', 'message'] : ['call', 'call'];
    const name = command.split(`${action} `)[1]?.split(' on ')[0]?.trim();
    const platformName = command.split(' on ')[1]?.trim();

    if (!contacts[name]) {
        speak(`I could not find a contact named ${name}.`);
        return;
    }

    const number = contacts[name];
    if (platformName === 'whatsapp') {
        const whatsappURL = action === 'call' 
            ? `https://wa.me/${number}`
            : `https://wa.me/${number}?text=Hello%20${name}`;
        window.open(whatsappURL, '_blank');
        speak(`${action === 'call' ? 'Calling' : 'Messaging'} ${name} on WhatsApp.`);
    } else if (platformName === 'telegram') {
        speak('Telegram calling or messaging is not natively supported via web links.');
    } else if (platformName === 'instagram') {
        speak('Instagram does not support direct calling or messaging via web links.');
    } else {
        speak('Platform not recognized for communication.');
    }
}

// Live Weather Functionality
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${CONFIG.weatherApiKey}&units=metric`
        );
        const data = await response.json();
        return {
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: (data.wind.speed * 3.6).toFixed(2), // Convert m/s to km/h
        };
    } catch (error) {
        console.error('Weather fetch error:', error);
        speak('Unable to fetch weather data.');
        return null;
    }
}

// Live News Functionality
async function getNews() {
    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=${CONFIG.newsApiKey}`
        );
        const data = await response.json();
        return data.articles.map(article => article.title).slice(0, 5);
    } catch (error) {
        console.error('News fetch error:', error);
        speak('Unable to fetch news.');
        return [];
    }
}

// Live Dictionary Functionality
async function getDictionary(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        return data[0].meanings[0].definitions[0].definition;
    } catch (error) {
        console.error('Dictionary fetch error:', error);
        speak('Unable to fetch dictionary data.');
        return null;
    }
}

// Calculation functionality
function handleCalculation(command) {
    try {
        const calculation = command.replace('calculate', '').trim();
        const result = eval(calculation);
        speak(`The result of ${calculation} is ${result}`);
    } catch (error) {
        console.error('Calculation error:', error);
        speak('I could not process the calculation. Please check the format and try again.');
    }
}

// Time and Uptime Update
setInterval(() => {
    uptime++;
    document.getElementById('uptime').innerText = `${uptime}m`;
}, 60000);

function updateTime() {
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('current-time').innerText = currentTime;
}
setInterval(updateTime, 1000);

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
});
