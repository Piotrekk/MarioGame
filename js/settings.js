let canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const GAME_SETTINGS = {
  FPS: 60,
  second: 1000,
  speed: 3,
  layoutRange: {
    left: 450,
    right: 550
  }
};

const LAYOUT_DATA = {
  trees: {
    width: 180,
    height: 90,
    y: 500
  },
  clouds: {
    width: 70,
    height: 50
  },
  columns: {
    width: 80,
    height: 100
  },
  lands: {
    width: 33
  },
  groundHeight: 120,
  backgroundColor: '#5c94fc'
};
