class Collision {

  getMarioGroundCollision() {
    let collisionMap = [];

    var level = LEVELS[1];

    let columnX = [];
    for (let i = LEVELS[1].columns[0].x; i < LEVELS[1].columns[0].x + LAYOUT_DATA.columns.width; i++) {
      columnX.push(i);
    };

    for (let i = 0; i < LEVELS[1].width; i++) {
      let newX, newY;

      if (_.includes(columnX, i)) {
        newY = (canvas.height - LAYOUT_DATA.groundHeight) - LAYOUT_DATA.columns.height;
      } else {
        newY = canvas.height - LAYOUT_DATA.groundHeight;
      }

      collisionMap.push({ x: i, y: newY });

    }

    return collisionMap;

  }

}
