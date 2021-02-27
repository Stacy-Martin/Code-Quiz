// var declarations are globally scoped or function scoped 
// while let and const are block scoped - let is limited to 
// the block in which it is declared while variable declared. 
// var variables can be updated and re-declared within its scope; 
// let variables can be updated but not re-declared; 
// const variables can neither be updated nor re-declared. 
// They are all hoisted to the top of their scope.

// var uses something called ‘hoisting’, which can lead to unexpected results.
// let and const are both block-scoped. Which means you can declare them in for loop or 
// if statement, and they will only be valid for that block. This helps with spotting 
// bugs and makes your code more robust. const prevents variable re-assignment.

// In the case for the for loop. Every iteration of the loop is a new ‘block scope’, so 
// I am in fact able to re-create a new constant for every iteration.

// It’s useful to use const instead of let, because it prevents you from accidentally 
// overwriting variables. 

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// var timerEl = document.getElementById('timer');

// let shuffledQuestions, currentQuestionIndex

// let declares a variable and can initialize it's value, so it is starting the 
// count of correct answers to zero, and the question index to zero so it will start with 
// the first qu
let countCorrectAnswers = 0;
let currentQuestionIndex = 0;

const win = document.getElementsByClassName('correctAnswers');
// const lose = document.getElementsByClassName('lose');
const resultsContainer = document.getElementsByClassName('scoreContainer');
const timerEl = document.getElementsByClassName('timer-count')

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
// var timerCount;

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
  winCounter=0
  loseCounter=0
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  // because the timer was broken down into an individual function it could be called 
  // here at the start of the game
  timer()
  // resultsContainer.classList.remove('hide')
  // lose.classList.remove('hide')
}

// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// Timer that counts down from 25
function timer() {
  var timeLeft = 25;
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
      // displayMessage();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
  checkAnswer ()
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
  // this is where the questions are shuffled and the next button is revealed 
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
  // this is where the Next button is changed to Restart after the 5 questions
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

// this is adding my const questions to the quiz
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
        { text:  "09",  correct: false },
        { text:  "04",  correct: false },
        { text:  "07",  correct: true },
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

// let currentQuestionIndex=0

// sets all buttons false initially until they are clicked correctly and may b
// become true
var buttonBlock = false

// function scoreKeeper() {

// }


// naming a function which is going to update the winCounter every time
// the current question is true 
// innerHTML puts text dynamically into the HTML
function correctAnswer(answer) {
    if(questions[currentQuestionIndex].answers.correct == true) {
      win.innerHTML = winCounter ++;
    } 
}

function wrongAnswer(answer) {
  if(questions[currentQuestionIndex].answers.correct == false) {
    lose.innerHTML = loseCounter ++;
  } 
}

// function correctAnswer and wrongAnswer must be called 

// this is checking if the answers are true or false 
function checkAnswer(answer){
  if(buttonBlock == false) {
    if(questions[currentQuestionIndex].correct == answer) {
      correctAnswer(); 
    }
    else {
      wrongAnswer(questions[currentQuestionIndex].correct)
      wrongAnswer()
    } 
    buttonBlock=true
  }
}

