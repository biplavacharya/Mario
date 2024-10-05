const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const reward = document.getElementById('reward');

let isJumping = false;
let score = 0;

// Function for jumping
function jump() {
    if (isJumping) return;

    isJumping = true;
    let jumpHeight = 0;
    let jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 5;
                    character.style.bottom = `${jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += 5;
            character.style.bottom = `${jumpHeight}px`;
        }
    }, 20);
}

// Collision detection
function checkCollision() {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    const rewardRect = reward.getBoundingClientRect();

    // Collision with obstacle
    if (characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top &&
        characterRect.top < obstacleRect.bottom) {
        alert('Game Over!');
        resetGame();
    }

    // Collision with reward
    if (characterRect.right > rewardRect.left &&
        characterRect.left < rewardRect.right &&
        characterRect.bottom > rewardRect.top &&
        characterRect.top < rewardRect.bottom) {
        score += 10;
        reward.style.display = 'none';
        console.log('Score:', score);
    }
}

// Reset the game
function resetGame() {
    obstacle.style.animation = 'none';
    setTimeout(() => {
        obstacle.style.animation = '';
    }, 10);
}

// Listen for key presses
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

// Run collision check
setInterval(checkCollision, 100);
