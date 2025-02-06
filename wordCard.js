const card = document.querySelector('.card');
const wordElement = document.querySelector('.word');
const meaningElement = document.querySelector('.meaning');
const soundBtn = document.querySelector('.sound-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const jumpInput = document.getElementById('jumpInput');
const jumpBtn = document.getElementById('jumpBtn');
const currentIndexSpan = document.getElementById('currentIndex');
const totalWordsSpan = document.getElementById('totalWords');
const wordListBtn = document.getElementById('wordListBtn');
const wordListModal = document.getElementById('wordListModal');
const closeBtn = document.querySelector('.close-btn');
const wordTable = document.getElementById('wordTable');

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

/* 카드 클릭 시, 기존 카드 뒤집기 효과 대신 한글 뜻을 슬라이드하여 표시 */
card.addEventListener('click', (e) => {
    if (!e.target.classList.contains('sound-btn') &&
        !e.target.classList.contains('fa-volume-up')) {
        meaningElement.classList.toggle('show');
    }
});

// 발음 재생 기능
soundBtn.addEventListener('click', () => {
    const word = wordElement.textContent;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
});

// 단어 수 표시 업데이트
function updateCounter() {
    currentIndexSpan.textContent = currentIndex + 1;
    totalWordsSpan.textContent = wordList.length;
}

// 특정 번호로 이동
jumpBtn.addEventListener('click', () => {
    const number = parseInt(jumpInput.value);
    if (number >= 1 && number <= wordList.length) {
        currentIndex = number - 1;
        // 의미 숨김 상태로 초기화
        meaningElement.classList.remove('show');
        displayWord();
        updateCounter();
        jumpInput.value = '';
    }
});

// 단어 리스트 모달
wordListBtn.addEventListener('click', () => {
    const tbody = wordTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    wordList.forEach((word, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${word.eng}</td>
            <td>${word.kor}</td>
        `;
        row.addEventListener('click', () => {
            currentIndex = index;
            meaningElement.classList.remove('show');
            displayWord();
            updateCounter();
            wordListModal.style.display = 'none';
        });
        tbody.appendChild(row);
    });
    
    wordListModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    wordListModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === wordListModal) {
        wordListModal.style.display = 'none';
    }
});

// 단어 표시 함수
function displayWord() {
    if (wordList.length === 0) return;
    
    const currentWord = wordList[currentIndex];
    wordElement.textContent = currentWord.eng;
    meaningElement.textContent = currentWord.kor;
    updateCounter();
}

// 이전 단어
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + wordList.length) % wordList.length;
    meaningElement.classList.remove('show');
    displayWord();
});

// 다음 단어
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % wordList.length;
    meaningElement.classList.remove('show');
    displayWord();
});