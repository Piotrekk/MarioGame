class Bullet {

  constructor(marioX, marioY) {
    this.x = marioX + MARIO_DATA.width;
    this.y = marioY + (MARIO_DATA.height / 2);
  }

  render() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, LAYOUT_DATA.bullet.width, LAYOUT_DATA.bullet.height);
    ctx.save();
  }

  update(movement) {
    this.x += (movement === 'right' ? (GAME_SETTINGS.speed * 2) : GAME_SETTINGS.speed);
  }

}
