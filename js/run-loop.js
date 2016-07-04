class RunLoop {

  constructor() {
    this.frames = 0;

    this.run();
  }

  run() {
    const self = this;

    setInterval(() => self.frames += 1, GAME_SETTINGS.second / GAME_SETTINGS.FPS);
  }

}
