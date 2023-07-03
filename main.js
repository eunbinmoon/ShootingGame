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
let gameOver = false; //true이면 게임 끝, false면 게임 안끝남
let score = 0;
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
    this.alive = true; // true면 살아있는 총알 false면 죽은 총알
    bulletList.push(this);
  };
  this.update = function () {
    this.y -= 7;
  };

  this.checkHit = function () {
    for (let i = 0; i < ghostList.length; i++) {
      if (
        this.y <= ghostList[i].y &&
        this.x >= ghostList[i].x &&
        this.x <= ghostList[i].x + 48
      ) {
        score++;
        this.alive = false; //죽은 총알
        ghostList.splice(i, 1);
      }
    }
  };
}

function generateRandomValue(min, max) {
  //랜덤한 숫자를 리턴
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

let ghostList = [];
function ghost() {
  this.x = 0;
  this.y = 0;
  this.init = function () {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48);

    ghostList.push(this);
  };
  this.update = function () {
    this.y += 2;

    if (this.y >= canvas.height - 48) {
      gameOver = true;

      console.log("over");
    }
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

function createGhost() {
  const interval = setInterval(function () {
    let g = new ghost();
    g.init();
  }, 1000);
}

function update() {
  //오른쪽
  if (39 in keysDown && spaceshipX <= 331) {
    spaceshipX += 7;
  } else if (37 in keysDown && spaceshipX > 0) {
    spaceshipX -= 7;
  }
  //총알의 y좌표 업데이트 하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
    bulletList[i].checkHit();
  }
  //고스트의 y좌표 업데이트 하는 함수 호츌
  for (let i = 0; i < ghostList.length; i++) {
    ghostList[i].update();
  }
}

function render() {
  ctx.drawImage(spacebackgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY, 64, 64);

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x + 7, bulletList[i].y, 50, 50);
    }
  }

  for (let i = 0; i < ghostList.length; i++) {
    ctx.drawImage(ghostImage, ghostList[i].x, ghostList[i].y, 48, 48);
  }
}

function main() {
  if (!gameOver) {
    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameoverImage, 60, 200);
  }
}

loadImage();
setUpkeyboardListener();
createGhost();
main();

//총알 만들기
//스페이스바를 누르면 총알 발사
//총알 발사 = 총알의 y길이 --- x값은 스페이스를 누른 순간의 우주선의 x좌표
//발사된 총알들은 총알 배열에 저장
//모든 총알들은 x,y좌표값이 있어야 한다
// 총알 배열을 가지고 렌더링한다

//적 만들기
//적군의 위치는 랜덤하다
//적군은 밑으로 내려온다 0->Y값 ++
//적군은 1초마다 하나씩 적군 출현
//적군이 바닥에 닿으면 게임 오버
//적군과 총알이 만나면 적군이 사라진다 -> 점수 +1

//적군이 죽는다 =  총알이 적군에게 닿는다 =
//총알의 y좌표가 <= 적군의 y값 && 총알x >=적군x && 총알의 x좌표 <= 적군x+ 적군의 넓이
// = > 닿았다
// 총알이 죽게됨 적군 우주선도 없어지고 스코어 1점 획득
