const rows = 200;
const cols = 200;
const cellSize = 10;

/*
This code creates an array grid of the specified size (rows by cols), and initializes it with random values (either 0 or 1).
*/
let grid = [];
for (let i = 0; i < rows; i++) {
  grid[i] = [];
  for (let j = 0; j < cols; j++) {
    grid[i][j] = Math.round(Math.random());
  }
}

/*
The update function implements the rules of the Game of Life, updating the values in the grid array. It does this by creating a new array nextGrid and using a nested loop to calculate the next state of each cell based on the number of living neighbors it has. The rules are:

If a cell is alive and has 2 or 3 living neighbors, it stays alive.
If a cell is dead and has exactly 3 living neighbors, it becomes alive.
In all other cases, the cell dies or remains dead.
*/

const update = () => {
  let nextGrid = [];
  for (let i = 0; i < rows; i++) {
    nextGrid[i] = [];
    for (let j = 0; j < cols; j++) {
      let count = 0;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (i + x >= 0 && i + x < rows && j + y >= 0 && j + y < cols && !(x === 0 && y === 0)) {
            count += grid[i + x][j + y];
          }
        }
      }
      if (grid[i][j] === 1 && (count === 2 || count === 3)) {
        nextGrid[i][j] = 1;
      } else if (grid[i][j] === 0 && count === 3) {
        nextGrid[i][j] = 1;
      } else {
        nextGrid[i][j] = 0;
      }
    }
  }
  grid = nextGrid;
};
/*
The draw function updates the display by first calling the update function to update the grid, then it clears
*/
const draw = () => {
  update();
  let canvas = document.getElementById("game-of-life");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(canvas);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
};

window.onload = () => {
  setInterval(draw, 200);
};
