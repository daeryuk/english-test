const card = document.querySelector('.card');
const wordElement = document.querySelector('.word');
const meaningElement = document.querySelector('.meaning');
const soundBtn = document.querySelector('.sound-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');

let currentIndex = 0;
let wordList = [];

// JSON 데이터 불러오기
fetch('testWordData.json')
    .then(response => response.json())
    .then(data => {
        wordList = data;
        displayWord();
    })
    .catch(error => {
        console.error('Error loading the word data:', error);
    });

// 카드 뒤집기 기능
card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('sound-btn') && 
        !e.target.classList.contains('fa-volume-up')) {
        card.classList.toggle('flipped');
    }
});

// 발음 재생 기능
soundBtn.addEventListener('click', () => {
    const word = wordElement.textContent;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
});

// 단어 표시 함수
function displayWord() {
    if (wordList.length === 0) return;
    
    const currentWord = wordList[currentIndex];
    wordElement.textContent = currentWord.eng;
    meaningElement.textContent = currentWord.kor;
    
}

// 이전 단어
prevBtn.addEventListener('click', () => {
    card.classList.remove('flipped');
    currentIndex = (currentIndex - 1 + wordList.length) % wordList.length;
    displayWord();
});

// 다음 단어
nextBtn.addEventListener('click', () => {
    card.classList.remove('flipped');
    currentIndex = (currentIndex + 1) % wordList.length;
    displayWord();
});