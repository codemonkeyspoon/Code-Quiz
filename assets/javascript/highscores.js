// Retrieve high scores data from local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const scores = document.querySelector('#scoreList');


function displayHighScore() {
    // Check if there are high scores to display
    if (highScores.length > 0) {
      // Sort high scores in descending order based on score value
      const sortedScores = highScores.sort((a, b) => b.score - a.score);
      
      // Display each high score in a list
      const highScoresList = document.createElement('ul');
      sortedScores.forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.initials}: ${score.score}`;
        highScoresList.appendChild(listItem);
      });
      scores.appendChild(highScoresList);
    } else {
      console.log('No high scores found in local storage.');
    }
  }

displayHighScore()