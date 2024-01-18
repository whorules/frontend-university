const score = sessionStorage.getItem("SCORE");
const user = sessionStorage.getItem("USER");
const btnEl = document.getElementById('btn-playAgain');
const dummyScores = [{ newName: "Freddy", newScore: 10000 }, { newName: "Chica", newScore: 8200 }, { newName: "Bonnie", newScore: 7500 }, { newName: "Foxy", newScore: 5000 }, { newName: "Puppet", newScore: 3750 }];

btnEl.addEventListener('click', playAgain);

function playAgain() {
  window.location.href = "index.html";
}

function updateScoreBoard() {
  const topScores = JSON.parse(localStorage.getItem("TOP_SCORES")) || dummyScores;
  topScores.sort((a, b) => b.newScore - a.newScore);

  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = '';

  for (let i = 0; i < Math.min(5, topScores.length); i++) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${i + 1}</td>
        <td>${topScores[i].newName}</td>
        <td>${topScores[i].newScore}</td>
    `;
    if (topScores[i].newName === user && topScores[i].newScore === score) {
      row.style.backgroundColor = '#fb594a';
    }
    leaderboard.appendChild(row);
  }
}

function addScore(newName, newScore) {
  const topScores = JSON.parse(localStorage.getItem('TOP_SCORES')) || dummyScores;
  topScores.push({ newName, newScore });

  localStorage.setItem('TOP_SCORES', JSON.stringify(topScores));
  updateScoreBoard();
}

window.addEventListener("load", () => {
  document.getElementById("displayScore").innerHTML = ` ${score}`;
  addScore(user, score);
});
