export const addSymbol = (index, symbol) => ({
  type: 'ADD_SYMBOL',
  symbol,
  index
});

export const jumpToMove = (move) => ({
  type: 'JUMP_TO_MOVE',
  move
});

export const reverseMoves = () => ({
  type: 'REVERSE_MOVES',
});

export const startAgain = () => ({
  type: 'START_AGAIN'
});