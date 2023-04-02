const questionDisplay = document.querySelector('#questions');
const startBtn = document.querySelector('#start-btn');
const form = document.querySelector('#form');
const initialInput = document.querySelector('#initial-form')
const timer = document.querySelector('#timer');

form.style.display = 'none'

let currentQuestion ={}
let acceptingAnswers = true
let questionCounter = 0
let availableQuestions = []
let time = 70;
let score = 0;

// My array of question objects
let questions = [
    {
        question: 'Which of these can be used to declare variables in JavaScript?',
        choice1: 'const',
        choice2: 'let',
        choice3: 'var',
        choice4: 'All of the above',
        answer: '4'
    },
    {
        question: 'What does DOM stand for?',
        choice1: 'Document Object Model',
        choice2: 'Document Observer Mode',
        choice3: 'Display Object Memmory',
        choice4: 'Drive only Memmory',
        answer: '1'
    },
    {
        question: 'How do you create a function in JavaScript?',
        choice1: 'function = myFunction()',
        choice2: 'function:myFunction()',
        choice3: 'function myFunction()',
        choice4: 'function.myFunction()',
        answer: '3'
    },
    {
        question: 'How does a FOR loop start?',
        choice1: ' for (i = 0; i <= 5)',
        choice2: ' for i = 1 to 5',
        choice3: ' for (i = 0; i <= 5; i++)',
        choice4: ' for (i <= 5; i++)',
        answer: '3'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        choice1: 'msg("Hello World");',
        choice2: 'msgBox("Hello World");',
        choice3: 'alert("Hello World");',
        choice4: 'alertBox("Hello World");',
        answer: '3'
    }
]

startBtn.addEventListener(`click`, () => {
    questionCounter = 0
    availableQuestions = [...questions]
    buildQuestion();
    setInterval(() => {
        time--;
        timer.innerText = 'Time: ' + time;
        if (time <= 0) {
            endGame();
        }
    }, 1000);
})

function buildQuestion() {
    if (time <= 0) {
        endGame()
        return;
    }
    // Select a random question from question object and place into empty currentQuestion object
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    questionDisplay.innerText = '';
    questionDisplay.style.display = 'flex';
    // Build HTML to display questions and choice buttons
    const prompt = `
      <p>${currentQuestion.question}</p>
      <div id="choiceSelection">
        <button data-choice="1">${currentQuestion.choice1}</button>
        <button data-choice="2">${currentQuestion.choice2}</button>
        <button data-choice="3">${currentQuestion.choice3}</button>
        <button data-choice="4">${currentQuestion.choice4}</button>
      </div>`;
    questionDisplay.innerHTML = prompt;
    // Add event listeners to the buttons
    const choiceSelection = document.querySelector('#choiceSelection');
    choiceSelection.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        checkAnswer(currentQuestion, questionsIndex, availableQuestions, button);
      });
    });
  }
  
  function checkAnswer(currentQuestion, questionsIndex, availableQuestions, button) {
    if (button.dataset.choice === currentQuestion.answer) {
      const correct = document.createElement('h2');
      correct.style.color = 'green';
      correct.textContent = 'Correct Answer';
      questionDisplay.appendChild(correct);
    } else {
      time = time - 10;
      const incorrect = document.createElement('h2');
      incorrect.style.color = 'red';
      incorrect.textContent = 'Incorrect Answer';
      questionDisplay.appendChild(incorrect);
    }
    // Move on to the next question
    availableQuestions.splice(questionsIndex, 1);
  
    // Check if there are still available questions
    if (availableQuestions.length === 0) {
      // End game if there are no more available questions
      setTimeout(() => {
        endGame();  
      }, 1000); 
    } else {
      // Otherwise, get a new question
      setTimeout(() => {
        buildQuestion();  
      }, 1000);   
    }
  }

function endGame() {
    // set time to score
    score = time;
    // Hide the question display
    questionDisplay.style.display = 'none';
    // Hide Timer
    timer.style.display = 'none';
    // Show the form to enter initials
    form.style.display = 'block';
  
    // Set the score on the form
    score = (score >= 0 ? score : 0);
    document.querySelector('#final-score').innerText = 'Your score is: ' + score;
  }



  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Get the user's initials and save the score and time
    const initials = initialInput.value;
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
  
    // redirect to high scores page 
    window.location.href = './highscores.html';
  });
  
  
  
  
  
  
  
  
  
  
  
  














































// function getNewQuestion() {
//     if (time <= 0) {
//         endGame()
//     } else {
//     // Select a random question from question object and place into empty currentQuestion object
//     const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
//     currentQuestion = availableQuestions[questionsIndex]
//     questionDisplay.innerText = ''
//     questionDisplay.style.display = 'flex'
//     // Build HTML to display questions and choice buttons
//     const prompt = `
//         <p>${currentQuestion.question}</p>
//         <div id="choiceSelection">
//         <button data-choice="1">${currentQuestion.choice1}</button>
//         <button data-choice="2">${currentQuestion.choice2}</button>
//         <button data-choice="3">${currentQuestion.choice3}</button>
//         <button data-choice="4">${currentQuestion.choice4}</button>
//         </div>`
//         questionDisplay.innerHTML = prompt;
//         const choiceSelection = document.querySelector('#choiceSelection')
//         choiceSelection.querySelectorAll('button').forEach((button) => {
//             button.addEventListener('click', () => {
//               // Check if user's choice is correct
//               if (button.dataset.choice === currentQuestion.answer) {
//                 const correct = document.createElement('h2')
//                 correct.textContent = 'Correct Answer';
//                 questionDisplay.appendChild(correct);
//               } else {
//                 time = time - 50;
//                 const correct = document.createElement('h2')
//                 correct.textContent = 'Inorrect Answer';
//                 questionDisplay.appendChild(correct);
//               }
//               // Move on to the next question
//               availableQuestions.splice(questionsIndex, 1);
          
//               // Check if there are still available questions
//               if (availableQuestions.length === 0) {
//                 // End game if there are no more available questions
//                 setTimeout(() => {
//                   endGame();  
//                 }, 1000); 
//               } else {
//                 // Otherwise, get a new question
//                 setTimeout(() => {
//                   getNewQuestion();  
//                 }, 1000);   
//               }
//             });
//           });
//         }     
// }



  