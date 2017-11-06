import {
  sprites,
  moveSprites,
  checkForCollision,
  getUpdatedScore,
  bounceParrot
} from "../sprites";

const initialState = {
  score: 0,
  gameOver: false,
  isStarted: false,
  sprites
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "TICK":
      return {
        ...state,
        sprites: moveSprites(state.sprites, action.elapsedTime),
        gameOver: checkForCollision(state.sprites[0], state.sprites.slice(1)),
        score: getUpdatedScore(state.sprites, state.score)
      };
    case "BOUNCE":
      return {
        ...state,
        sprites: bounceParrot(state.sprites)
      };
    case "START":
      return {
        ...initialState,
        isStarted: true
      };
    default:
      return state;
  }
};
