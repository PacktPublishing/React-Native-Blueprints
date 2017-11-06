const stringFrequencies = [
  { min: 287, max: 371, tuned: 329 },
  { min: 221, max: 287, tuned: 246 },
  { min: 171, max: 221, tuned: 196 },
  { min: 128, max: 171, tuned: 146 },
  { min: 96, max: 128, tuned: 110 },
  { min: 36, max: 96, tuned: 82}
];

export function getClosestString(freq) {
  let stringData = null;
  for(var i = 0; i < stringFrequencies.length; i++) {
    if(stringFrequencies[i].min < freq && stringFrequencies[i].max >= freq){
      let delta = freq - stringFrequencies[i].tuned; //absolute delta
      if(delta > 0){
        delta = Math.floor(delta * 100 / (stringFrequencies[i].max - stringFrequencies[i].tuned));
      } else {
        delta = Math.floor(delta * 100 / (stringFrequencies[i].tuned - stringFrequencies[i].min));
      }
      if(delta > 75) delta = 75; //limit deltas
      if(delta < -75) delta = -75;
      stringData = { number: 6 - i, delta } //relative delta
      break;
    }
  }
  return stringData;
}

export const colors = {
  black: '#1f2025',
  yellow: '#f3c556',
  green: '#3bd78b'
}
