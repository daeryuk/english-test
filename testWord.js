const questionNumber = document.getElementById('question-number');
const question = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const soundBtn = document.getElementById('sound-btn');

const startEngQuizBtn = document.getElementById('engQuiz');
const startKorQuizBtn = document.getElementById('korQuiz');
const endQuizBtn = document.getElementById('endQuiz');

const quizContainer = document.getElementById('quiz-container');

const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');
const wrongWordBtn = document.getElementById('wrongWord-btn');
const exitTestBtn = document.getElementById('exitTest-btn');

const searchWordBtn = document.getElementById('searchWord-btn');
const searchWordInput = document.getElementById('searchWord-input');
const searchWordResult = document.getElementById('searchWord-result');

let currentQuestionIndex = 0;
let score = 0;
let questionLanguage;
let wrongWords = [];
let attemptedQuestions = 0;
let wordList = [];
let currentWord = "";

// JSON 데이터 불러오기
fetch('testWordData.json')
  .then(response => response.json())
  .then(data => {
    wordList = data;
  })
  .catch(error => {
    console.error('Error loading the word data:', error);
  });

// 한글 뜻 객체를 문자열로 변환하는 함수
function formatKorMeaning(korObj) {
  // 객체가 아니거나 null/undefined인 경우 처리
  if (!korObj || typeof korObj !== 'object') {
    return korObj || '';
  }
  
  // 빈 객체인 경우 처리
  if (Object.keys(korObj).length === 0) {
    return '';
  }
  
  // 품사는 제외하고 한글 뜻만 추출
  return Object.values(korObj).join(', ');
}
  
// '단어 찾아보기' 버튼 클릭 이벤트 리스너
searchWordBtn.addEventListener('click', function() {
  const inputWord = searchWordInput.value.trim().toLowerCase(); // 앞뒤 공백 및 대소문자 구분 제거

  // 사용자가 입력한 알파벳이 포함된 단어 찾기
  const foundWords = wordList.filter(word => 
    word.eng.toLowerCase().includes(inputWord) || 
    (typeof word.kor === 'object' 
      ? Object.values(word.kor).some(val => val.includes(inputWord))
      : word.kor.includes(inputWord))
  );

  // 말풍선 컨테이너를 생성하고 스타일을 적용
  const container = document.createElement('div');
  container.className = 'speech-bubble';

  const content = document.createElement('div');
  content.className = 'speech-bubble-content';

  if (foundWords.length > 0) {
    // 단어가 존재하는 경우
    foundWords.forEach(foundWord => {
      const wordElement = document.createElement('span');
      wordElement.className = 'speech-bubble-highlight';
      wordElement.textContent = foundWord.eng;
      
      const meaningElement = document.createElement('p');
      meaningElement.textContent = formatKorMeaning(foundWord.kor);
      
      content.appendChild(wordElement);
      content.appendChild(meaningElement);
    });
  } else {
    // 단어가 존재하지 않는 경우
    content.textContent = "리스트에 없는 단어입니다.";
    content.classList.add('error-message');
  }

  container.appendChild(content);
  
  // 기존 결과를 지우고 새로운 말풍선을 추가
  searchWordResult.innerHTML = '';
  searchWordResult.appendChild(container);
  
  // 입력 필드 초기화
  searchWordInput.value = '';
});

// 영어 단어 시험
startEngQuizBtn.addEventListener('click', () => {
  questionLanguage = 'eng';
  quizContainer.style.display = 'block';
  initQuiz();
});

// 한글 단어 시험
startKorQuizBtn.addEventListener('click', () => {
  questionLanguage = 'kor';
  quizContainer.style.display = 'block';
  initQuiz();
});

// 종료 버튼
endQuizBtn.addEventListener('click', () => {
  if (currentQuestionIndex === wordList.length - 1) {
    checkAnswer(document.querySelector('button[type="button"]').textContent.split('. ')[1]);
  }

  endQuizBtn.style.display = 'none';
  showResult();
});

// 테스트 완전 종료 버튼
exitTestBtn.addEventListener('click', () => {
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'none';
  score = 0;
  wrongWords = [];
});

// 단어 발음 재생
soundBtn.addEventListener('click', () => {
  playWordSound();
});

// 발음 재생 함수
function playWordSound() {
  // 현재 단어 가져오기
  let wordToSpeak = "";
  
  if (questionLanguage === 'eng') {
    wordToSpeak = wordList[currentQuestionIndex].eng;
  } else {
    // 틀린 답변 후 정답 표시 중에는 정답 영어 단어 발음
    const answerDisplay = document.getElementById('answer-display');
    if (answerDisplay) {
      const correctAnswer = answerDisplay.textContent.replace('오답! 정답은: ', '');
      wordToSpeak = questionLanguage === 'kor' 
        ? correctAnswer 
        : wordList[currentQuestionIndex].eng;
    }
  }
  
  if (wordToSpeak && 'speechSynthesis' in window) {
    console.log("발음 재생:", wordToSpeak);
    const utterance = new SpeechSynthesisUtterance(wordToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    speechSynthesis.cancel(); // 이전 음성 취소
    speechSynthesis.speak(utterance);
  } else {
    console.error("발음 재생 실패 또는 지원하지 않는 브라우저");
  }
}

// 셔플
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initQuiz() {
  shuffleArray(wordList);
  currentQuestionIndex = 0;
  attemptedQuestions = 0;
  displayQuestion();
}

// 단어 생성
function displayQuestion() {
  buttonMaker();
  questionNumber.innerText = `# ${currentQuestionIndex + 1}`;
  
  if (questionLanguage === 'eng') {
    question.innerText = `${wordList[currentQuestionIndex].eng}\n다음 중 올바른 뜻을 선택하세요.`;
    // 영어 문제일 때 소리 버튼 표시
    soundBtn.style.display = 'inline-block';
  } else {
    question.innerText = `${formatKorMeaning(wordList[currentQuestionIndex].kor)}\n다음 중 올바른 표현을 선택하세요.`;
    // 한글 문제일 때 소리 버튼 숨김 (정답 후 표시)
    soundBtn.style.display = 'none';
  }
  
  optionsContainer.style.display = 'block';
}

// 버튼 생성
function buttonMaker() {
  const shuffledAnswers = shuffleOptions(
    wordList[currentQuestionIndex][questionLanguage === 'eng' ? 'kor' : 'eng'],
    wordList
  );
  let buttonsHTML = '';
  
  // 4지선다 레이아웃 생성
  shuffledAnswers.forEach((answer, index) => {
    const optionNumber = index + 1;
    const optionLetter = ['A', 'B', 'C', 'D'][index];
    
    buttonsHTML += `
      <button type="button" onclick="checkAnswer('${answer}')">
        <span class="option-number">${optionLetter}</span>
        <span class="option-text">${answer}</span>
      </button>
    `;
  });

  optionsContainer.innerHTML = buttonsHTML;
}

// 옵션 셔플
function shuffleOptions(correctAnswer, allAnswers) {
  // 정답 문자열 처리 (한글 의미인 경우 문자열로 변환)
  const correctString = questionLanguage === 'eng' 
    ? formatKorMeaning(correctAnswer) 
    : correctAnswer;
  
  // 모든 오답 가져오기 및 문자열 변환
  let incorrectAnswers = allAnswers
    .map((word) => {
      if (questionLanguage === 'eng') {
        return formatKorMeaning(word.kor);
      } else {
        return word.eng;
      }
    })
    .filter((word) => word !== correctString);
  
  // 최대 4지선다로 제한
  let sortedOptions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    sortedOptions.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1);
  }
  sortedOptions.push(correctString);
  shuffleArray(sortedOptions);
  return sortedOptions;
}

// 다음 문제로 넘아가는 이벤트
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < wordList.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// 체점 결과
function showResult() {
  optionsContainer.style.display = 'none';
  question.style.display = 'none';

  let resultPercentage = (score / attemptedQuestions) * 100;

  resultText.innerText = `${attemptedQuestions}문제 중에 ${score}개를 맞혔습니다. 점수는 ${resultPercentage.toFixed(
    2
  )}점 입니다.`;

  resultContainer.style.display = 'block';
}

// 다시 시작 버튼 이벤트
restartBtn.addEventListener('click', () => {
  score = 0;
  wrongWords = [];
  resultContainer.style.display = 'none';
  question.style.display = '';
  endQuizBtn.style.display = '';
  initQuiz();
});

// '틀린 단어 보기' 버튼에 이벤트 리스너 추가
wrongWordBtn.addEventListener('click', showWrongWords);

// 정답 판별
function checkAnswer(answer) {
  attemptedQuestions++;
  
  // 현재 단어의 정답 가져오기
  let correctAnswer;
  if (questionLanguage === 'eng') {
    correctAnswer = formatKorMeaning(wordList[currentQuestionIndex].kor);
  } else {
    correctAnswer = wordList[currentQuestionIndex].eng;
  }
  
  // 선택한 모든 버튼 선택
  const allButtons = document.querySelectorAll('#options-container button');
  
  // 모든 버튼 비활성화
  allButtons.forEach(btn => {
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
  });
  
  if (answer === correctAnswer) {
    // 정답인 경우
    score++;
    
    // 선택한 버튼 찾기 (정답 버튼)
    let selectedButton;
    allButtons.forEach(btn => {
      if (btn.textContent.includes(answer)) {
        selectedButton = btn;
      }
    });
    
    // 정답 효과 적용
    if (selectedButton) {
      selectedButton.classList.add('correct-answer');
      selectedButton.innerHTML = `${selectedButton.innerHTML} <i class="fas fa-check"></i>`;
      
      // 0.5초 후 다음 문제로 이동
      setTimeout(() => {
        nextQuestion();
      }, 1200);
    } else {
      nextQuestion();
    }
  } else {
    wrongWords.push(wordList[currentQuestionIndex]);
    
    // 오답 버튼 찾기
    let selectedButton;
    let correctButton;
    
    allButtons.forEach(btn => {
      const btnText = btn.textContent.split('. ')[1];
      if (btnText === answer) {
        // 사용자가 선택한 버튼 (오답)
        selectedButton = btn;
        selectedButton.classList.add('wrong-answer');
        selectedButton.innerHTML = `${selectedButton.innerHTML} <i class="fas fa-times"></i>`;
      }
      if (btnText === correctAnswer) {
        // 실제 정답 버튼
        correctButton = btn;
        setTimeout(() => {
          correctButton.classList.add('show-correct');
          correctButton.innerHTML = `${correctButton.innerHTML} <i class="fas fa-check"></i>`;
        }, 500);
      }
    });

    let answerDisplay = document.createElement('div');
    answerDisplay.setAttribute('id', 'answer-display');
    answerDisplay.innerText = `오답! 정답은: ${correctAnswer}`;

    // 오답 시 소리 버튼 표시 (한글 문제일 때도)
    soundBtn.style.display = 'inline-block';
    
    // 1.5초 후 다음 문제 버튼 표시
    setTimeout(() => {
      optionsContainer.style.display = 'none';
      question.appendChild(answerDisplay);
      
      let nextButton = document.createElement('button');
      nextButton.innerText = '다음 문제';
      nextButton.classList.add('next-button');
      
      nextButton.addEventListener('click', () => {
        nextQuestion();
      });
      
      question.appendChild(nextButton);
    }, 1500);
  }
}

// 틀린 단어 보기 함수
function showWrongWords() {
  let wrongWordsList = wrongWords.map(word => 
    `${word.eng} : ${formatKorMeaning(word.kor)}`
  ).join('<br>');
  
  if (wrongWordsList.length == 0) {
    resultText.innerHTML = `틀린 단어가 없습니다!`;
  } else {
    resultText.innerHTML = `<br>${wrongWordsList}`;
  }
  resultContainer.style.display = 'block';
}

function showQuestion() {
  if (document.getElementById('answer-display')) {
    question.removeChild(document.getElementById('answer-display'));
  }

  optionsContainer.style.display = 'block';
  displayQuestion();
}
initQuiz();
