//////////// COLLISION ALGO FROM MDN
/* 
if (rectFirst.x < this.x + this.width &&
   rectFirst.x + rectFirst.width > this.x &&
   rectFirst.y < this.y + this.height &&
   rectFirst.height + rectFirst.y > this.y) {

}
*/



//////////// PLANNING
/*
- event listener for arrow keys (should only move one div)
- something that grabs the divs on the page
- some kind of objects that describes the divs
- something that takes the current position of the div and puts it into the div's object when the event happens
- something that moves the divs on the page
*/


///////////// CODE
/*
=========>>>>> NOTE: I think this is the right way to go about this --
        >>>>>> especially if I have one class for moveable & one for static --
        >>>>>> but for now it's too much setup when i'm just trying to test
        >>>>>> some kind of collision logic.
class MoveableDiv {
  constructor(element) {

  }

  shiftPosition(x, y) {
    console.log(x, y);
  }
}*/

const rectFirst = {
  x: null,
  y: null,
  height: null,
  width: null,
  static: true,
};

const rectSecond = {
  x: null,
  y: null,
  height: null,
  width: null,
  static: false,
  shiftPosition: function(x, y) {
    this.x += x;
    this.y += y;
    this.reDraw();
  },
  reDraw: function() {
    const divTwo = document.querySelector('#divtwo');
    divTwo.setAttribute('style', `left: ${this.y}px; top: ${this.x}px`);
    this.checkCollision();
  },
  checkCollision: function() {
    if (rectFirst.x < this.x + this.width &&
      rectFirst.x + rectFirst.width > this.x &&
      rectFirst.y < this.y + this.height &&
      rectFirst.height + rectFirst.y > this.y) {
        // const divTwo = document.querySelector('#divtwo');
        // need to add a different class instead of resetting the style attribute --
        // resetting the style attribute takes away the height/width that the redraw function adds
        // divTwo.setAttribute('style', 'background-color: blue');
        console.log('collision!');
    }
  },
};

function moveDiv(e) {
  switch(e.which) {
    case 37:
      rectSecond.shiftPosition(0, -5);
      break;
    case 38:
      rectSecond.shiftPosition(-5, 0);
      break;
    case 39:
      rectSecond.shiftPosition(0, 5);
      break;
    case 40:
      rectSecond.shiftPosition(5, 0);
      break;
    default:
      console.log('not an arrow');
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const divOne = document.querySelector('#divone');
  rectFirst.height = divOne.clientHeight; /// this should go into some kind of constructor function
  rectFirst.width = divOne.clientWidth;
  rectFirst.x = divOne.clientTop;
  rectFirst.y = divOne.clientLeft;
  const divTwo = document.querySelector('#divtwo');
  rectSecond.height = divTwo.clientHeight; /// this should go into some kind of constructor function
  rectSecond.width = divTwo.clientWidth;
  rectSecond.x = divTwo.clientTop;
  rectSecond.y = divTwo.clientLeft;
  document.addEventListener('keydown', (e) => moveDiv(e));
});


/////////////// REFACTOR NOTES

/*

i'm imagining, what happens if you have a bunch of divs maybe dynamically
created or otherwise generated by user interaction. i think it would make
sense to have two classes, one for static divs & one for dynamic. marked 
by data attributes on initial page load or perhaps given an array of
coordinates static divs are created on the page.

in that case you would loop through the divs grabbed with querySelectorAll
and check the data-attribute --- data-change: static or data-change: dynamic
-- and the ones with data-change: static would be fed to the static class while
the dynamic ones would be fed to the dynamic class. probably there would be more
static divs than dynamic ones.

so then in that case the static divs would be pushed into an array in the game state
which in turn would be looped through when checking the collision. so the algo
would end up going something like: 

function checkDivs() {
  for (let i = 0; i < gameState.static.length; i++) {
    const currentlyChecking = gameState.static[i];
    if (currentlyChecking.x < this.x + this.width &&
      currentlyChecking.x + currentlyChecking.width > this.x &&
      currentlyChecking.y < this.y + this.height &&
      currentlyChecking.height + currentlyChecking.y > this.y) {
      //collision
      collideState();
      return;
    }
  }
}

...... or whatever ends up making the most sense.

*/

