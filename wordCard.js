const card = document.querySelector('.card');
const wordElement = document.querySelector('.word');
const meaningElement = document.querySelector('.meaning');
const soundBtn = document.querySelector('.sound-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const jumpInput = document.getElementById('jumpInput');
const jumpBtn = document.querySelector('.jump-btn');
const wordListBtn = document.querySelector('.word-list-btn');
const wordListModal = document.getElementById('wordListModal');
const closeBtn = document.querySelector('.close-btn');
const wordTableBody = document.getElementById('wordTableBody');
const progressBar = document.querySelector('.progress-bar');
const counter = document.querySelector('.counter');
const timerDisplay = document.querySelector('.timer');
const scoreDisplay = document.querySelector('.score');

let currentIndex = 0;
let startTime = new Date();
let score = 0;
let timer;
let isFlipped = false;
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
        updateCounter();
        startTimer();
    })
    .catch(error => {
        console.error('Error loading the word data:', error);
    });

/* 카드 클릭 시, 한글 뜻을 슬라이드하여 표시 */
card.addEventListener('click', (e) => {
    // 사운드 버튼이나 아이콘 클릭이 아닌 경우에만 동작
    if (!e.target.classList.contains('sound-btn') && 
        !e.target.classList.contains('fa-volume-up')) {
        console.log('카드 클릭됨');
        // show 클래스 토글
        meaningElement.classList.toggle('show');
        console.log('의미 요소 클래스:', meaningElement.className);
    }
});

// 발음 재생 기능
soundBtn.addEventListener('click', () => {
    const word = wordElement.textContent;
    console.log("발음 재생 시도:", word);
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;  // 약간 느린 속도로 설정
        utterance.pitch = 1;
        
        speechSynthesis.cancel(); // 이전 음성 취소
        speechSynthesis.speak(utterance);
        
        console.log("발음 재생 성공");
    } else {
        console.error("이 브라우저는 음성 합성을 지원하지 않습니다.");
        alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
    }
});

// 단어 수 표시 업데이트
function updateCounter() {
    if (!counter) return;
    counter.textContent = `${currentIndex + 1} / ${wordList.length}`;

    // 진행바 업데이트
    if (progressBar) {
        const percentage = ((currentIndex + 1) / wordList.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}

// 타이머 시작
function startTimer() {
    if (!timerDisplay) return;
    
    clearInterval(timer);
    timer = setInterval(() => {
        const now = new Date();
        const timeDiff = now - startTime;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${displaySeconds < 10 ? '0' + displaySeconds : displaySeconds}`;
    }, 1000);
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
    if (!wordTableBody || !wordListModal) return;
    
    wordTableBody.innerHTML = '';
    
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
        wordTableBody.appendChild(row);
    });
    
    wordListModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    if (wordListModal) {
        wordListModal.style.display = 'none';
    }
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

// 토스트 메시지 함수
function showToast(message, type = 'info') {
    // 기존 토스트가 있다면 제거
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 토스트 표시 애니메이션
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 토스트 자동 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}