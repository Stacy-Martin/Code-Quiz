//the DOM elements grabbed with query selector
const start = document.querySelector("#startQuizBtn");
const mainEl = document.querySelector(".instructionsP");
const headEl = document.querySelector(".quizInfo");
const jumbo = document.querySelector(".jumbotron");
const questions = document.querySelector(".questions");
const answerList = document.querySelector("#questionList");
const scoreBoard = document.querySelector("#scores");
const clearScores = document.querySelector(".clearBtn");
const restartQuiz = document.querySelector(".restartBtn");
const answerCorrect = document.querySelector(".rightAnswer");
const answerWrong = document.querySelector(".wrongAnswer");

//the DOM elements grabbed with their IDs
const timerDisplay = document.getElementById("timer");
const viewHighScores = document.getElementById("highScoresBtn");                                                                                   
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

// this is the question array for the quiz, with multiple choice answers and correct answer
// for scoring purposes.
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
  
//hide certain buttons or elements until correct time to appear, use of this feature to create entire
// quiz within one HTML
questionList.style.visibility = "hidden";
answer1.style.visibility = "hidden";
answer2.style.visibility = "hidden";
answer3.style.visibility = "hidden";
answer4.style.visibility = "hidden";
questions.style.visibility = "hidden";
clearScores.style.visibility = "hidden";
restartQuiz.style.visibility = "hidden";
answerCorrect.style.display = "none";
answerWrong.style.display = "none";

//Kick off the quiz, press start button and event listener for timer to begin
start.addEventListener("click", () => quiz());
// view high scores button reveals the high scores section
viewHighScores.addEventListener("click", viewHighScoresButton);

// start the timer at 26 so first number displayed is 25
var quizTimer = 25;
var userScore = 0;
//create the quiz and its time and associated formatting
function quiz(i=0) {
    // var i = 0;
    var timerInterval = setInterval(function () {
        answer1.style.visibility = "visible";
        answer2.style.visibility = "visible";
        answer3.style.visibility = "visible";
        answer4.style.visibility = "visible";
        answerList.style.visibility = "visible";
        questions.style.visibility = "visible";

        // this makes the quiz title and instructions disappear when the quiz starts
        mainEl.textContent = "";
        headEl.textContent = "";
        jumbo.style.paddingTop = "5px";
        // this actually starts the timer:
        timerDisplay.textContent = ("Score: " + userScore + "   Time: " + quizTimer);
        quizTimer--;

        //if any of these happen (high score button is pressed, timer reaches 0, or the final
        // question is answered) then the high scores page is called 
        if (hsPage.called === true || quizTimer === 0 || finalQuestion === true) {
            var finalScore = quizTimer + userScore;
            clearInterval(timerInterval);
            hsPage(finalScore);
            return;
        }
    }, 1000)
    // after creating the quiz format, the questions are generated:
    questionGenerator(i);
}

//creates the questions and answer form 
var finalQuestion = false;
function questionGenerator(i) {
    if (i === qAndA.length) {
        finalQuestion = true;
        return;
    }
    questions.textContent = qAndA[i].question;
    questions.style.fontSize = "20px";
    answer1.textContent = qAndA[i].answer1;
    answer2.textContent = qAndA[i].answer2;
    answer3.textContent = qAndA[i].answer3;
    answer4.textContent = qAndA[i].answer4;

    //adds an event listener to select for each answer
    answer1.addEventListener("click", function () {
        answerCheck(answer1, i);
    });
    answer2.addEventListener("click", function () {
        answerCheck(answer2, i);
    });
    answer3.addEventListener("click", function () {
        answerCheck(answer3, i);
    });
    answer4.addEventListener("click", function () {
        answerCheck(answer4, i);
    });
}

//scoring if user chose correct answer
// i really dont know how this works ??  ******
var iterationChecker = 0;    
function answerCheck(answer, i) {
    if (iterationChecker === i) {
        if (answerWrong.style.display === "block") {
            answerWrong.style.display = "none";
        }
        else if (answerCorrect.style.display === "block") {
            answerCorrect.style.display = "none";
        };
        if (answer.textContent === qAndA[i].correct) {
            userScore = userScore + 10;
            i++;
            iterationChecker++;
            answerCorrect.style.display = "block";
            return questionGenerator(i);
        }
        else {
            i++;
            iterationChecker++;
            answerWrong.style.display = "block";
            return questionGenerator(i);
        };
    }
}

//High scores generator
function hsPage(finalScore) {

    //formats the high scores card and makes certain elements disappear
    answerList.remove();
    questions.remove();
    answerWrong.style.display = "none";
    answerCorrect.style.display = "none";
    start.style.display = "none";
    timerDisplay.remove();
    scoreBoard.textContent = "User High Scores:";
    scoreBoard.style.fontSize = "40px";
    hsPage.called = true;
    mainEl.style.visibility = "hidden";
    headEl.style.visibility = "hidden";

    //prompting user to enter initials
    var initials = prompt("You did it, your score was " + finalScore + "! Please enter your initials and check out your ranking.");
    if (initials === "") {
        initials = prompt("You did it, your score was " + finalScore + "! Please enter your initials and check out your ranking.");
    }
    rankings(initials, finalScore);
    return;
}

//adds the score and initials to storage and then calls the scoreboard function
function rankings(initials, finalScore) {
    var localScore = JSON.parse(localStorage.getItem("allScores"));
    if (localScore === null) {
        localStorage.setItem("allScores", JSON.stringify([{ key: initials, score: finalScore }]))
    }
    else {
        localScore.push({ key: initials, score: finalScore });
        localStorage.setItem("allScores", JSON.stringify(localScore));
    }
    generateHighScores();
}

//this function puts the score into local storage and creates the high scores list
function generateHighScores() {
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

    //clear high scores button becomes visible
    clearScores.style.visibility = "visible";
    clearScores.textContent = "Clear Highscores";
    clearScores.addEventListener("click", function () {
        localStorage.clear();
        scoreBoard.remove();
        clearScores.remove();
    });

    //restart quiz button becomes visible
    restartQuiz.style.visibility = "visible";
    restartQuiz.textContent = "Restart Quiz";
    restartQuiz.addEventListener("click", function () {
        window.location.reload(false);
    });
}

//When the high scores button is clicked many other page elements disappear
function viewHighScoresButton() {
    timerDisplay.remove();
    start.remove();
    // answerCorrect.textContent = "";
    // answerWrong.textContent = "";
    mainEl.textContent = "";
    headEl.textContent = "";
    answerList.remove();
    questions.remove();
    scoreBoard.textContent = "High Scores:";
    scoreBoard.style.backgroundColor = "cyan";
    scoreBoard.style.padding = "20px";
    scoreBoard.style.fontFamily = "fantasy";
   

    // this is where the scores are stored to create the high scores list
    // research what this is doing more *****
    var localScore = [];
    var localOrderedScore = [];
    localScore = JSON.parse(localStorage.getItem("allScores"));
    //sorts scores high to low
    localOrderedScore = localScore.sort(function (a, b) { return (b.score - a.score) });
    for (let i = 0; i < localOrderedScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = ((i + 1) + ". User " + localOrderedScore[i].key + " with " + localOrderedScore[i].score + " points");
        li.setAttribute("data-index", i);
        li.classList.add("list-group-item");
        li.classList.add("list-group-item-action");
        scoreBoard.appendChild(li);
    }

    //create restart quiz button 
    restartQuiz.textContent = "Restart";
    restartQuiz.style.visibility = "visible";
    restartQuiz.addEventListener("click", function () {
        window.location.reload(false);
    });
    }

    //create clear high scores button
    clearScores.textContent = "Clear Scores";
    clearScores.addEventListener("click", function () {
        localStorage.clear();
        scoreBoard.remove();
        // remove clear scores button after pressed and functionality is complete
        clearScores.remove();
    });