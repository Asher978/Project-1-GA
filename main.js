/* --------------------------------
  assigning all global variables
--------------------------------- */
let padHeight = 180;
let ballRadius = 20; // ball radius
let half_padHeight = padHeight / 2; // half of pad height
let padWidth = 20;
let speedPad1 = 0;
let speedPad2 = 0;
let topPosPad1 = 460; // left paddle (y-axis)
let topPosPad2 = 460; // right paddle (y-axis)
let topPosBall = 310; // y-axis of the ball
let leftPosBall = 620; // x-axis of the ball
let rightPosPad2 = 1400;
let topSpeedOfBall = 0;
let leftSpeedOfBall = 0;
let score1=0;
let score2=0;
let sound = new Audio("ball.mp3"); 

/*----------------------------------------------------------
Creating the game components and appending them to the BODY
----------------------------------------------------------*/
const $container = $('<div id="container">').appendTo('body');
const $leftPaddle = $('<div id="paddle1">').appendTo($container);
const $rightPaddle = $('<div id="paddle2">').appendTo($container);
const $ball = $('<div id="ball">').appendTo($container);
const $score1 = $('<h1 id="score1">').appendTo($container);
const $score2 = $('<h1 id="score2">').appendTo($container);
const $sign1 = $('<p id="sign1">').appendTo($container);
const $sign2 = $('<p id="sign2">').appendTo($container);
const $tumUp = $('<i class="fa fa-thumbs-up fa-5x" aria-hidden="true"></i>');
const $tumDown = $('<i class="fa fa-thumbs-down fa-5x" aria-hidden="true"></i>');
const $scoreDisplay = $('<h2 id="highScore">').appendTo($container);

$('#score1').css({color : 'white', left: '550px', position: 'absolute'});
$('#score2').css({color : 'white', right: '500px', position: 'absolute'});
let player1 = prompt('Player 1: Please enter your Name!');
let player2 = prompt('Player 2: Please enter your Name!');
$('<button id="start" onClick="ballMove()">').text('START').css({position: 'absolute'}).appendTo($container)
$('<button id="reset" onClick="clearGif()">').text('CLEAR').css({position: 'absolute',}).appendTo($container)
$('<p id="directions">').text('Press "CLEAR" to reset scores and begin a new game').css({position: 'absolute', bottom: '-40px'}).appendTo($container)
$('<p id="directions">').text('Press "START" to spawn the ball').css({position: 'absolute', bottom: '-60px'}).appendTo($container)

/* --------------------------------------------------------------------------
 assigning eventlisteners to the paddles to detect movement by key presses
--------------------------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  switch(e.which) {
    case 81:
    topPosPad1 -= 10;
    speedPad1 = -10;
    $('#paddle1').css({'top' : topPosPad1 + 'px'});
    break;
    case 65:
    topPosPad1 += 10;
    speedPad1 = 10;
    $('#paddle1').css({'top' : topPosPad1 + 'px'});
    break;
    case 38:
    topPosPad2 -= 10;
    speedPad2 = -10;
    $('#paddle2').css({'top' : topPosPad2 + 'px'});
    break;
    case 40:
    topPosPad2 += 10;
    speedPad2 = 10;
    $('#paddle2').css({'top' : topPosPad2 + 'px'});
    break;
    default:
    // console.log('incorrect key');
    break;
  }
},false);

/*----------------------------------------------------
Ball movement and change of direction after every turn
-----------------------------------------------------*/
let ballMove = () => {
  topPosBall = 310;
  leftPosBall = 620;
  if (Math.random() < 0.5)  {
    var x = 1;
  } else {
    var x = -1;
  }
  topSpeedOfBall = Math.random() * 7+8;  //TODO: change the values to add difficulty levels
  leftSpeedOfBall = x * (Math.random() * 7+8);
  // console.log(topSpeedOfBall);
  // console.log(leftSpeedOfBall);
};

/* ---------------------
Clearing the wining GIF
-----------------------*/
let clearGif = () => {
  $('#win').remove();
  score1=0;
  score2=0;
}



/*--------------------------------------------------------------------------------
created the win conditions and integrated localStorage to store's last game scores
---------------------------------------------------------------------------------*/
let checkWin = () => {
  let winScore = 3;
  if (score1===winScore) {
    localStorage.setItem('highScore1', score1);
    const currentHighScore1 = localStorage.getItem('highScore1');
    localStorage.setItem('lowScore1', score2);
    const currentLowScore1 = localStorage.getItem('lowScore1');
    $('#highScore').text(`Last Game's Score: ${player1}:${currentHighScore1}  ||  ${player2}:${currentLowScore1}`);
    alert(player1 + '  won the game');
    const $winDiv = $('<video id="win" autoplay loop>').appendTo($container)
    const $source = $('<source src="giphy.mp4" type="video/mp4">').appendTo($winDiv);
    const $source2 = $('<source src="giphy.webm" type="video/webm">').appendTo($winDiv);
    score1 = 0;
    score2 = 0;
   }

  if (score2===winScore) {
    localStorage.setItem('highScore2', score2);
    const currentHighScore2 = localStorage.getItem('highScore2');
    localStorage.setItem('lowScore2', score1);
    const currentLowScore2 = localStorage.getItem('lowScore2');
    $('#highScore').text(`Last Game's Score: ${player2}:${currentHighScore2}  ||  ${player1}:${currentLowScore2}`);
    alert(player2 + ' won the game');
    const $winDiv = $('<video id="win" autoplay loop>').appendTo($container)
    const $source = $('<source src="./images/giphy.mp4" type="video/mp4">').appendTo($winDiv);
    const $source2 = $('<source src="./images/giphy.webm" type="video/webm">').appendTo($winDiv);
    score2 = 0;
    score1 = 0;

  } 
}
/* --------------------------------------------------------------------------------------------- 
Integrating a function for smooth movements of the paddle
and stopping the paddle to go out of the container

The following source was used as refernce to compile some of the collision detections 
of the ball and the paddle: 
"http://learning-computer-programming.blogspot.com/2009/09/simple-pong-game-using-javascript.html"
 // COLLISION DETECTION

   // If ball hits upper or lower wall
   if(ballY < 0 || ((ballY + ball.offsetHeight) > box.offsetHeight))
      dy = -dy; // Make x direction opposite

   // If ball hits player paddle
   if(ballX < (paddle1.offsetLeft + paddle1.offsetWidth))
      if(((ballY + ball.offsetHeight) > playerY) && ballY < (playerY + paddle1.offsetHeight))
         dx = -dx;

   // If ball hits CPU paddle
   if((ballX + ball.offsetWidth) > paddle2.offsetLeft)
      if(((ballY + ball.offsetHeight) > cpuY) && ballY < (cpuY + paddle2.offsetHeight))
         dx = -dx;
---------------------------------------------------------------------------------------------- */
window.setInterval(function smoothMovement() {
  let wind_height = ((window.innerHeight * 90) / 100); //<---container's height is 90vh
  let wind_width = window.innerWidth; // Referenced from here: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
  topPosPad1 += speedPad1;
  topPosPad2 += speedPad2;
  topPosBall += topSpeedOfBall;
  leftPosBall += leftSpeedOfBall;
  $('#paddle1').css({'top' : topPosPad1 + 'px'});
  $('#paddle2').css({'top' : topPosPad2 + 'px'});
  $('#ball').css({'top' : topPosBall + 'px'});
  $('#ball').css({'left' : leftPosBall + 'px'});
  $('#score1').text(player1+ ": " + score1.toString()); 
  $('#score2').text(player2 + ": " + score2.toString());
  
  (topPosPad1 < 1) ? (topPosPad1=1) : false; // Pad 1 restruction (top)
  (topPosPad2 < 1) ? (topPosPad2=1) : false; // Pad 2 restriction (top)
  (topPosPad1 >= (wind_height-padHeight)) ? (topPosPad1=wind_height-padHeight) : false; // Pad 1 restr(bttm)
  (topPosPad2 >= (wind_height-padHeight)) ? (topPosPad2=wind_height-padHeight) : false; // Pad 2 restr(bttm)

  // console.log($score1);

  /*-----------------------------------------
  ball collision with the top & bottom walls
  ------------------------------------------*/ 
  (topPosBall <= 1 || topPosBall >= wind_height-ballRadius) ? (topSpeedOfBall = -topSpeedOfBall) : false;
  
  /*-----------------------------------
  ball collision with the left  paddle
  ------------------------------------*/
  let bttmPosPad1 = topPosPad1 + padHeight;
  if (leftPosBall <= padWidth)  {
    if(topPosBall >= topPosPad1 && topPosBall < bttmPosPad1) {
      leftSpeedOfBall = -leftSpeedOfBall;
      sound.play()
    } else {
      score2++;
      $('#sign2').addClass('fa fa-thumbs-up fa-5x');
      $('#sign1').addClass('fa fa-thumbs-down fa-5x');
      setTimeout(function () {
        checkWin()
      }, 500); 
      ballMove();
      topSpeedOfBall=0;
      leftSpeedOfBall=0;
      setTimeout(function () {
        $('#sign2').removeClass('fa fa-thumbs-up fa-5x')
        $('#sign1').removeClass('fa fa-thumbs-down fa-5x')
      }, 2000);
    }
  }

  /*-----------------------------------
  ball collision with the right  paddle
  ------------------------------------*/
  let bttmPosPad2 = topPosPad2+padHeight;
  if ((leftPosBall+40) >= (wind_width - ballRadius - padWidth)) {
    console.log('collision')
    if (topPosBall > topPosPad2 && topPosBall < bttmPosPad2) {
      leftSpeedOfBall = -leftSpeedOfBall;
      sound.play();
    } else {
      score1++;
      $('#sign1').addClass('fa fa-thumbs-up fa-5x');
      $('#sign2').addClass('fa fa-thumbs-down fa-5x');
      setTimeout(function () {
        checkWin()
      }, 500);
      ballMove();
      topSpeedOfBall=0;
      leftSpeedOfBall=0;
      setTimeout(function () {
        $('#sign1').removeClass('fa fa-thumbs-up fa-5x')
        $('#sign2').removeClass('fa fa-thumbs-down fa-5x')
      }, 2000);
    }
  } 
}, 1000/70);


/*------------------------------------------------------------------------------
Integrating event listener on keyUP to stop the paddles when the key is unpressed
-------------------------------------------------------------------------------*/
document.addEventListener('keyup', (e) => {
  switch(e.which) {
    case 81:
    speedPad1 = 0;
    break;
    case 65:
    speedPad1 = 0;
    break;
    case 38:
    speedPad2 = 0;
    break;
    case 40:
    speedPad2 =0;
    break;
  }
}, false)



