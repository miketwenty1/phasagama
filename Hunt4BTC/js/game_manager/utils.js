const SpawnerType = {
  MONSTER: 'MONSTER',
  CHEST: 'CHEST'
};

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

const Scale = {
  FACTOR: 2
};

const Mode = {
  EASY: 10,
  MEDIUM: 5,
  HARD: 3,
  INSANE: 1
}
const DIFFICULTY = 'MEDIUM';
