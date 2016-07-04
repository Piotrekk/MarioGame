let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;


const LEVELS = {
  '1': {
    width: 3000,
    trees: [
      { x: 500 },
      { x: 1500 },
      { x: 2500 }
    ],
    clouds: [
      { x: 300, y: 100 },
      { x: 400, y: 150 }
    ]
  }
}

const GAME_SETTINGS = {
  FPS: 60,
  second: 1000,
  speed: 3,
  layoutRange: {
    left: 450,
    right: 550
  }
}


class GameEngine {

  constructor() {
    this.frames = 0;

    this.currentLevel = LEVELS[1];

    this.layout = new Layout(this.currentLevel);
    this.mario = new Mario();

    this.run();
  }

  update() {
    this.layout.update(this.mario.getMoveDirection());
    this.mario.update();
  }

  render() {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.layout.render();
    this.mario.render();
  }

  run() {
    const self = this;

    setInterval(() => {
      self.update();
      self.render();

      self.frames += 1;
    }, GAME_SETTINGS.second / GAME_SETTINGS.FPS);

  }

}



window.onload = () => {
  new GameEngine();
}
