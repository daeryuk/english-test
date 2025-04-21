// testSpeaking.js
const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const soundBtn = document.getElementById("sound-btn");

const startEngQuizBtn = document.getElementById("engQuiz");
const startKorQuizBtn = document.getElementById("korQuiz");
const endQuizBtn = document.getElementById("endQuiz");

const quizContainer = document.getElementById("quiz-container");

const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const wrongPhraseBtn = document.getElementById("wrongPhrase-btn");
const exitTestBtn = document.getElementById("exitTest-btn");

const searchPhraseBtn = document.getElementById("searchPhrase-btn");
const searchPhraseInput = document.getElementById("searchPhrase-input");
const searchPhraseResult = document.getElementById("searchPhrase-result");

let currentQuestionIndex = 0;
let score = 0;
let questionLanguage;
let wrongPhrases = [];
let attemptedQuestions = 0;
let phraseList = [];

// JSON 데이터 불러오기
fetch('testSpeakingdata.json')
  .then(response => response.json())
  .then(data => {
    phraseList = data;
  })
  .catch(error => {
    console.error('Error loading the phrase data:', error);
  });

// 문구 찾기 기능
searchPhraseBtn.addEventListener("click", function () {
  const inputPhrase = searchPhraseInput.value.toLowerCase();
  const foundPhrases = phraseList.filter(
    (phrase) =>
      phrase.eng.toLowerCase().includes(inputPhrase) ||
      phrase.kor.includes(inputPhrase)
  );

  if (foundPhrases.length > 0) {
    searchPhraseResult.innerHTML = `
        <div class="search-results">
          ${foundPhrases
            .map(
              (phrase) => `
              <div class="search-item">
                <div class="search-item-eng">${phrase.eng}</div>
                <div class="search-item-kor">${phrase.kor}</div>
              </div>
            `
            )
            .join("")}
        </div>
      `;
  } else {
    searchPhraseResult.innerHTML = `
        <div class="search-results">
          <div class="search-item">목록에 없는 문구입니다.</div>
        </div>
      `;
  }
});

// 영어 회화 시험 시작
startEngQuizBtn.addEventListener("click", () => {
  questionLanguage = "eng";
  quizContainer.style.display = "block";
  initQuiz();
});

// 한글 회화 시험 시작
startKorQuizBtn.addEventListener("click", () => {
  questionLanguage = "kor";
  quizContainer.style.display = "block";
  initQuiz();
});

// 종료 버튼
endQuizBtn.addEventListener("click", () => {
  endQuizBtn.style.display = "none";
  showResult();
});

// 테스트 완전 종료 버튼
exitTestBtn.addEventListener("click", () => {
  resultContainer.style.display = "none";
  quizContainer.style.display = "none";
  score = 0;
  wrongPhrases = [];
});

// 단어 발음 재생
soundBtn.addEventListener("click", () => {
  playPhraseSound();
});

// 회화 문구 발음 재생 함수
function playPhraseSound() {
  if (phraseList.length === 0 || currentQuestionIndex >= phraseList.length) return;
  
  if ('speechSynthesis' in window) {
    const text = phraseList[currentQuestionIndex].eng;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;  // 약간 느린 속도
    utterance.pitch = 1;
    
    speechSynthesis.cancel(); // 이전 음성 취소
    speechSynthesis.speak(utterance);
  } else {
    alert("이 브라우저는 음성 합성을 지원하지 않습니다.");
  }
}

// 배열 섞기
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// 정답 선택지 셔플 함수
function shuffleOptions(correctAnswer, allPhrases) {
  // 정답과 다른 3개의 랜덤 보기를 생성
  let options = [correctAnswer];
  let tempPhrases = [...allPhrases]; // 원본 배열 복사
  
  // 현재 문제를 tempPhrases에서 제거
  const currentPhrase = tempPhrases.find(
    (phrase) => phrase[questionLanguage === "eng" ? "kor" : "eng"] === correctAnswer
  );
  
  if (currentPhrase) {
    const index = tempPhrases.indexOf(currentPhrase);
    if (index > -1) {
      tempPhrases.splice(index, 1);
    }
  }
  
  // 랜덤하게 섞기
  shuffleArray(tempPhrases);
  
  // 3개의 오답 추가
  for (let i = 0; i < 3 && i < tempPhrases.length; i++) {
    options.push(tempPhrases[i][questionLanguage === "eng" ? "kor" : "eng"]);
  }
  
  // 선택지 섞기
  shuffleArray(options);
  
  return options;
}

// 퀴즈 초기화
function initQuiz() {
  shuffleArray(phraseList);
  currentQuestionIndex = 0;
  score = 0;
  attemptedQuestions = 0;
  wrongPhrases = [];
  displayQuestion();
}

// 문제 표시
function displayQuestion() {
  buttonMaker();
  questionNumber.innerText = `# ${currentQuestionIndex + 1}`;
  if (questionLanguage === "eng") {
    question.innerText = `${phraseList[currentQuestionIndex].eng}\n다음 중 올바른 뜻을 선택하세요.`;
    // 영어 문제일 때 소리 버튼 표시
    soundBtn.style.display = "inline-block";
  } else {
    question.innerText = `${phraseList[currentQuestionIndex].kor}\n다음 중 올바른 표현을 선택하세요.`;
    // 한글 문제일 때 소리 버튼 숨김 (정답 후 표시)
    soundBtn.style.display = "none";
  }
  optionsContainer.style.display = "block";
  
  // 종료 버튼 중앙 정렬
  endQuizBtn.style.display = "block";
  endQuizBtn.style.margin = "1.5rem auto";
}

// 버튼 생성
function buttonMaker() {
  const shuffledAnswers = shuffleOptions(
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ],
    phraseList
  );

  let buttonsHTML = '';
  
  // 4지선다 레이아웃 생성
  shuffledAnswers.forEach((answer, index) => {
    const optionLetter = ['A', 'B', 'C', 'D'][index];
    
    buttonsHTML += `
      <button type="button" onclick="checkAnswer('${answer.replace(/'/g, "\\'")}')">
        <span class="option-number">${optionLetter}</span>
        <span class="option-text">${answer}</span>
      </button>
    `;
  });
  
  optionsContainer.innerHTML = buttonsHTML;
}

// 정답 체크
function checkAnswer(answer) {
  attemptedQuestions++;
  const correctAnswer =
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ];
    
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
      
      // 1.2초 후 다음 문제로 이동
      setTimeout(() => {
        nextQuestion();
      }, 1200);
    } else {
      nextQuestion();
    }
  } else {
    wrongPhrases.push(phraseList[currentQuestionIndex]);
    
    // 오답 버튼 찾기
    let selectedButton;
    let correctButton;
    
    allButtons.forEach(btn => {
      if (btn.textContent.includes(answer)) {
        // 사용자가 선택한 버튼 (오답)
        selectedButton = btn;
        selectedButton.classList.add('wrong-answer');
        selectedButton.innerHTML = `${selectedButton.innerHTML} <i class="fas fa-times"></i>`;
      }
      if (btn.textContent.includes(correctAnswer)) {
        // 실제 정답 버튼
        correctButton = btn;
        setTimeout(() => {
          correctButton.classList.add('show-correct');
          correctButton.innerHTML = `${correctButton.innerHTML} <i class="fas fa-check"></i>`;
        }, 500);
      }
    });

    let answerDisplay = document.createElement("div");
    answerDisplay.setAttribute("id", "answer-display");
    answerDisplay.className = "wrong-answer-feedback";
    answerDisplay.innerText = `오답! 정답은: ${correctAnswer}`;

    // 오답 시 소리 버튼 표시 (한글 문제일 때도)
    soundBtn.style.display = "inline-block";
    
    // 1.5초 후 다음 문제 버튼 표시
    setTimeout(() => {
      optionsContainer.style.display = "none";
      question.appendChild(answerDisplay);

      let nextButton = document.createElement("button");
      nextButton.innerText = "다음 문제";
      nextButton.classList.add('next-button');
      
      nextButton.addEventListener("click", () => {
        nextQuestion();
      });

      question.appendChild(nextButton);
    }, 1500);
  }
}

// 다음 문제로 이동
function nextQuestion() {
  currentQuestionIndex++;
  
  // 모든 문제를 다 풀었으면 결과 표시
  if (currentQuestionIndex >= phraseList.length) {
    showResult();
    return;
  }
  
  // 질문 요소 초기화
  const answerDisplay = document.getElementById("answer-display");
  if (answerDisplay) {
    answerDisplay.remove();
  }
  
  // 다음 문제 버튼 제거
  const nextButton = document.querySelector(".next-button");
  if (nextButton) {
    nextButton.remove();
  }
  
  // 다음 문제 표시
  displayQuestion();
}

// 결과 표시
function showResult() {
  const accuracy = Math.round((score / attemptedQuestions) * 100);
  resultText.innerHTML = `
    <div>총 문제 수: ${attemptedQuestions}</div>
    <div>맞은 문제 수: ${score}</div>
    <div>정확도: ${accuracy}%</div>
  `;
  
  endQuizBtn.style.display = "none";
  resultContainer.style.display = "block";
  
  // 재시작 버튼 이벤트
  restartBtn.addEventListener("click", () => {
    resultContainer.style.display = "none";
    initQuiz();
  });
  
  // 틀린 문구 보기 버튼 이벤트
  wrongPhraseBtn.addEventListener("click", () => {
    if (wrongPhrases.length === 0) {
      alert("틀린 문구가 없습니다!");
      return;
    }
    
    // 틀린 문구 목록 표시 로직
    const wrongPhrasesList = wrongPhrases.map((phrase, index) => 
      `<div class="search-item">
        <div class="search-item-eng">${phrase.eng}</div>
        <div class="search-item-kor">${phrase.kor}</div>
       </div>`
    ).join("");
    
    searchPhraseResult.innerHTML = `
      <div class="search-results">
        <h3>틀린 문구 목록</h3>
        ${wrongPhrasesList}
      </div>
    `;
    
    resultContainer.style.display = "none";
    quizContainer.style.display = "none";
  });
} 