const MARIO_DATA = {
  jump: 30
}

class Mario extends RunLoop {

  constructor() {
    super();

    this.x = 500;
    this.y = 400;

    this.movement = null;
    this.jumping = false;

    this.render();
    this.controlls();
  }

  render() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, 20, 20);
    ctx.save();
  }

  update() {
    if (this.jumping)
      this.processJump();
  }

  jump() {
    this.jumpFrame = this.frames;
    this.jumping = true;

  }

  processJump() {
    this.y -= 5;

    if (this.frames > this.jumpFrame + 5) {
      this.y += 5;
    }
  }

  getMoveDirection() {
    return this.movement;
  }

  controlls() {
    const self = this;

    window.addEventListener('keydown', () => {
      let key = event.keyCode || event.charCode;

      switch (key) {
        case 39:
          self.movement = 'left';
          break;
        case 37:
          self.movement = 'right'
          break;
      }
    });

    window.addEventListener('keypress', () => {
      let key = event.keyCode || event.charCode;

      if (key === 32)
        if (!self.isJumping)
          self.isJumping = true,
          self.jump();
    });

    window.addEventListener('keyup', () => {
      let key = event.keyCode || event.charCode;

      switch (key) {
        case 39:
          self.movement = null;
          break;
        case 37:
          self.movement = null;
          break;
        case 32:
          self.isJumping = false;
          break;
      }
    });
  }

}
