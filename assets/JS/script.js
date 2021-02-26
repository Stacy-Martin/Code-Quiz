const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var timerEl = document.getElementById('timer');

let shuffledQuestions, currentQuestionIndex
let countRightAnswers = 0;

const win = document.getElementsByClassName('win');
const lose = document.getElementsByClassName('lose');
const resultsContainer = document.getElementsByClassName('results');
const timerElement = document.getElementsByClassName('timer')

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Timer that counts down from 10
function timer() {
  var timeLeft = 10;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// these are the questions for the quiz
const questions = [
  {
      question: "Where do you reference JavaScript in the HTML?",
      answers: [
        { text: "At the bottom of the body",  correct: true },
        { text: "At the top of the body",  correct: false },
        { text:  "At the bottom of the header",  correct: false },
        { text: "It doesn't need to be referenced",  correct: false },
      ]
  },
  {
      question: "How many primitive types of JavaScript are there?",
      answers: [
        { text:  "9",  correct: false },
        { text:  "4",  correct: false },
        { text:  "7",  correct: true },
        { text: "22",  correct: false },
      ]
  },
  {
      question: "What are the primitive types of JavaScript?",
      answers: [
        { text: "undefined, variable, number, true, bigint, symbol, none",  correct: false },
        { text: "undefined, string, number, boolean, bigint, symbol, null",  correct: true },
        { text:  "undefined, variable, number, false, bigint, character, none",  correct: false },
        { text:  "unrelated, string, character, boolean, integer, symbol, none",  correct: false },
      ]
  },
  {
      question: "What tool can be used to view the JavaScript code and troubleshoot from within the browswer?",
      answers: [
        { text: "the console log",  correct: true },
        { text: "the inspector",  correct: false },
        { text:  "the refactor tool",  correct: false },
        { text:  "developer tool",  correct: false },
      ]
  },
  {
      question: "Which of the following are NOT a characteristic of arrays?",
      answers: [
          { text: "used to store groups of data in a single variable",  correct: false },
          { text: "used to define functions",  correct: true },
          { text: "can have methods or properties applied to them",  correct: false },
          { text: "they are zero-indexed",  correct: false },
    ]
  },
]

timer()



