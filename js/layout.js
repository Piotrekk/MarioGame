class Layout {

  constructor(currentLevel) {
    this.currentLevel = currentLevel;
    this.layoutWidth = currentLevel.width;

    this.layoutVelocity = 0;

    this.settings = {
      trees: {
        width: 180,
        height: 90,
        y: 500
      },
      clouds: {
        width: 70,
        height: 50
      },
      groundHeight: 120,
      backgroundColor: '#5c94fc'
    }

    this.render();
  }

  render() {
    this._rednerBackground();
    this._renderGround();
    this._renderTrees();
    this._renderClouds();
  }

  update(marioMoveDirection) {
    this.applyMovement(marioMoveDirection);
  }

  applyMovement(direcion) {
    if (direcion === 'right')
      this.layoutVelocity  += GAME_SETTINGS.speed;
    else if (direcion === 'left')
      this.layoutVelocity -= GAME_SETTINGS.speed;
  }

  _rednerBackground() {
    ctx.fillStyle = this.settings.backgroundColor;
    ctx.fillRect(0 + this.layoutVelocity, 0, this.layoutWidth, canvas.height - this.settings.groundHeight);
    ctx.save();
  }

  _renderGround() {
    let groundImage = new Image();
    groundImage.src = 'media/img/ground.png';

    const pattern = ctx.createPattern(groundImage, 'repeat');

    ctx.fillStyle = pattern;
    ctx.fillRect(0 + this.layoutVelocity, canvas.height - this.settings.groundHeight, this.layoutWidth, this.settings.groundHeight);
    ctx.save();
  }

  _renderTrees() {
    const self = this;

    const treeImage = new Image();
    treeImage.src = 'media/img/tree.png';

    _.each(self.currentLevel.trees, (tree) => {
      ctx.drawImage(treeImage, tree.x + self.layoutVelocity, (canvas.height - self.settings.groundHeight - self.settings.trees.height), self.settings.trees.width, self.settings.trees.height);
      ctx.save();
    });
  }

  _renderClouds() {
    const self = this;

    const cloudImage = new Image();
    cloudImage.src = 'media/img/cloud.png';

    _.each(self.currentLevel.clouds, (cloud) => {
      ctx.drawImage(cloudImage, cloud.x + self.layoutVelocity, cloud.y, self.settings.clouds.width, self.settings.clouds.height);
      ctx.save();
    });
  }

}
