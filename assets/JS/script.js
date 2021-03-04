//DOM elements
const start = document.querySelector("#startQuizBtn");
const mainEl = document.querySelector(".instructionsP");
const headEl = document.querySelector(".quizInfo");
const jumbo = document.querySelector(".jumbotron");
const timerDisplay = document.getElementById("timer");
const viewHighScores = document.getElementById("highScoresBtn");
const questions = document.querySelector(".questions");
const answerList = document.querySelector("#questionList");
const answerbox1 = document.getElementById("answer1");
const answerbox2 = document.getElementById("answer2");
const answerbox3 = document.getElementById("answer3");
const answerbox4 = document.getElementById("answer4");
const scoreBoard = document.querySelector("#scores");
const clearScores = document.querySelector(".clearBtn");
const restartQuiz = document.querySelector(".restartBtn");
const answerResponseCorrect = document.querySelector(".rightAnswer");
const answerResponseWrong = document.querySelector(".wrongAnswer");
// var underAnswerLine = document.querySelector(".underAnswerLine");

//Hiding buttons and Elements
questionList.style.visibility = "hidden";
answer1.style.visibility = "hidden";
answer2.style.visibility = "hidden";
answer3.style.visibility = "hidden";
answer4.style.visibility = "hidden";
// questions.style.visibility = "hidden";
clearScores.style.visibility = "hidden";
restartQuiz.style.visibility = "hidden";
// answerResponseCorrect.style.display = "none";
// answerResponseWrong.style.display = "none";
// underAnswerLine.style.display = "none";

//First page event listeners
start.addEventListener("click", firstTimer);
viewHighScores.addEventListener("click", viewHighScoresButton);

// these are the questions for the quiz
const qAndA = [
  {
      question: "Where do you link JavaScript in the HTML?",
      answer1: "At the bottom of the body",  
      answer2: "At the top of the body",  
      answer3:  "At the bottom of the header", 
      answer4: "It doesn't need to be referenced", 
      correct: "At the bottom of the body",  
  },
  {
      question: "How many primitive types of JavaScript are there?",
      answer1: "09", 
      answer2:  "04",  
      answer3:  "07",  
      answer4: "22",  
      correct: "07",
  },
  {
      question: "What are the primitive types of JavaScript?",
      answer1: "undefined, variable, number, true, bigint, symbol, none",  
      answer2: "undefined, string, number, boolean, bigint, symbol, null",  
      answer3:  "undefined, variable, number, false, bigint, character, none",  
      answer4:  "unrelated, string, character, boolean, integer, symbol, none",  
      correct: "undefined, string, number, boolean, bigint, symbol, null",  
  },
  {
      question: "What tool can be used to view the JavaScript code and troubleshoot from within the browswer?",
      answer1: "the console log",
      answer2: "the inspector",  
      answer3:  "the refactor tool",  
      answer4:  "developer tool",  
      correct: "the console log",
  },
  {
      question: "Which of the following are NOT a characteristic of arrays?",
      answer1: "used to store groups of data in a single variable", 
      answer2: "used to define functions", 
      answer3: "can have methods or properties applied to them",  
      answer4: "they are zero-indexed",  
      correct: "used to define functions",
  },
]


//Start Quiz Timer
var secondsLeft = 3;
function firstTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        mainEl.textContent = secondsLeft;
        mainEl.style.fontSize = "250px";
        headEl.textContent = "Starting in...";
        start.style.visibility = "hidden";

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            quiz(i);
        }
    }, 1000);
}

//Quiz formatting and timer
var quizTimer = 60;
var playerScore = 0;
var i = 0;
function quiz(i) {
    var timerInveral = setInterval(function () {
        answerbox1.style.visibility = "visible";
        answerbox2.style.visibility = "visible";
        answerbox3.style.visibility = "visible";
        answerbox4.style.visibility = "visible";
        answerList.style.visibility = "visible";
        questions.style.visibility = "visible";
        // underAnswerLine.style.display = "block";
        mainEl.textContent = "";
        headEl.textContent = "";
        jumbo.style.paddingTop = "5px";
        quizTimer--;
        timerDisplay.textContent = ("Score: " + playerScore + "   Time: " + quizTimer);

        //determines when to call final page
        if (finalPage.called === true || quizTimer === 0 || finalQuestion === true) {
            var finalScore = quizTimer + playerScore;
            clearInterval(timerInveral);
            finalPage(finalScore);
            return;
        }
    }, 1000)
    questionMaker(i);
}

//generates the qustions and answers
var finalQuestion = false;
function questionMaker(i) {
    if (i === qAndA.length) {
        finalQuestion = true;
        return;
    }
    questions.textContent = qAndA[i].question;
    questions.style.fontSize = "20px";
    answerbox1.textContent = qAndA[i].answer1;
    answerbox2.textContent = qAndA[i].answer2;
    answerbox3.textContent = qAndA[i].answer3;
    answerbox4.textContent = qAndA[i].answer4;

    //event listener for answers
    answerbox1.addEventListener("click", function () {
        answerCheck(answerbox1, i);
    });
    answerbox2.addEventListener("click", function () {
        answerCheck(answerbox2, i);
    });
    answerbox3.addEventListener("click", function () {
        answerCheck(answerbox3, i);
    });
    answerbox4.addEventListener("click", function () {
        answerCheck(answerbox4, i);
    });
}

//checks if clicked answer is correct
var iterationChecker = 0;    //prevents i from iterating backwards bug
function answerCheck(answer, i) {
    if (iterationChecker === i) {
        if (answerResponseWrong.style.display === "block") {
            answerResponseWrong.style.display = "none";
        }
        else if (answerResponseCorrect.style.display === "block") {
            answerResponseCorrect.style.display = "none";
        };
        if (answer.textContent === qAndA[i].correct) {
            playerScore = playerScore + 10;
            i++;
            iterationChecker++;
            answerResponseCorrect.style.display = "block";
            return questionMaker(i);
        }
        else {
            i++;
            iterationChecker++;
            answerResponseWrong.style.display = "block";
            return questionMaker(i);
        };
    }
}

//finalPage
function finalPage(finalScore) {

    //general formatting
    answerList.remove();
    questions.remove();
    timerDisplay.remove();
    // underAnswerLine.remove();
    // if (answerResponseWrong.style.display === "block") {
    //     answerResponseWrong.style.display = "none";
    // }
    // if (answerResponseCorrect.style.display === "block") {
    //     answerResponseCorrect.style.display = "none";
    // }
    scoreBoard.textContent = "User High Scores:";
    scoreBoard.style.fontSize = "20px";
    finalPage.called = true;
    mainEl.style.visibility = "hidden";
    headEl.style.visibility = "hidden";
    // headEl.textContent = "Nice Work!";

    //Setting to local storage
    var name = prompt("Nice work! You earned a score of " + finalScore + "! Please enter your name to record your score.");
    if (name === "") {
        name = prompt("Nice work! You earned a score of " + finalScore + "! Please enter your name to record your score.");
    }
    addToStorage(name, finalScore);
    return;
}

//adds to storage then generates scoreboard
function addToStorage(name, finalScore) {
    var localScore = JSON.parse(localStorage.getItem("allScores"));
    if (localScore === null) {
        localStorage.setItem("allScores", JSON.stringify([{ key: name, score: finalScore }]))
    }
    else {
        localScore.push({ key: name, score: finalScore });
        localStorage.setItem("allScores", JSON.stringify(localScore));
    }
    generateScoreboard();
}

//generate scoreboard function
function generateScoreboard() {
    var localScore = [];
    var localOrderedScore = [];
    localScore = JSON.parse(localStorage.getItem("allScores"));
    //sorts score into descending order
    localOrderedScore = localScore.sort(function (a, b) { return (b.score - a.score) });
    for (let i = 0; i < localOrderedScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = ((i + 1) + ". User " + localOrderedScore[i].key + " with " + localOrderedScore[i].score + " points");
        li.setAttribute("data-index", i);
        li.classList.add("list-group-item");
        li.classList.add("list-group-item-action");
        scoreBoard.appendChild(li);
    }

    //clear highscores button
    clearScores.style.visibility = "visible";
    clearScores.textContent = "Clear Highscores";
    clearScores.addEventListener("click", function () {
        localStorage.clear();
        scoreBoard.remove();
        clearScores.remove();
    });

    //restart quiz button
    restartQuiz.style.visibility = "visible";
    restartQuiz.textContent = "Restart Quiz";
    restartQuiz.addEventListener("click", function () {
        window.location.reload(false);
    });
}


//Scoreboard generated when viewHighScores button is clicked
function viewHighScoresButton() {
    start.remove();
    mainEl.textContent = "";
    headEl.textContent = "";
    answerList.remove();
    questions.remove();
    timerDisplay.remove();
    // underAnswerLine.remove();
    // if (answerResponseWrong.style.display === "block") {
    //     answerResponseWrong.style.display = "none";
    // }
    // if (answerResponseCorrect.style.display === "block") {
    //     answerResponseCorrect.style.display = "none";
    // }
    scoreBoard.textContent = "High Scores:";
    scoreBoard.style.fontSize = "20px";
    finalPage.called = true;
    headEl.style.visibility = "visible";
    // headEl.textContent = "The All-Time Greatest";

    var localScore = [];
    var localOrderedScore = [];
    localScore = JSON.parse(localStorage.getItem("allScores"));
    //sorts score into descending order
    localOrderedScore = localScore.sort(function (a, b) { return (b.score - a.score) });
    for (let i = 0; i < localOrderedScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = ((i + 1) + ". User " + localOrderedScore[i].key + " with " + localOrderedScore[i].score + " points");
        li.setAttribute("data-index", i);
        li.classList.add("list-group-item");
        li.classList.add("list-group-item-action");
        scoreBoard.appendChild(li);
    }

    //clear highscores button
    clearScores.style.visibility = "visible";
    clearScores.textContent = "Clear Highscores";
    clearScores.addEventListener("click", function () {
        localStorage.clear();
        scoreBoard.remove();
        clearScores.remove();
    });

    //restart quiz button
    restartQuiz.style.visibility = "visible";
    restartQuiz.textContent = "Restart Quiz";
    restartQuiz.addEventListener("click", function () {
        window.location.reload(false);
    });
}

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
