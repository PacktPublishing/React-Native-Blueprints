import sound from "react-native-sound";

const coinSound = new sound("coin.wav", sound.MAIN_BUNDLE);
let heightOfRockUp = 25;
let heightOfRockDown = 25;
let heightOfGap = 30;
let heightOfGround = 20;

export const sprites = [
  {
    type: "parrot",
    position: { x: 50, y: 55 },
    velocity: { x: 0, y: 0 },
    size: { width: 10, height: 8 }
  },
  {
    type: "rockUp",
    position: { x: 110, y: 0 },
    velocity: { x: -1, y: 0 },
    size: { width: 15, height: heightOfRockUp }
  },
  {
    type: "rockDown",
    position: { x: 110, y: heightOfRockUp + 30 },
    velocity: { x: -1, y: 0 },
    size: { width: 15, height: heightOfRockDown }
  },
  {
    type: "gap",
    position: { x: 110, y: heightOfRockUp },
    velocity: { x: -1, y: 0 },
    size: { width: 15, height: 30 }
  },
  {
    type: "ground",
    position: { x: 0, y: 80 },
    velocity: { x: -1, y: 0 },
    size: { width: 100, height: heightOfGround }
  },
  {
    type: "ground",
    position: { x: 100, y: 80 },
    velocity: { x: -1, y: 0 },
    size: { width: 100, height: heightOfGround }
  }
];

function prepareNewRockSizes() {
  heightOfRockUp = 10 + Math.floor(Math.random() * 40);
  heightOfRockDown = 50 - heightOfRockUp;
  heightOfGap = 30;
}

function getRockProps(type) {
  switch (type) {
    case "rockUp":
      return { y: 0, height: heightOfRockUp };
    case "rockDown":
      return { y: heightOfRockUp + heightOfGap, height: heightOfRockDown };
    case "gap":
      return { y: heightOfRockUp, height: heightOfGap };
  }
}

export function moveSprites(sprites, elapsedTime = 1000 / 60) {
  const gravity = 0.0001;
  let newSprites = [];

  sprites.map(sprite => {
    if (sprite.type === "parrot") {
      var newParrot = {
        ...sprite,
        position: {
          x: sprite.position.x,
          y:
            sprite.position.y +
            sprite.velocity.y * elapsedTime +
            0.5 * gravity * elapsedTime * elapsedTime
        },
        velocity: {
          x: sprite.velocity.x,
          y: sprite.velocity.y + elapsedTime * gravity
        }
      };
      newSprites.push(newParrot);
    } else if (
      sprite.type === "rockUp" ||
      sprite.type === "rockDown" ||
      sprite.type === "gap"
    ) {
      let rockPosition,
        rockSize = sprite.size;
      if (sprite.position.x > 0 - sprite.size.width) {
        rockPosition = {
          x: sprite.position.x + sprite.velocity.x,
          y: sprite.position.y
        };
      } else {
        rockPosition = { x: 100, y: getRockProps(sprite.type).y };
        rockSize = { width: 15, height: getRockProps(sprite.type).height };
      }
      var newRock = {
        ...sprite,
        position: rockPosition,
        size: rockSize
      };
      newSprites.push(newRock);
    } else if (sprite.type === "ground") {
      let groundPosition;
      if (sprite.position.x > -97) {
        groundPosition = { x: sprite.position.x + sprite.velocity.x, y: 80 };
      } else {
        groundPosition = { x: 100, y: 80 };
      }
      var newGround = { ...sprite, position: groundPosition };
      newSprites.push(newGround);
    }
  });
  return newSprites;
}

export function bounceParrot(sprites) {
  var newSprites = [];
  var sprite = sprites[0];
  var newParrot = { ...sprite, velocity: { x: sprite.velocity.x, y: -0.05 } };
  newSprites.push(newParrot);
  return newSprites.concat(sprites.slice(1));
}

function hasCollided(mainSprite, sprite) {
  var mainX = mainSprite.position.x;
  var mainY = mainSprite.position.y;
  var mainWidth = mainSprite.size.width;
  var mainHeight = mainSprite.size.height;

  var spriteX = sprite.position.x;
  var spriteY = sprite.position.y;
  var spriteWidth = sprite.size.width;
  var spriteHeight = sprite.size.height;

  if (
    mainX < spriteX + spriteWidth &&
    mainX + mainWidth > spriteX &&
    mainY < spriteY + spriteHeight &&
    mainHeight + mainY > spriteY
  ) {
    return true;
  }
}

export function checkForCollision(mainSprite, sprites) {
  return sprites.filter(sprite => sprite.type !== "gap").find(sprite => {
    return hasCollided(mainSprite, sprite);
  });
}

export function getUpdatedScore(sprites, score) {
  var parrot = sprites[0];
  var gap = sprites[3];

  var parrotXPostion = parrot.position.x;
  var gapXPosition = gap.position.x;
  var gapWidth = gap.size.width;

  if (parrotXPostion === gapXPosition + gapWidth) {
    coinSound.play();
    score++;
    prepareNewRockSizes();
  }

  return score;
}
