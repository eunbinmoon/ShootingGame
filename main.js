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

let bulletList = []; //총알들을 저장하는 리스트
function bullet() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.x = spaceshipX;
    this.y = spaceshipY;

    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };
}

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
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
    if (event.keyCode === 32) {
      createBullet(); //총알생성함수
    }
  });
}

function createBullet() {
  let b = new bullet(); //총알 하나 생성
  b.init();
  console.log("새로운 총알", bulletList);
}

function update() {
  //오른쪽
  if (39 in keysDown && spaceshipX <= 331) {
    spaceshipX += 3;
  } else if (37 in keysDown && spaceshipX > 0) {
    spaceshipX -= 3;
  }
  //총알의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

function render() {
  ctx.drawImage(spacebackgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 64, 64);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x + 7, bulletList[i].y, 50, 50);
  }
}

function main() {
  update(); //좌표값을 업데이트하고
  render(); //그려주고
  requestAnimationFrame(main);
}

loadImage();
setUpkeyboardListener();
main();

//총알 만들기
//스페이스바를 누르면 총알 발사
//총알 발사 = 총알의 y길이 --- x값은 스페이스를 누른 순간의 우주선의 x좌표
//발사된 총알들은 총알 배열에 저장
//모든 총알들은 x,y좌표값이 있어야 한다
// 총알 배열을 가지고 렌더링한다
