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

$('#score1').css({color : 'white', left: '550px', position: 'absolute'});
$('#score2').css({color : 'white', right: '500px', position: 'absolute'});
let player1 = prompt('Player 1: Please enter your Name!');
let player2 = prompt('Player 2: Please enter your Name!');
$('<button id="start" onClick="ballMove();clearGif()">').text('START').css({position: 'absolute', bottom: '-30px', left: '45vw', width: '50px'}).appendTo($container)


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
    console.log('incorrect key');
    break;
  }
},false);


let ballMove = () => {
  
  topPosBall = 310;
  leftPosBall = 620;
  if (Math.random() < 0.5)  {
    var x = 1;
  } else {
    var x = -1;
  }
  topSpeedOfBall = Math.random() * 6+7;  //TODO: change the values to add difficulty levels
  leftSpeedOfBall = x * (Math.random() * 6+7);
  // console.log(topSpeedOfBall);
  // console.log(leftSpeedOfBall);
};

let clearGif = () => {
  $('#win').remove();
}

let checkWin = () => {
  let winScore = 3;
  if (score1===winScore) {
    alert(player1 + ' You have won the game');
    const $winDiv = $('<video id="win" autoplay loop>').appendTo($container)
    const $source = $('<source src="giphy.mp4" type="video/mp4">').appendTo($winDiv);
    const $source2 = $('<source src="giphy.webm" type="video/webm">').appendTo($winDiv);
    score1 = 0;
    score2 = 0;
  }
  // $('#win').remove();
  // prompt('Would you like to play again?')

  if (score2===winScore) {
    alert(player2 + ' You have won the game');
    const $winDiv = $('<video id="win" autoplay loop>').appendTo($container)
    const $source = $('<source src="giphy.mp4" type="video/mp4">').appendTo($winDiv);
    const $source2 = $('<source src="giphy.webm" type="video/webm">').appendTo($winDiv);
    score2 = 0;
    score1 = 0;
  } 
  // $('#win').remove();
  // prompt('Would you like to play again?')
}
// window.setInterval(ballMove (), 1000/200);



/* --------------------------------------------------------- 
Integrating a function for smooth movements of the paddle
and stopping the paddle to go out of the container
---------------------------------------------------------- */
window.setInterval(function smoothMovement() {
  let wind_height = ((window.innerHeight * 90) / 100); //<---container's height is 90vh
  let wind_width = window.innerWidth;
  topPosPad1 += speedPad1;
  topPosPad2 += speedPad2;
  topPosBall += topSpeedOfBall;
  leftPosBall += leftSpeedOfBall;
  // score1 = 0;
  $('#paddle1').css({'top' : topPosPad1 + 'px'});
  $('#paddle2').css({'top' : topPosPad2 + 'px'});
  $('#ball').css({'top' : topPosBall + 'px'});
  $('#ball').css({'left' : leftPosBall + 'px'});
  (topPosPad1 <= 1) ? (topPosPad1=1) : false; // Pad 1 restruction (top)
  (topPosPad2 <= 1) ? (topPosPad2=1) : false; // Pad 2 restriction (top)
  (topPosPad1 >= (wind_height-padHeight)) ? (topPosPad1=wind_height-padHeight) : false; // Pad 1 restr(bttm)
  (topPosPad2 >= (wind_height-padHeight)) ? (topPosPad2=wind_height-padHeight) : false; // Pad 2 restr(bttm)

  /*-----------------------------------------
  ball collision with the top & bottom paddle
  ------------------------------------------*/ 
  if (topPosBall <= 1 || topPosBall >= wind_height-ballRadius) {
    topSpeedOfBall = -topSpeedOfBall;
    // sound.play(); 
  }
  /*-----------------------------------
  ball collision with the left  paddle
  ------------------------------------*/
  if (leftPosBall <= padWidth)  {
    if(topPosBall > topPosPad1 && topPosBall < topPosPad1 + padHeight) {
      leftSpeedOfBall = -leftSpeedOfBall;
      sound.play()
    } else {
      score2++;
      checkWin()
      ballMove();
      topSpeedOfBall=0;
      leftSpeedOfBall=0;
      // $('#win').remove();

    }
  }
  /*-----------------------------------
  ball collision with the right  paddle
  ------------------------------------*/
  if ((leftPosBall+40) >= (wind_width - ballRadius - padWidth)) {
    console.log('collision')
    if (topPosBall > topPosPad2 && topPosBall < topPosPad2 + padHeight) {
      leftSpeedOfBall = -leftSpeedOfBall;
      sound.play();
    } else {
      score1++;
      checkWin()
      ballMove();
      topSpeedOfBall=0;
      leftSpeedOfBall=0;
      // $('#win').remove();
      
    }
  } 
  $('#score1').text(player1+ ": " + score1.toString());
  $('#score2').text(player2 + ": " + score2.toString());
}, 1000/70);

/*------------------------------------------------------------------
Integrating a function to stop the paddles when the key is unpressed
------------------------------------------------------------------*/
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



