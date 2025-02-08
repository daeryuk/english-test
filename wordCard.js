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

// URL 파라미터로 선택한 단어장 가져오기
const urlParams = new URLSearchParams(window.location.search);
const deck = urlParams.get('deck') || 'testWordData.json';

// JSON 데이터 불러오기
fetch(deck)
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
        let meaningContent = "";
        if (typeof word.kor === "object") {
            meaningContent = Object.keys(word.kor)
                .map(pos => `<span class="pos-tag">${pos}</span>: ${word.kor[pos]}`)
                .join("<br>");
        } else {
            meaningContent = word.kor;
        }
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${word.eng}</td>
            <td>${meaningContent}</td>
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
    
    // 한글 뜻이 객체이면 품사별로 강조 표시하여 보여주고, 문자열이면 그대로 표시
    if (typeof currentWord.kor === "object") {
        const meaningHTML = Object.keys(currentWord.kor).map(pos => {
            return `<span class="pos-tag">${pos}</span>: ${currentWord.kor[pos]}`;
        }).join("<br>");
        meaningElement.innerHTML = meaningHTML;
    } else {
        meaningElement.textContent = currentWord.kor;
    }
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