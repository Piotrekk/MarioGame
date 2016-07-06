const MARIO_DATA = {
  Y: 400,
  jump: 30
}

class Mario extends RunLoop {

  constructor() {
    super();

    this.x = 500;
    this.y = 410;

    this.movement = null;

    this.jump_data = {
      canJump: true,
      isJumping: false,
      direction: 'up'
    };

    this.renderMario_data = {
      type: 'stand'
    };

    this.render();
    this.controlls();
  }

  render() {
    this.renderMarioType();
  }

  update() {
    if (this.jump_data.isJumping)
      this.processJump();

    this.changeRenderMarioType()
  }

  jump() {
    this.jump_data.jumpFrame = this.frames;
    this.jump_data.isJumping = true;
    this.jump_data.direction = 'up';
  }

  processJump() {
    if (this.frames === (this.jump_data.jumpFrame + 20) && this.jump_data.direction === 'up')
      this.jump_data.direction = 'down';
    else if (this.frames === (this.jump_data.jumpFrame + 39) && this.jump_data.direction === 'down') {
      this.jump_data.isJumping = false;
      this.jump_data.canJump = true;
      return false;
    }

    if (this.jump_data.direction === 'up')
      this.y -= 5;
    else if (this.jump_data.direction === 'down')
      this.y += 5;
  }

  renderMarioType() {
    const self = this;

    const marioImage = new Image();
    marioImage.src = `media/img/mario/mario-${this.renderMario_data.type}.png`;

    ctx.drawImage(marioImage, self.x, self.y, 60, 70);
  }

  changeRenderMarioType() {
    if (this.jump_data.isJumping)
      this.renderMario_data.type = 'jump';
    else if (this.movement)
      this.renderMario_data.type = 'step';
    else if (!this.jump_data.isJumping)
      this.renderMario_data.type = 'stand';
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
          self.movement = 'right';
          break;
      }
    });

    window.addEventListener('keypress', () => {
      let key = event.keyCode || event.charCode;

      if (key === 32)
        if (self.jump_data.canJump)
          self.jump_data.canJump = false,
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
          self.jump_data.canJump = false;
          break;
      }
    });
  }

}
