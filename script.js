let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let reset = document.getElementById('reset');


const CANVAS_WIDTH = canvas.width = 1024;
const CANVAS_HEIGHT = canvas.height = 768;

let spriteWidth = 207;
let spriteHeight = 205;

let ravenPosX = 50;
let ravenPosY = 100;

let cheeses = [];
let fireBalls = [];

let score = 0;

let ravenFrameX = 0;
let ravenFrameY = 0;
let fireBallFrameX = 0;
let fireBallFrameY = 0;
let gameFrame = 0;
const staggerFrames = 5;

let gameSpeed = 1;

let forest = new Image();
let raven = new Image();
let fireBall = new Image();
let explosion = new Image();
let cheese = new Image();
let gameOver = new Image();
let fox = new Image();

forest.src = "images/bg.png"
raven.src = "images/raven.png"
fireBall.src = "images/fireball2.png"
explosion.src = "images/explosion.png"
cheese.src = "images/cheese1.png"
gameOver.src = "images/GameOver.png"
fox.src = "images/fox.png"


const sadCaar = new Audio;
const caar = new Audio;
const moveSound = new Audio;
sadCaar.src = 'sounds/raven.mp3';
caar.src = 'sounds/raven3.wav';
moveSound.src = 'sounds/move2.wav'

let x = 0;
let x2 = 1024;

document.addEventListener("keydown", (e) => {
    
    switch (e.keyCode) {
        case 38:
            ravenPosY -= 30;
            moveSound.play()
            break;
        case 40:
            ravenPosY += 30;
            moveSound.play()
            break;
        case 39:
            ravenPosX += 30;
            moveSound.play()
            break;
        case 37:
            ravenPosX -= 30;
            moveSound.play()
            break;
        case 32:
            ravenPosY -= 30;
            moveSound.play()
            break;
        default:
            break;
    }
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }

cheeses[0] = {
    x: CANVAS_WIDTH + 20,
    y: getRandomInt(0, CANVAS_HEIGHT-200),
}

fireBalls[0] = {
    x: CANVAS_WIDTH + 40,
    y: getRandomInt(0, CANVAS_HEIGHT-200),
}
function animateBG () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.drawImage(forest, x, 0, 1024,CANVAS_HEIGHT);
    ctx.drawImage(forest, x2, 0, 1024,CANVAS_HEIGHT);
       
    if (x < -1020) {
        x = 1024 - gameSpeed
    } else {
        x -= gameSpeed
    }
    if (x2 < -1020) {
        x2 = 1024 - gameSpeed
    } else {
        x2 -= gameSpeed
    }

//////////////////////////////// массив сыров

for (let i = 0; i < cheeses.length; i++) {
    ctx.drawImage(cheese, cheeses[i].x, cheeses[i].y)
    cheeses[i].x-=2
    if (cheeses[i].x === CANVAS_WIDTH) {
        cheeses.push ({
            x: CANVAS_WIDTH + 500,
            y: getRandomInt(0, CANVAS_HEIGHT-200),
        });
    
    }
    
    if (ravenPosX + spriteWidth - 50 >= cheeses[i].x && 
        ravenPosX <= cheeses[i].x + 70 &&
        ravenPosY + spriteHeight - 50 >= cheeses[i].y &&
        ravenPosY <= cheeses[i].y + 70) {
            cheeses[i].y = -150;
            caar.play()
            score ++
            console.log(score)
    };   
}


function fireBallMovie() {                  //функция для анимирования фаерболов
    if (gameFrame % staggerFrames == 0) {
        if (fireBallFrameX < 3) {
            fireBallFrameX++
        } else {
            fireBallFrameX = 0  
        }}      
}

/////////////////массив фаерболов

for (let i = 0; i < fireBalls.length; i++) {
    ctx.drawImage(fireBall, 
        fireBallFrameX * 580, fireBallFrameY * 160, //размер видимой части
        580, 160, 
        fireBalls[i].x, fireBalls[i].y, 
        290, 80)
              
        fireBalls[i].x-= 4
        
    if (fireBalls[i].x === CANVAS_WIDTH) {
        fireBalls.push ({
            x: CANVAS_WIDTH + 680,
            y: getRandomInt(0, CANVAS_HEIGHT-200),
        });
        };  
        if (ravenPosX + spriteWidth - 50 >= fireBalls[i].x && 
            ravenPosX <= fireBalls[i].x + 290 &&
            ravenPosY + spriteHeight - 50 >= fireBalls[i].y &&
            ravenPosY <= fireBalls[i].y + 50) {
                // ravenPosY = -5;
                // // ravenPosX = -5
                sadCaar.play()
                score --
                console.log(score)
                ravenPosX -=50
                ravenPosY -=50
                fireBalls[i].y = -200
        };   


}

fireBallMovie()

ctx.drawImage(raven, 
        ravenFrameX * spriteWidth, 
        ravenFrameY * spriteHeight,
         spriteWidth, spriteHeight, ravenPosX, ravenPosY, spriteWidth, spriteHeight)
        if (gameFrame % staggerFrames == 0) {
            
         if (ravenFrameX < 8) {
            ravenFrameX++
         } else {
            ravenFrameX = 0
         }
        } 
    gameFrame++;
    ctx.font = "48px serif";
    ctx.fillStyle = 'yellow';
    if (score >= 0) {
        let textScore = ctx.fillText(`Score: ${score}`, 40, CANVAS_HEIGHT-20);
    }
    let id = requestAnimationFrame(animateBG);
    
    
    if (score < 0) {
        ctx.drawImage(gameOver, CANVAS_WIDTH/2-300, CANVAS_HEIGHT/2-150)
        cancelAnimationFrame(id);
        reset.style.visibility = 'visible';
        
    }
    ctx.drawImage(fox, CANVAS_WIDTH-220, CANVAS_HEIGHT-150)
    

   

// проверка вылета вороны за канвас


    if (ravenPosX < 0) {
        ravenPosX = 0
    };
    if (ravenPosX + spriteWidth > CANVAS_WIDTH) {
        ravenPosX = CANVAS_WIDTH - spriteWidth
    };
    if (ravenPosY < 0) {
        ravenPosY = 0
    };
    if (ravenPosY + spriteHeight > CANVAS_HEIGHT) {
        ravenPosY = CANVAS_HEIGHT - spriteHeight
    };
    
    
}
animateBG();

reset.onclick = function() {
    reset.style.visibility = 'hidden';
    score = 0;
    ravenPosX = 50;
    ravenPosY = 100;
    x = 0;
    x2 = 1024;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    animateBG();
};
