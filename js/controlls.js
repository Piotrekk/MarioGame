class Controlls {

  constructor() {
    this.initControlls();
  }

  initControlls() {

    window.addEventListener('keydown', (event) => {
      const key = event.keyCode || event.charCode;

      switch (key) {
        case 39:
          PubSub.Publish('mario.move.left');
          break;
        case 37:
          PubSub.Publish('mario.move.right');
          break;
        case 38:
          PubSub.Publish('mario.jump.do');
          break;
      }
    });

    window.addEventListener('keypress', (event) => {
      let key = event.keyCode || event.charCode;

      switch (key) {
        case 32:
          PubSub.Publish('mario.bullet.new');
          break;
      }
    });

  }

}
