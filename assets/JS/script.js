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

// Timer that counts down from 5
function timer() {
  var timeLeft = 5;

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





//  // The init function is called when the page loads 
// function init() {
//   getWins();
//   getlosses();
// }

// // The startGame function is called when the start button is clicked
// function startGame() {
//   isWin = false;
//   timerCount = 10;
//   // Prevents start button from being clicked when round is in progress
//   startButton.disabled = true;
//   startTimer()
// }

// function buildQuiz(){
//     // variable to store the HTML output
//     const output = [];
  
//     // for each question...
//     myQuestions.forEach(
//       (currentQuestion, questionNumber) => {
  
//         // variable to store the list of possible answers
//         const answers = [];
  
//         // and for each available answer...
//         for(letter in currentQuestion.answers){
  

  
//         // add this question and its answers to the output
//         output.push(
//           `<div class="question"> ${currentQuestion.question} </div>
//           <div class="answers"> ${answers.join('')} </div>`
//         );
//       }
//     );
  
//     // finally combine our output list into one string of HTML and put it on the page
//     quizContainer.innerHTML = output.join('');
//   }



//   function showResults(){

//     // gather answer containers from our quiz
//     const resultContainers = resultContainer.querySelectorAll('.results');
  
//     // keep track of user's answers
//     let numCorrect = 0;
  
//     // for each question...
//     myQuestions.forEach( (currentQuestion, questionNumber) => {
  
//       // find selected answer
//       const answerContainer = answerContainers[questionNumber];
//       const selector = `input[name=question${questionNumber}]:checked`;
//       const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
//       // if answer is correct
//       if(userAnswer === currentQuestion.correctAnswer){
//         // add to the number of correct answers
//         numCorrect++;
  
//         // color the answers green
//         answerContainers[questionNumber].style.color = 'lightgreen';
//       }
//       // if answer is wrong or blank
//       else{
//         // color the answers red
//         answerContainers[questionNumber].style.color = 'red';
//       }
//     });
  
//     // show number of correct answers out of total
//     resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
//   }

// // The winGame function is called when the win condition is met
// function winGame() {
//   wordBlank.textContent = "YOU WON!!!🏆 ";
//   winCounter++
//   startButton.disabled = false;
//   setWins()
// }

// // The loseGame function is called when timer reaches 0
// function loseGame() {
//   wordBlank.textContent = "GAME OVER";
//   loseCounter++
//   startButton.disabled = false;
//   setLosses()
// }

// // Updates win count on screen and sets win count to client storage
// function setWins() {
//   win.textContent = winCounter;
//   localStorage.setItem("winCount", winCounter);
// }
// // These functions are used by init
// function getWins() {
//   // Get stored value from client storage, if it exists
//   var storedWins = localStorage.getItem("winCount");
//   // If stored value doesn't exist, set counter to 0
//   if (storedWins === null) {
//     winCounter = 0;
//   } else {
//     // If a value is retrieved from client storage set the winCounter to that value
//     winCounter = storedWins;
//   }
//   //Render win count to page
//   win.textContent = winCounter;
// }

// function getlosses() {
//   var storedLosses = localStorage.getItem("loseCount");
//   if (storedLosses === null) {
//     loseCounter = 0;
//   } else {
//     loseCounter = storedLosses;
//   }
//   lose.textContent = loseCounter;
// }

// function checkWin() {
//   // If the word equals the blankLetters array when converted to string, set isWin to true
//   if (chosenWord === blanksLetters.join("")) {
//     // This value is used in the timer function to test if win condition is met
//     isWin = true;
//   }
// }
// // Updates lose count on screen and sets lose count to client storage
// function setLosses() {
//   lose.textContent = loseCounter;
//   localStorage.setItem("loseCount", loseCounter);
// }
// // display quiz right away
// buildQuiz();

// // on submit, show results
// // startButton.addEventListener('click', showResults);

// // Attach event listener to document to listen for key event
// document.addEventListener("keydown", function(event) {
//   // If the count is zero, exit function
//   if (timerCount === 0) {
//     return;
//   }
// });


// // Attach event listener to start button to call startGame function on click
// startButton.addEventListener("click", startGame);

// // Calls init() so that it fires when page opened
// init();

// // Bonus: Add reset button
// var resetButton = document.querySelector(".reset-button");

// function resetGame() {
//   // Resets win and loss counts
//   winCounter = 0;
//   loseCounter = 0;
//   // Renders win and loss counts and sets them into client storage
//   setWins()
//   setLosses()
// }
// // Attaches event listener to button
// resetButton.addEventListener("click", resetGame);



