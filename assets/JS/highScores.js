let restartBtn = document.getElementById('restart-btn')
let resetBtn = document.getElementById("reset-btn")
let saveBtn = document.getElementById('save-btn')

// add event listeners to each button
saveBtn.addEventListener('click', saveInitials)
resetBtn.addEventListener('click', resetScores)
restartBtn.addEventListener('click', restartQuiz)
console.log(window.location.pathname)

// create a function to save the users initials
function saveInitials() {

}

// create a function to reset the scores
function resetScores() {

}

// create a function to restart the quiz
function restartQuiz() {
    window.location.href ='../index.html'
}
console.log(window.location.pathname)