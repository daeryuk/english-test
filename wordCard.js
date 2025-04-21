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
const wordTableBody = document.getElementById('wordTableBody');
const progressBar = document.querySelector('.progress-bar');
const counter = document.querySelector('.counter');
const timerDisplay = document.querySelector('.timer');
const difficultyDisplay = document.querySelector('.difficulty-value');
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

document.addEventListener('DOMContentLoaded', function() {
    // 전역 변수 선언
    const card = document.querySelector('.card');
    const wordElement = document.querySelector('.word');
    const meaningElement = document.querySelector('.meaning');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const soundBtn = document.getElementById('soundBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    const jumpInput = document.getElementById('jumpInput');
    const wordListBtn = document.getElementById('wordListBtn');
    const modal = document.getElementById('wordListModal');
    const closeBtn = document.querySelector('.close-btn');
    const wordTable = document.getElementById('wordTable');
    const wordTableBody = document.getElementById('wordTableBody');
    const progressBar = document.querySelector('.progress-bar');
    const counter = document.querySelector('.counter');
    const timerDisplay = document.querySelector('.timer');
    const difficultyDisplay = document.querySelector('.difficulty-value');
    const scoreDisplay = document.querySelector('.score');

    let currentIndex = 0;
    let startTime = new Date();
    let score = 0;
    let timer;
    let isFlipped = false;
    
    // 샘플 단어 데이터 (실제로는 API나 데이터베이스에서 불러올 수 있음)
    const words = [
        { word: 'aberration', meaning: '변칙, 일탈', difficulty: 3 },
        { word: 'benevolent', meaning: '자비로운, 인자한', difficulty: 2 },
        { word: 'cacophony', meaning: '불협화음, 소음', difficulty: 3 },
        { word: 'dexterity', meaning: '재주, 솜씨', difficulty: 2 },
        { word: 'ephemeral', meaning: '덧없는, 순간적인', difficulty: 3 },
        { word: 'fastidious', meaning: '까다로운, 꼼꼼한', difficulty: 4 },
        { word: 'garrulous', meaning: '수다스러운', difficulty: 4 },
        { word: 'harbinger', meaning: '전조, 선구자', difficulty: 3 },
        { word: 'idiosyncrasy', meaning: '특유성, 특이체질', difficulty: 5 },
        { word: 'juxtapose', meaning: '나란히 놓다', difficulty: 3 }
    ];

    // particles.js 초기화
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-container', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#7c3aed' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#7c3aed',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // 현재 카드 표시 함수
    function showCurrentCard() {
        wordElement.textContent = words[currentIndex].word;
        meaningElement.textContent = words[currentIndex].meaning;
        counter.textContent = `${currentIndex + 1} / ${words.length}`;
        updateProgress();
        updateDifficulty();
        
        // 카드 뒤집기 초기화
        isFlipped = false;
        card.classList.remove('flipped');
    }

    // 진행 상태 업데이트
    function updateProgress() {
        const percentage = ((currentIndex + 1) / words.length) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    // 난이도 업데이트
    function updateDifficulty() {
        difficultyDisplay.textContent = '★'.repeat(words[currentIndex].difficulty);
    }

    // 소리 재생 함수 (실제 구현에서는 TTS API 또는 오디오 파일 사용)
    function playSound() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(words[currentIndex].word);
            utterance.lang = 'en-US';
            speechSynthesis.speak(utterance);
            
            // 소리 버튼 애니메이션
            soundBtn.classList.add('active');
            setTimeout(() => {
                soundBtn.classList.remove('active');
            }, 800);
            
            // 토스트 메시지 표시
            showToast('발음을 들어보세요!');
        } else {
            // 브라우저가 Speech Synthesis API를 지원하지 않는 경우
            showToast('음성 지원이 되지 않는 브라우저입니다', 'error');
        }
    }

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

    // 타이머 업데이트 함수
    function updateTimer() {
        const now = new Date();
        const timeDiff = now - startTime;
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const displaySeconds = seconds % 60;
        timerDisplay.textContent = `${minutes < 10 ? '0' + minutes : minutes}:${displaySeconds < 10 ? '0' + displaySeconds : displaySeconds}`;
    }

    // 점수 업데이트 함수
    function updateScore(points) {
        score += points;
        scoreDisplay.textContent = score;
        
        // 새 업적 확인
        checkAchievements();
    }

    // 성취 달성 확인
    function checkAchievements() {
        const achievements = document.querySelectorAll('.achievement-badge.locked');
        
        if (score >= 50 && achievements[0].classList.contains('locked')) {
            unlockAchievement(achievements[0], '초보 학습자');
        }
        
        if (score >= 100 && achievements[1].classList.contains('locked')) {
            unlockAchievement(achievements[1], '열심 학습자');
        }
        
        if (score >= 200 && achievements[2].classList.contains('locked')) {
            unlockAchievement(achievements[2], '단어 마스터');
        }
    }

    // 업적 달성 애니메이션
    function unlockAchievement(badge, name) {
        badge.classList.remove('locked');
        
        // 축하 애니메이션 효과
        badge.animate([
            { transform: 'scale(1)', opacity: 0.7 },
            { transform: 'scale(1.5)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: 1000,
            iterations: 1
        });
        
        // 토스트 메시지로 업적 알림
        showToast(`🏆 축하합니다! '${name}' 업적을 달성했습니다!`, 'success');
    }

    // 단어 목록 테이블 생성
    function populateWordTable() {
        wordTableBody.innerHTML = '';
        
        words.forEach((item, index) => {
            const row = document.createElement('tr');
            
            const indexCell = document.createElement('td');
            indexCell.textContent = index + 1;
            
            const wordCell = document.createElement('td');
            wordCell.textContent = item.word;
            
            const meaningCell = document.createElement('td');
            meaningCell.textContent = item.meaning;
            
            const difficultyCell = document.createElement('td');
            difficultyCell.textContent = '★'.repeat(item.difficulty);
            
            row.appendChild(indexCell);
            row.appendChild(wordCell);
            row.appendChild(meaningCell);
            row.appendChild(difficultyCell);
            
            // 행 클릭 시 해당 단어로 이동
            row.addEventListener('click', function() {
                currentIndex = index;
                showCurrentCard();
                modal.classList.remove('show');
            });
            
            wordTableBody.appendChild(row);
        });
    }

    // 이벤트 리스너 설정
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showCurrentCard();
        } else {
            // 첫 단어에서 이전 버튼 클릭 시 효과
            prevBtn.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 300,
                iterations: 1
            });
            showToast('첫 번째 단어입니다!');
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < words.length - 1) {
            currentIndex++;
            showCurrentCard();
            // 다음 단어로 넘어갈 때 점수 추가
            updateScore(words[currentIndex].difficulty);
        } else {
            // 마지막 단어에서 다음 버튼 클릭 시 효과
            nextBtn.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], {
                duration: 300,
                iterations: 1
            });
            showToast('마지막 단어입니다!');
        }
    });

    soundBtn.addEventListener('click', playSound);

    // 카드 클릭 시 뒤집기 효과
    card.addEventListener('click', function() {
        isFlipped = !isFlipped;
        if (isFlipped) {
            card.classList.add('flipped');
            // 카드를 뒤집을 때 작은 점수 추가
            updateScore(1);
        } else {
            card.classList.remove('flipped');
        }
    });

    jumpBtn.addEventListener('click', function() {
        const jumpTo = parseInt(jumpInput.value);
        if (jumpTo >= 1 && jumpTo <= words.length) {
            currentIndex = jumpTo - 1;
            showCurrentCard();
            jumpInput.value = '';
        } else {
            showToast(`1에서 ${words.length} 사이의 숫자를 입력하세요`, 'error');
            jumpInput.focus();
        }
    });

    jumpInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            jumpBtn.click();
        }
    });

    wordListBtn.addEventListener('click', function() {
        populateWordTable();
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // ESC 키 눌렀을 때 모달 닫기
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });

    // 학습 시간 타이머 시작
    timer = setInterval(updateTimer, 1000);

    // 초기 카드 표시
    showCurrentCard();
});