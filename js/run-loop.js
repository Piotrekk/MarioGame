class RunLoop {

  constructor() {
    this.frames = 0;

    this.run();
  }

  run() {
    setInterval(() => {
      this.frames += 1;
      GAME_SETTINGS.second / GAME_SETTINGS.FPS
    });
  }

}
