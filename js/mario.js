const MARIO_DATA = {
  width: 60,
  height: 70,
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
      direction: 'up',
      jumpVelocity: 7,
      jumpTopFrame: 24,
      jumpDownFrame: () => { return (this.jump_data.jumpTopFrame * 2) - 1 }
    };

    this.renderMario_data = {
      type: 'stand'
    };

    this.render();

    PubSub.Subscribe('mario.move.left', () => { this.movement = 'left'; });
    PubSub.Subscribe('mario.move.right', () => { this.movement = 'right'; });
    PubSub.Subscribe('mario.move.none', () => { this.movement = null; });
    PubSub.Subscribe('mario.jump', () => {
      if (this.jump_data.canJump)
        this.jump_data.canJump = false,
        this.jump();
    });
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
    if (this.frames === (this.jump_data.jumpFrame + this.jump_data.jumpTopFrame) && this.jump_data.direction === 'up')
      this.jump_data.direction = 'down';
    else if (this.frames === (this.jump_data.jumpFrame + (this.jump_data.jumpTopFrame * 2) - 1) && this.jump_data.direction === 'down') {
      this.jump_data.isJumping = false;
      this.jump_data.canJump = true;
      return false;
    }

    if (this.jump_data.direction === 'up')
      this.y -= this.jump_data.jumpVelocity;
    else if (this.jump_data.direction === 'down')
      this.y += this.jump_data.jumpVelocity;
  }

  renderMarioType() {
    const self = this;

    const marioImage = new Image();
    marioImage.src = `media/img/mario2/mario2-${this.renderMario_data.type}.png`;

    ctx.drawImage(marioImage, self.x, self.y, MARIO_DATA.width, MARIO_DATA.height);
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
    if (this.movement) this.processCollision();
    return this.movement;
  }

  processCollision() {
    this.y + 100;
  }

}
