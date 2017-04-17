const collider = {
  moveableDiv: null,
  staticDivs: [],
  checkCollision: function() {
    console.log('checking');
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

class BaseDiv {
  constructor(position, ref) {
    this.position = position;
    this.ref = ref;
  }
}

class MoveDiv extends BaseDiv {
  constructor(position, ref) {
    super(position, ref);
  }
  shiftPosition(x, y) {
    this.position.left += x;
    this.position.top += y;
    this.reDraw();
  }
  reDraw() {
    this.ref.setAttribute('style', `left: ${this.position.left}px; top: ${this.position.top}px`);
    collider.checkCollision();
  }
}

function moveDiv(e) {
  switch(e.which) {
    case 37:
      collider.moveableDiv.shiftPosition(-5, 0);
      break;
    case 38:
      collider.moveableDiv.shiftPosition(0, -5);
      break;
    case 39:
      collider.moveableDiv.shiftPosition(5, 0);
      break;
    case 40:
      collider.moveableDiv.shiftPosition(0, 5);
      break;
    default:
      console.log('not an arrow');
      break;
  }
}

function positionCreator(currentDiv) {
  return {
    left: currentDiv.getBoundingClientRect().left,
    top: currentDiv.getBoundingClientRect().top,
    height: currentDiv.getBoundingClientRect().height,
    width: currentDiv.getBoundingClientRect().width
  };
}


document.addEventListener('DOMContentLoaded', function() {
  const allTheDivs = document.querySelectorAll('.collideme');
  for (let i = 0; i < allTheDivs.length; i++) {
    const currentDiv = allTheDivs[i];
    if (currentDiv.dataset.dynamic === 'true') {
      currentDiv.setAttribute('style', 'left: 500px; top: 300px;');
      const moveableDiv = new MoveDiv(positionCreator(currentDiv), currentDiv);
      collider.moveableDiv = moveableDiv;
    } else {
      currentDiv.setAttribute('style', `left: ${Math.floor(Math.random() * 200)}px; top: ${Math.floor(Math.random() * 500)}px;`);
      const staticDiv = new BaseDiv(positionCreator(currentDiv), currentDiv);
      collider.staticDivs.push(staticDiv);
    }
  }
  document.addEventListener('keydown', (e) => moveDiv(e));
});