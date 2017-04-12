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
        const divTwo = document.querySelector('#divtwo');
        divTwo.setAttribute('style', 'background-color: blue');
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
  const rectOne = document.querySelector('#divone');
  console.log(rectOne);
  document.addEventListener('keydown', (e) => moveDiv(e));
});