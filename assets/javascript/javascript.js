const questionDisplay = document.querySelector('#questions');
const startBtn = document.querySelector('#start-btn');
const form = document.querySelector('#form');

form.style.display = 'none'

let currentQuestion ={}
let acceptingAnswers = true
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Commonly used datatypes DO not include:',
        choice1: 'Strings',
        choice2: 'Booleans',
        choice3: 'Alerts',
        choice4: 'Numbers',
        answer: 'Alerts',
    },
    {
        question: 'The condition in an if / else statement is enclosed with _____.',
        choice1: 'quotes',
        choice2: 'curly brackets',
        choice3: 'parenthesis',
        choice4: 'square brackets',
        answer: 'parenthesis',
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        choice1: 'numbers and strings',
        choice2: 'other arrays',
        choice3: 'booleans',
        choice4: 'all of the above',
        answer: 'all of the above',
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables.',
        choice1: 'commas',
        choice2: 'curly brackets',
        choice3: 'quotes',
        choice4: 'parenthesis',
        answer: 'quotes',
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choice1: 'JavaScript',
        choice2: 'terminal/bash',
        choice3: 'for loops',
        choice4: 'console.log',
        answer: 'console.log',
    }
]

const MAX_QUESTIONS = 5

// Hide initial screen and begin quiz
function startGame() {
    questionCounter = 0
    availableQuestions = [...questions]
    questionDisplay.style.display = 'none';
    getNewQuestion();
    timer()
}

function getNewQuestion() {
    // Select a random question from question object and place into empty currentQuestion object
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    questionDisplay.innerText = ''
    questionDisplay.style.display = 'flex'
    // Create p tag
    let question = document.createElement('p')
    // Set text of p tag
    question.textContent = currentQuestion.question
    // Display p tag containing question
    questionDisplay.appendChild(question)
    // Create choice buttons
    let choice1 = document.createElement('button')
    let choice2 = document.createElement('button')
    let choice3 = document.createElement('button')
    let choice4 = document.createElement('button')
    // Set text of buttons to choices of current question
    choice1.textContent = currentQuestion.choice1
    choice2.textContent = currentQuestion.choice2
    choice3.textContent = currentQuestion.choice3
    choice4.textContent = currentQuestion.choice4
    // Append elements to page
    questionDisplay.appendChild(choice1)
    questionDisplay.appendChild(choice2)
    questionDisplay.appendChild(choice3)
    questionDisplay.appendChild(choice4)
    
    const choices = document.querySelectorAll('button')

    questionCounter++

    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        endGame()
    }

    for (var i = 0; i < choices.length; i++) {
        choices[i].addEventListener('click', function() {
            if (this.textContent === currentQuestion.answer) {
                    const correct = document.createElement('h2')
                    correct.textContent = 'Correct Answer';
                    questionDisplay.appendChild(correct);
                    setTimeout(() => {
                        getNewQuestion();
                    }, 1000);
                } else {
                    const incorrect = document.createElement('h2');
                    incorrect.textContent = 'Incorrect Answer';
                    questionDisplay.appendChild(incorrect);
                    setTimeout(() => {
                        getNewQuestion();
                    }, 1000);
                }
        });
    }
}

function timer() {
    var sec = 1000;
    var timer = setInterval(function(){
        document.querySelector('#timer').innerText = 'Time: ' + sec;
        sec--;
        if (sec < 0 || availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            let score = sec + 1
            endGame()
            clearInterval(timer);
            document.querySelector('#final-score').innerText = 'Your score is: ' + score; 
        }
    }, 1000);
}


function endGame() {
    questionDisplay.style.display = 'none'
    document.querySelector('#timer').style.display = 'none';
    form.style.display = 'block'
}