class GameEngine {

  constructor() {
    this.frames = 0;

    this.currentLevel = LEVELS[1];

    this.layout = new Layout(this.currentLevel);
    this.controlls = new Controlls();
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
    setInterval(() => {
      this.update();
      this.render();

      this.frames += 1;
    }, GAME_SETTINGS.second / GAME_SETTINGS.FPS);
  }

}


window.onload = () => {
  new GameEngine();
}
