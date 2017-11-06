export function start() {
  return { type: "START" };
}

export function tick(elapsedTime) {
  return { type: "TICK", elapsedTime };
}

export function bounce() {
  return { type: "BOUNCE" };
}
