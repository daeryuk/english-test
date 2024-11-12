// testWord.js
const questionNumber = document.getElementById('question-number');
const question = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');

const startEngQuizBtn = document.getElementById('engQuiz');
const startKorQuizBtn = document.getElementById('korQuiz');
const endQuizBtn = document.getElementById('endQuiz');

const quizContainer = document.getElementById('quiz-container');

const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');
const wrongWordBtn = document.getElementById('wrongWord-btn');

// '단어 찾아보기' 버튼과 입력 필드, 결과 표시 영역을 찾는다.
const searchWordBtn = document.getElementById('searchWord-btn');
const searchWordInput = document.getElementById('searchWord-input');
const searchWordResult = document.getElementById('searchWord-result');


let currentQuestionIndex = 0; //문제 번호
let score = 0;
let questionLanguage; //영어 or 한글
let wrongWords = []; // 틀린 단어들을 저장할 배열 추가
let attemptedQuestions = 0; // 시도한 문제 수
let wordList = [];

// JSON 데이터 불러오기
fetch('testWordData.json')
  .then(response => response.json())
  .then(data => {
    wordList = data;
  })
  .catch(error => {
    console.error('Error loading the word data:', error);
  });


///////
// '단어 찾아보기' 버튼 클릭 이벤트 리스너
searchWordBtn.addEventListener('click', function() {
  const inputWord = searchWordInput.value.trim(); // 앞뒤 공백 제거
  const foundWord = wordList.find(word => word.eng.toLowerCase() === inputWord.toLowerCase());

  // 말풍선 컨테이너를 생성하고 스타일을 적용
  const container = document.createElement('div');
  container.className = 'speech-bubble';
  
  const content = document.createElement('div');
  content.className = 'speech-bubble-content';

  if (foundWord) {
      // 단어가 존재하는 경우
      const wordElement = document.createElement('span');
      wordElement.className = 'speech-bubble-highlight';
      wordElement.textContent = foundWord.eng;
      
      const meaningElement = document.createElement('p');
      meaningElement.textContent = `${foundWord.kor}`;
      
      content.appendChild(wordElement);
      content.appendChild(meaningElement);
  } else {
      // 단어가 존재하지 않는 경우
      content.textContent = "리스트에 없는 단어입니다.";
      content.classList.add('error-message');
      // 또는 더 간단히
      // content.style.color = '#ef4444';
  }

  container.appendChild(content);
  
  // 기존 결과를 지우고 새로운 말풍선을 추가
  searchWordResult.innerHTML = '';
  searchWordResult.appendChild(container);
  
  // 입력 필드 초기화
  searchWordInput.value = '';
});
//////
//영어 단어 시험
startEngQuizBtn.addEventListener('click', () => {
  questionLanguage = 'eng';
  quizContainer.style.display = 'block';
  initQuiz();
});

//한글 단어 시험
startKorQuizBtn.addEventListener('click', () => {
  questionLanguage = 'kor';
  quizContainer.style.display = 'block';
  initQuiz();
});

//종료 버튼
endQuizBtn.addEventListener('click', () => {
  // 마지막 문제에 대한 처리를 위해 체크 로직 추가
  if (currentQuestionIndex === wordList.length - 1) {
    checkAnswer(document.querySelector('button[type="button"]').textContent.split('. ')[1]);
  }

  endQuizBtn.style.display = 'none';
  showResult();
});

//셔플
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initQuiz() {
  shuffleArray(wordList);
  //초기화
  currentQuestionIndex = 0;
  attemptedQuestions = 0;
  displayQuestion();
}

//단어 생성
function displayQuestion() {
  buttonMaker();
  questionNumber.innerText = `# ${currentQuestionIndex + 1}`;
  if (questionLanguage === 'eng') {
    question.innerText = `${wordList[currentQuestionIndex].eng}\n다음 중 올바른 뜻을 선택하세요.`;
  } else {
    question.innerText = `${wordList[currentQuestionIndex].kor}\n다음 중 올바른 뜻을 선택하세요.`;
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
  shuffledAnswers.forEach((answer, index) => {
    buttonsHTML += `<button type="button" onclick="checkAnswer('${answer}')">${
      index + 1
    }. ${answer}</button>`;
  });

  optionsContainer.innerHTML = buttonsHTML;
}

//옵션을 셔플
function shuffleOptions(correctAnswer, allAnswers) {
  let incorrectAnswers = allAnswers
    .map((word) => (questionLanguage === 'eng' ? word.kor : word.eng))
    .filter((word) => word !== correctAnswer);
  let sortedOptions = [];
  //사지선다
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    sortedOptions.push(incorrectAnswers[randomIndex]);
    incorrectAnswers.splice(randomIndex, 1);
  }
  sortedOptions.push(correctAnswer);
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

//체점 결과
function showResult() {
  optionsContainer.style.display = 'none';
  question.style.display = 'none';

  // attemptedQuestions 사용하여 정확한 계산 수행
  let resultPercentage = (score / attemptedQuestions) * 100;

  resultText.innerText = `${attemptedQuestions}문제 중에 ${score}개를 맞혔습니다. 점수는 ${resultPercentage.toFixed(
    2
  )}점 입니다.`;

  resultContainer.style.display = 'block';
}

//다시 시작 버튼 이벤트
restartBtn.addEventListener('click', () => {
  score = 0;
  wrongWords = []; // 틀린 단어 목록을 초기화
  resultContainer.style.display = 'none';
  question.style.display = '';
  endQuizBtn.style.display = '';
  initQuiz();
});

// '틀린 단어 보기' 버튼에 이벤트 리스너 추가
wrongWordBtn.addEventListener('click', showWrongWords);

// 정답 판별
function checkAnswer (answer) {
  attemptedQuestions++;
  if (
    answer ===
    (questionLanguage === 'eng'
      ? wordList[currentQuestionIndex].kor
      : wordList[currentQuestionIndex].eng)
  ) {
    score++
    nextQuestion()
  } else {
    // 틀린 단어를 wrongWords 배열에 추가하는 로직
    wrongWords.push(wordList[currentQuestionIndex]);


    let answerDisplay = document.createElement('div')
    answerDisplay.setAttribute('id', 'answer-display')
    answerDisplay.innerText = `오답! 정답은: ${
      questionLanguage === 'eng'
        ? wordList[currentQuestionIndex].kor
        : wordList[currentQuestionIndex].eng
    }`

    optionsContainer.style.display = 'none'
    question.appendChild(answerDisplay)

    let nextButton = document.createElement('button')
    nextButton.innerText = '다음 문제'
    
    nextButton.addEventListener('click', () => {
      nextQuestion()
    })

    question.appendChild(nextButton)
  }
}

// 틀린 단어 보기 함수
function showWrongWords() {
  let wrongWordsList = wrongWords.map(word => `${word.eng} : ${word.kor}`).join('<br>');
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
