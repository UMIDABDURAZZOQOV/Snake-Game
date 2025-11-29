const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highscoreElement = document.querySelector(".high-score")

let gameOver = false
let foodX, foodY;
let snakeX =5, snakeY = 10;
let snakeBody = [];
let velocityX =0 ,velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
 highscoreElement.innerHTML = `High Score: ${highScore}`
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press ok to replay...");
    location.reload();
}


const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
         velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
         velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
         velocityX = 1;
        velocityY = 0;
    }
   
}

for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
}

snakeBody[0] = [snakeX, snakeY];

for (let i = 0; i < snakeBody.length; i++) {
    let htmlMarkup = `<div class = "head" style ="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

    if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
       gameOver = true;
    }
}

const initGame = () => {

    if(gameOver) return handleGameOver();

    // boshni harakatlantirish
    snakeX += velocityX;
    snakeY += velocityY;

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // devorga urilsa
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    // tanani oldinga surish
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // **tanaga urilishni tekshirish**
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // ovqat yesa — FAQAT o‘sadi (game over yo‘q!)
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([snakeX, snakeY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`
        highscoreElement.innerHTML = `High Score: ${highScore}`
    }

    // chizish
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }

    playBoard.innerHTML = htmlMarkup;
};


changeFoodPosition();
setIntervalId = setInterval(initGame, 125)
initGame();

document.addEventListener("keydown", changeDirection)

