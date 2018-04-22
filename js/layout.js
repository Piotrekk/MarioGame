class Layout {

  constructor(currentLevel) {
    this.currentLevel = currentLevel;
    this.layoutWidth = currentLevel.width;

    Layout.layoutVelocity = 0;

    this.render();
  }

  render() {
    this._rednerBackground();
    this._renderGround();
    this._renderTrees();
    this._renderClouds();
    this._renderColumns();
    this._renderLand();
  }

  update(marioMoveDirection) {
    this.applyMovement(marioMoveDirection);
  }

  applyMovement(direcion) {
    console.log(Layout.layoutVelocity);
    if (direcion === 'right') {
      if (Layout.layoutVelocity < 100) Layout.layoutVelocity += GAME_SETTINGS.speed;
    } else if (direcion === 'left') {
      if (Layout.layoutVelocity > (-2500 + MARIO_DATA.width)) Layout.layoutVelocity -= GAME_SETTINGS.speed;
    }
  }

  _rednerBackground() {
    ctx.fillStyle = LAYOUT_DATA.backgroundColor;
    ctx.fillRect(0 + Layout.layoutVelocity, 0, this.layoutWidth, canvas.height - LAYOUT_DATA.groundHeight);
    ctx.save();
  }

  _renderGround() {
    const groundImage = new Image();
    groundImage.src = 'media/img/ground.png';

    const pattern = ctx.createPattern(groundImage, 'repeat');

    ctx.fillStyle = pattern;
    ctx.fillRect(0 + Layout.layoutVelocity, canvas.height - LAYOUT_DATA.groundHeight, this.layoutWidth, LAYOUT_DATA.groundHeight);
    ctx.save();
  }

  _renderTrees() {
    const treeImage = new Image();
    treeImage.src = 'media/img/tree.png';

    _.each(this.currentLevel.trees, (tree) => {
      ctx.drawImage(treeImage, tree.x + Layout.layoutVelocity, (canvas.height - LAYOUT_DATA.groundHeight - LAYOUT_DATA.trees.height), LAYOUT_DATA.trees.width, LAYOUT_DATA.trees.height);
      ctx.save();
    });
  }

  _renderClouds() {
    const cloudImage = new Image();
    cloudImage.src = 'media/img/cloud.png';

    _.each(this.currentLevel.clouds, (cloud) => {
      ctx.drawImage(cloudImage, cloud.x + Layout.layoutVelocity, cloud.y, LAYOUT_DATA.clouds.width, LAYOUT_DATA.clouds.height);
      ctx.save();
    });
  }

  _renderColumns() {
    const columnImage = new Image();
    columnImage.src = 'media/img/column.png';

    _.each(this.currentLevel.columns, (column) => {
      ctx.drawImage(columnImage, column.x + Layout.layoutVelocity, column.y, LAYOUT_DATA.columns.width, LAYOUT_DATA.columns.height);
      ctx.save();
    });
  }

  _renderLand() {
    _.each(this.currentLevel.lands, (currentLand) => {
      const landSize = _.divide(_.subtract(currentLand.to, currentLand.from), LAYOUT_DATA.lands.width);
      const landWidth = LAYOUT_DATA.lands.width;
      const groundY = 447;

      const getLandCoOrdinates = (landSize) => {
        let coOrdinatesMap = [];
        let currentY = groundY;
        const xStart = currentLand.to;

        for (let i = 0; i < landSize; i++) {
          if (i !== 0) currentY -= landWidth;

          for (let j = 0; j < landSize - i; j++) {
            coOrdinatesMap.push({
              x: (xStart - j * landWidth),
              y: currentY
            });
          }
        }

        return coOrdinatesMap;
      };

      const landCoOrdinates = getLandCoOrdinates(landSize);
      const landImage = new Image();
      landImage.src = 'media/img/land.png';

      _.each(landCoOrdinates, (land) => {
        ctx.drawImage(landImage, land.x + Layout.layoutVelocity, land.y, landWidth, landWidth);
        ctx.save();
      });
    });
  }

}
