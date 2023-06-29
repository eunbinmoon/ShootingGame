//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let spacebackgroundImage,
  spaceshipImage,
  ghostImage,
  gameoverImage,
  bulletImage;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

function loadImage() {
  spacebackgroundImage = new Image();
  spacebackgroundImage.src = "images/spacebackground.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  ghostImage = new Image();
  ghostImage.src = "images/ghost.png";

  gameoverImage = new Image();
  gameoverImage.src = "images/gameover.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";
}

let keysDown = {};
function setUpkeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
    console.log("키다운객체에 들어간 값은?", keysDown);
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
    console.log("클릭 후 ", keysDown);
  });
}

function update() {
  //오른쪽
  if (39 in keysDown && spaceshipX <= 331) {
    spaceshipX += 3;
  } else if (37 in keysDown && spaceshipX > 0) {
    spaceshipX -= 3;
  }
}

function render() {
  ctx.drawImage(spacebackgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 64, 64);
}

function main() {
  update(); //좌표값을 업데이트하고
  render(); //그려주고
  requestAnimationFrame(main);
}

loadImage();
setUpkeyboardListener();
main();
