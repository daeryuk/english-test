// testSpeaking.js
const questionNumber = document.getElementById("question-number");
const question = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");

const startEngQuizBtn = document.getElementById("engQuiz");
const startKorQuizBtn = document.getElementById("korQuiz");
const endQuizBtn = document.getElementById("endQuiz");

const quizContainer = document.getElementById("quiz-container");

const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
const wrongPhraseBtn = document.getElementById("wrongPhrase-btn");

const searchPhraseBtn = document.getElementById("searchPhrase-btn");
const searchPhraseInput = document.getElementById("searchPhrase-input");
const searchPhraseResult = document.getElementById("searchPhrase-result");

let currentQuestionIndex = 0;
let score = 0;
let questionLanguage;
let wrongPhrases = [];
let attemptedQuestions = [];
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

// 배열 섞기
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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
  } else {
    question.innerText = `${phraseList[currentQuestionIndex].kor}\n다음 중 올바른 표현을 선택하세요.`;
  }
  optionsContainer.style.display = "block";
}

// 버튼 생성
function buttonMaker() {
  const shuffledAnswers = shuffleOptions(
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ],
    phraseList
  );

  optionsContainer.innerHTML = shuffledAnswers
    .map(
      (answer, index) => `
        <button type="button" onclick="checkAnswer('${answer.replace(
          /'/g,
          "\\'"
        )}')">${index + 1}. ${answer}</button>
      `
    )
    .join("");
}

// 옵션 셔플
function shuffleOptions(correctAnswer, allAnswers) {
  let incorrectAnswers = allAnswers
    .map((phrase) => (questionLanguage === "eng" ? phrase.kor : phrase.eng))
    .filter((phrase) => phrase !== correctAnswer);

  let sortedOptions = [];
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    sortedOptions.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1);
  }
  sortedOptions.push(correctAnswer);
  shuffleArray(sortedOptions);
  return sortedOptions;
}

// 다음 문제
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < phraseList.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// 결과 표시
function showResult() {
  optionsContainer.style.display = "none";
  question.style.display = "none";

  let resultPercentage = (score / attemptedQuestions) * 100;
  resultText.innerText = `${attemptedQuestions}문제 중에 ${score}개를 맞혔습니다.\n점수는 ${resultPercentage.toFixed(2)}점 입니다.`;

  resultContainer.style.display = "block";
}

// 다시 시작
restartBtn.addEventListener("click", () => {
  score = 0;
  wrongPhrases = [];
  resultContainer.style.display = "none";
  question.style.display = "";
  endQuizBtn.style.display = "";
  initQuiz();
});

// 틀린 문구 보기
wrongPhraseBtn.addEventListener("click", showWrongPhrases);

// 정답 체크
function checkAnswer(answer) {
  attemptedQuestions++;
  const correctAnswer =
    phraseList[currentQuestionIndex][
      questionLanguage === "eng" ? "kor" : "eng"
    ];

  if (answer === correctAnswer) {
    score++;
    nextQuestion();
  } else {
    wrongPhrases.push(phraseList[currentQuestionIndex]);

    let answerDisplay = document.createElement("div");
    answerDisplay.setAttribute("id", "answer-display");
    answerDisplay.className = "wrong-answer-feedback";
    answerDisplay.innerText = `오답! 정답은: ${correctAnswer}`;

    optionsContainer.style.display = "none";
    question.appendChild(answerDisplay);

    let nextButton = document.createElement("button");
    nextButton.innerText = "다음 문제";
    nextButton.addEventListener("click", () => {
      nextQuestion();
    });

    question.appendChild(nextButton);
  }
}

// 틀린 문구 보기 함수
function showWrongPhrases() {
  let wrongPhrasesList = wrongPhrases.map(
    (phrase) => `${phrase.eng} : ${phrase.kor}`
  ).join("<br>");
  
  if (wrongPhrasesList.length === 0) {
    resultText.innerHTML = `틀린 문구가 없습니다!`;
  } else {
    resultText.innerHTML = `<br>${wrongPhrasesList}`;
  }
  resultContainer.style.display = "block";
}
