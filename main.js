/* --------------------------------
  assigning all global variables
--------------------------------- */
let padHeight = 180;
let ballRadius = 20; // ball radius
let half_padHeight = padHeight / 2; // half of pad height
let padWidth = 20;
let speedPad1 = 0;
let speedPad2 = 0;
let topPosPad1 = 460; // left paddle
let topPosPad2 = 460; // right paddle
let topPosBall = 310;
let leftPosBall = 620;
let topSpeedOfBall = 0;
let leftSpeedOfBall = 0;
let score1;
let score2;

/*----------------------------------------------------------
Creating the game components and appending them to the BODY
----------------------------------------------------------*/
const $container = $('<div id="container">').appendTo('body');
const $leftPaddle = $('<div id="paddle1">').appendTo($container);
const $rightPaddle = $('<div id="paddle2">').appendTo($container);
const $ball = $('<div id="ball">').appendTo($container);

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

/* --------------------------------------------------------- 
Integrating a function for smooth movements of the paddle
and stopping the paddle to go out of the container
---------------------------------------------------------- */
window.setInterval(function smoothMovement() {
  let wind_height = ((window.innerHeight * 90) / 100); //<---container's height is 90vh
  topPosPad1 += speedPad1;
  topPosPad2 += speedPad2;
  topPosBall += topSpeedOfBall;
  leftPosBall += leftSpeedOfBall;
  (topPosPad1 <= 1) ? (topPosPad1=1) : false; // Pad 1 restruction (top)
  (topPosPad2 <= 1) ? (topPosPad2=1) : false; // Pad 2 restriction (top)
  (topPosPad1 >= (wind_height-padHeight)) ? (topPosPad1=wind_height-padHeight) : false; // Pad 1 restr(bttm)
  (topPosPad2 >= (wind_height-padHeight)) ? (topPosPad2=wind_height-padHeight) : false; // Pad 2 restr(bttm)
  // ball collision with top and bottom
  (topPosBall <= 1 || topPosBall >= wind_height-ballRadius) ? (topSpeedOfBall = -topSpeedOfBall) : false; 
  // ball collision with left and right paddles
  if (leftPosBall <= padWidth)  {
    if(topPosBall > topPosPad1 && topPosBall < topPosPad1 + padHeight) {
      leftSpeedOfBall = -leftSpeedOfBall;
    } else {
      ballMove();
    }
  }
  


  $('#paddle1').css({'top' : topPosPad1 + 'px'});
  $('#paddle2').css({'top' : topPosPad2 + 'px'});
  $('#ball').css({'top' : topPosBall + 'px'});
  $('#ball').css({'left' : leftPosBall + 'px'});

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


let ballMove = () => {
  topPosBall = 310;
  leftPosBall = 620;
  if (Math.random() < 0.5)  {
    var x = 1;
  } else {
    var x = -1;
  }
  topSpeedOfBall = Math.random() * 2 + 3;
  leftSpeedOfBall = x * (Math.random() * 2 * 3);
};