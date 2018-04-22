class Mario extends RunLoop {

  constructor() {
    super();

    this.x = MARIO_DATA.x;
    this.y = MARIO_DATA.y;

    this.movement = null;

    this.jump_data = {
      isJumping: false,
    };

    this.renderMario_data = {
      type: 'stand'
    };

    const collision = new Collision();
    this.marioXCollisionMap = collision.getMarioGroundCollision();

    this.bullets = [];

    this.render();

    PubSub.Subscribe('mario.move.left', () => { this.movement = 'left'; });
    PubSub.Subscribe('mario.move.right', () => { this.movement = 'right'; });
    PubSub.Subscribe('mario.jump.do', () => { if (!this.jump_data.isJumping) this.jump(); });
    PubSub.Subscribe('mario.bullet.new', () => this.newBullet());
  }

  render() {
    this.renderMarioType();

    if (this.bullets.length) _.each(this.bullets, (bullet) => bullet.render());
  }

  update() {
    this.changeRenderMarioType();
    this.processJump();

    if (this.bullets.length) {
      _.each(this.bullets, (bullet) => {
        bullet.update(this.movement);
        //console.log(Layout.layoutVelocity);
        //if (bullet.x > GameEngine.currentLevel.width) {
          console.log(bullet.x);
        //}
      });
    }
  }

  jump() {
    this.jump_data.isJumping = true;
    this.jump_data.grow = true;
  }

  processJump() {
    if (this.jump_data.isJumping) {
      if (this.jump_data.grow) this.y -= 5;
      else this.y += 5;

      if (this.y <= 250) this.jump_data.grow = false;
      if (!this.jump_data.grow && this.y >= 410) this.jump_data.isJumping = false;
    }
  }

  renderMarioType() {
    const self = this;

    const marioImage = new Image();
    marioImage.src = `media/img/mario2/mario2-${this.renderMario_data.type}.png`;

    ctx.drawImage(marioImage, self.x, self.y, MARIO_DATA.width, MARIO_DATA.height);
  }

  changeRenderMarioType() {
    this.renderMario_data.type = this.jump_data.isJumping ? 'jump' : 'stand';
  }

  getMoveDirection() {
    return this.movement;
  }

  newBullet() {
    this.bullets.push(new Bullet(this.x, this.y));
  }

}
