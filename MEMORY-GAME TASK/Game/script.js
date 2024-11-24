document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matchedPairs = 0;
    const totalPairs = cards.length / 2;
    let startTime;
  
    const windowscreen = {
      showVictoryScreen: (moves, timeTaken) => {
        const victoryScreen = document.createElement('div');
        victoryScreen.classList.add('victory-screen');
        victoryScreen.innerHTML = `
          <h1>You Won!</h1>
          <p>Moves Taken: ${moves}</p>
          <p>Time Taken: ${timeTaken} seconds</p>
          <button id="restart-button">Play Again</button>
        `;
        document.body.appendChild(victoryScreen);
  
        document.getElementById('restart-button').addEventListener('click', () => {
          window.location.reload();
        });
      }
    };
  
    function startGame() {
      startTime = new Date();
    }
  
    function flipCard() {
      if (!startTime) startGame();
      if (lockBoard || this === firstCard) return;
  
      this.classList.add('flip');
      moves++;
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  
      if (isMatch) {
        matchedPairs++;
        disableCards();
        if (matchedPairs === totalPairs) {
          setTimeout(() => endGame(), 1000);
        }
      } else {
        unflipCards();
      }
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetBoard();
    }
  
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    function shuffle() {
      cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
      });
    }
  
    function endGame() {
      const endTime = new Date();
      const timeTaken = Math.floor((endTime - startTime) / 1000);
      windowscreen.showVictoryScreen(moves, timeTaken);
    }
  
    cards.forEach(card => card.addEventListener('click', flipCard));
    shuffle();
  });
  