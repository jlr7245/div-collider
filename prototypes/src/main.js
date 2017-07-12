//////////// COLLISION ALGO FROM MDN
/* 
if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {

}
*/


const collider = {
  moveableDiv: null,
  staticDivs: [],
  checkCollision: function() {
    let hasJustCollided = false;
    for (let i = 0; i < this.staticDivs.length; i++) {
      const currentDiv = this.staticDivs[i];
      if (currentDiv.position.left < this.moveableDiv.position.left + this.moveableDiv.position.width &&
          currentDiv.position.left + currentDiv.position.width > this.moveableDiv.position.left &&
          currentDiv.position.top < this.moveableDiv.position.top + this.moveableDiv.position.height &&
          currentDiv.position.height + currentDiv.position.top > this.moveableDiv.position.top) {
        hasJustCollided = true;
        if (!this.moveableDiv.ref.classList.contains('collision-state')) {
          this.moveableDiv.ref.classList.add('collision-state');
        }
      } else if (this.moveableDiv.ref.classList.contains('collision-state') && !hasJustCollided) {
          this.moveableDiv.ref.classList.remove('collision-state');
        }
    }
  },
};


const BaseDiv = function(div) {
  this.position = {
    left: div.getBoundingClientRect().left,
    top: div.getBoundingClientRect().top,
    height: div.getBoundingClientRect().height,
    width: div.getBoundingClientRect().width,
  };
}


const MoveDiv = function(ref) {
  this.ref = ref;
  BaseDiv.call(this, ref);
}


MoveDiv.prototype.moveOnKeyPress = function(e) {
  switch(e.which) {
    case 37:
      this.shiftPosition(-5, 0);
      break;
    case 38:
      this.shiftPosition(0, -5);
      break;
    case 39:
      this.shiftPosition(5, 0);
      break;
    case 40:
      this.shiftPosition(0, 5);
      break;
    default:
      console.log('not an arrow');
      break;
  }
}

MoveDiv.prototype.shiftPosition = function(x, y) {
  this.position.left += x;
  this.position.top += y;
  this.reDraw();
}

MoveDiv.prototype.reDraw = function() {
  this.ref.setAttribute('style', `left: ${this.position.left}px; top: ${this.position.top}px`);
  collider.checkCollision();
}




document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.container');

  for (let i = 0; i < 100; i++) {
    const newStaticDiv = document.createElement('div');
    newStaticDiv.setAttribute('style', `left: ${Math.floor(Math.random() * 400)}px; top: ${Math.floor(Math.random() * 600)}px;`);
    container.appendChild(newStaticDiv);
    newStaticDiv.classList.add('collideme');
    collider.staticDivs.push(new BaseDiv(newStaticDiv));
  }
  
  const newMoveableDiv = document.createElement('div');
  newMoveableDiv.setAttribute('style', 'left: 500px; top: 500px;');
  newMoveableDiv.setAttribute('id', 'divtwo');
  newMoveableDiv.classList.add('collideme');
  container.appendChild(newMoveableDiv);
  collider.moveableDiv = new MoveDiv(newMoveableDiv);

  document.addEventListener('keydown', (e) => collider.moveableDiv.moveOnKeyPress(e));
})