/* --------------------------------
  assigning all global variables
--------------------------------- */
var padHeight = 180;
var ballRadius = 20; // ball radius
var half_padHeight = padHeight / 2; // half of pad height
var speedPad1 = 0;
var speedPad2 = 0;
var topPosPad1 = 460; // left paddle
var topPosPad2 = 460; // right paddle
var topPosBall = 310;
var leftPosBall = 620;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;
var score1;
var score2;

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
    console.log('incorrect key')
    break;
  }
},false);

/* --------------------------------------------------------- 
Integrating a function for smooth movements of the paddle
---------------------------------------------------------- */
window.setInterval(function smoothMovement() {
  topPosPad1 += speedPad1;
  topPosPad2 += speedPad2;

  document.getElementById('paddle1').style.top = (topPosPad1) + 'px';
  document.getElementById('paddle2').style.top = (topPosPad2) + 'px';
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