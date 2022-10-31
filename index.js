const squareRegistry = new Map();

const ChessSquare = (x, y) => {
  const xPos = x;
  const yPos = y;
  let predecessor;

  const KNIGHT_MOVES = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  const getPredecessor = () => predecessor;
  const setPredecessor = (newPred) => {
    predecessor = predecessor || newPred;
  };

  const name = () => `${x}, ${y}`;

  const createKnightMoves = () => {
    return KNIGHT_MOVES.map((offset) =>
      newSquareFrom(offset[0], offset[1])
    ).filter((square) => square !== undefined);
  };

  const newSquareFrom = (xOffset, yOffset) => {
    const [newX, newY] = [xPos + xOffset, yPos + yOffset];
    if (0 <= newX && newX < 8 && 0 <= newY && y < 8) {
      return ChessSquare(newX, newY);
    }
  };

  if (squareRegistry.has(name())) {
    return squareRegistry.get(name());
  } else {
    newSquare = { name, getPredecessor, setPredecessor, createKnightMoves };
    squareRegistry.set(name(), newSquare);
    return newSquare;
  }
};

const knightsTravails = (start, finish) => {
  squareRegistry.clear();

  const origin = ChessSquare(...start);
  const target = ChessSquare(...finish);

  const queue = [origin];
  while (!queue.includes(target)) {
    const currentSquare = queue.shift();

    const enqueueList = currentSquare.createKnightMoves();
    enqueueList.forEach((square) => square.setPredecessor(currentSquare));
    queue.push(...enqueueList);
  }
  const path = [target];
  while (!path.includes(origin)) {
    const prevSquare = path[0].getPredecessor();
    path.unshift(prevSquare);
  }
  console.log(`You made it in ${path.length - 1} moves!  Here's your path:`);
  path.forEach((square) => console.log(square.name()));
};

knightsTravails([3, 3], [4, 3]);
