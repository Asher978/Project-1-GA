# Ping Pong

[screenshot]

## What is Ping Pong?

> Ping Pong is a fun multiplayer game inspired out of Table-Tennis. Players get to select their names at the beginning of the game. There are only three moving elements in the game. The two paddles and the ball. Each player has control of his/her respective pads. The pads only move on the Y-Axis (up and down). Ball can move in any direction. Goal is to hit the ball with the paddle if coming towards your direction. The player who misses the most hitable balls loses. 

## Technical Discussion

> #### Technoligies used in this game
  *  Javascript (Fontawesome, setIntervals, Jquery to manipulate DOM elements, EventListeners, Switch statements and LocalStorage)
  *  CSS (Sourcing external fonts, Key Frames Animations, Hover)

### Notes on Game Structure

*  Play area of the game is designed in a container with 3 elements (two paddles and the ball) appended in it. 
*  Event listeners are added to listen to certain keypresses for the paddle movements
*  Main logic of the game is being run in a setInterval function at 70 frames per 1000 miliseconds. This allows for smooth and precise moevements of the paddle as well as the ball. All the collision detection is nested under this function as well.
*  Scores are tracked and being displayed under the win condition function. LocalStorage is being used to store last played game's scores and are being displayed as well.
* Win conditions at this time is whoever scores 10 points wins the game.

## The Making of Ping Pong
I initially started with Spae Invaders which later turned to Ping Pong. I really wanted to learn the collision detection and the logic behind it. There is so much Physics/Math involved behind this. Through my initial research on collision, i knew it was going to be a challeneging yet interesting topic. At the pace which i was able to start the logic, my progression was too slow for the Space invaders to come to life by due date as there were too many moving parts and collisions happening. I choose ping pong as it gave me only 3 elements that i needed to track collision and they were all moving. There were two parts in this game that were very challening for me. (figure out how to make the ball go in different directions after every turn & figuring out exactly which function needs to be called at a certain time with a set time). All in all it was a great experience. I felt in a simple game like this i was still able to give it my personal touch.


## Opportunities for Future Growth

> If you had more time to work on your game, what would you do?
*  Add difficulty levels - where the ball moves faster after scoring certain points
*  Integration of AI player. Currently both players have to be human.
*  Use of media queries for different screen resolutions and for mobile. 
*  Re-Factor alot of my code. I felt alot of code could have been grouped better and put in functions.
