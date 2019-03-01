import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Score from './Score';
import Grid from './grid/Grid';
import ButtonPad from './ButtonPad';
import Explosion from './grid/Explosion';

class App extends Component {
  constructor(props) {
    super(props);

    // game config variables
    this.rows = 18;
    this.cols = 18;
    this.lastLaser = null;
    this.msBetweenLasers = 250; // (higher = more difficult)
    this.laserSpeed = 40; // 1 = 1 square per second (lower = more difficult)
    this.enemyLaserSpeed = 20; // 1 = 1 square per second (higher = more difficult)
    this.enemyLaserFrequency = 10; // % of enemy movements that result in a laser fired (higher = more difficult)
    this.addEnemyIntervalms = 1000; // ms between enemies being added to screen (lower = more difficult)
    this.moveEnemiesIntervalms = 325; // ms between enemy movements (lower = more difficult)
    this.addEnemyInterval = null;
    this.moveEnemiesInterval = null;

    const grid = [];
    for (let i = 0; i < this.rows; i += 1) {
      grid[i] = new Array(this.cols).fill(null);
    }

    this.state = {
      allScores: [],
      gameState: 'intro', // possible values --> 'intro', 'pre-game', playing', 'game over', 'leaderboard'
      username: '',
      score: 0,
      gridMatrix: grid,
      shipRow: null,
      shipCol: null,
    };
  }

  componentWillMount = () => {
    this.resetGame();
    this.getAllScores();
  };

  getAllScores = async () => {
    try {
      const { data } = await Axios.get('3.84.195.96:3000/api/scores');
      data.sort((a, b) => b.score - a.score);
      this.setState({ allScores: data });
    } catch (err) { console.error(err); }
  };

  submitScore = async () => {
    try {
      const { username, score } = this.state;
      Axios.post('3.84.195.96:3000/api/scores', { username, score });
    } catch (err) { console.error(err); }
  };

  startGame = () => {
    const { gameState } = this.state;

    if (gameState !== 'playing') {
      this.resetGame();
      this.addEnemyInterval = setInterval(this.addEnemy, this.addEnemyIntervalms);
      this.moveEnemiesInterval = setInterval(this.moveEnemies, this.moveEnemiesIntervalms);
      this.setState({ gameState: 'playing' });
    }
  };

  endGame = async () => {
    try {
      if (this.state.game !== 'game over') {
        this.setState({ gameState: 'game over' });
        clearInterval(this.addEnemyInterval);
        clearInterval(this.moveEnemiesInterval);
        await this.submitScore();
        this.getAllScores();
      }
    } catch (err) { console.error(err); }
  };

  resetGame = () => {
    const gridMatrix = [];
    const shipRow = this.rows - 2;
    const shipCol = Math.floor(this.cols / 2);
    const score = 0;

    for (let i = 0; i < this.rows; i += 1) {
      const row = [];
      for (let j = 0; j < this.cols; j += 1) {
        const cellDiv = document.getElementById(`r${i}c${j}`);
        if (cellDiv) { ReactDOM.unmountComponentAtNode(cellDiv); }
        if (i === shipRow && j === shipCol) {
          row.push('ship');
        } else if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1) {
          row.push('wall');
        } else {
          row.push(null);
        }
      }
      gridMatrix.push(row);
    }

    this.setState({ gridMatrix, shipRow, shipCol, score, gameState: 'intro' });
  };

  letsPlay = (username) => {
    if (username.length > 0) {
      this.setState({ username, gameState: 'pre-game' });
    } else {
      // TODO: HANDLE INVALID USERNAME INPUTS
    }
  };

  openLeaderboard = () => {
    const { gameState } = this.state;

    if (!['playing', 'intro'].includes(gameState)) {
      this.setState({ gameState: 'leaderboard' });
    }
  };

  closeLeaderboard = () => {
    this.setState({ gameState: 'pre-game' });
  };

  handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      this.moveShip(e.key);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (Date.now() >= this.lastLaser + this.msBetweenLasers) { this.shootLaser(); }
    }
  };

  moveShip = (directionKey) => {
    if (this.state.gameState !== 'playing') { return; }
    let newRow = this.state.shipRow;
    let newCol = this.state.shipCol;
    const gridMatrix = [...this.state.gridMatrix];

    if (directionKey === 'ArrowUp') {
      newRow = Math.max(1, this.state.shipRow - 1);
    } else if (directionKey === 'ArrowDown') {
      newRow = Math.min(this.rows - 2, this.state.shipRow + 1);
    } else if (directionKey === 'ArrowLeft') {
      newCol = Math.max(1, this.state.shipCol - 1);
    } else if (directionKey === 'ArrowRight') {
      newCol = Math.min(this.cols - 2, this.state.shipCol + 1);
    }

    if (!gridMatrix[newRow][newCol]) { // if new spot is empty, move ship
      gridMatrix[this.state.shipRow][this.state.shipCol] = null;
      gridMatrix[newRow][newCol] = 'ship';
      this.setState({ gridMatrix, shipRow: newRow, shipCol: newCol });
    } else if (gridMatrix[newRow][newCol] === 'enemy' || gridMatrix[newRow][newCol] === 'laser') {
      this.endGame(); // if new spot is an enemy or laser, game over
    }
  };

  shootLaser = () => {
    if (this.state.gameState !== 'playing') { return; }
    this.lastLaser = Date.now();
    let laserRow = this.state.shipRow;
    let laserCol = this.state.shipCol;

    const moveLaser = () => { // recursive fn that moves laser dot up until it hits a wall or enemy
      const gridMatrix = [...this.state.gridMatrix];
      const nextCell = this.state.gridMatrix[laserRow - 1][laserCol];

      if (nextCell === null) { // if next cell is empty or an enemy laser, move laser forward
        if (gridMatrix[laserRow][laserCol] !== 'ship') { // if current laser row/col is not a ship, remove from grid
          gridMatrix[laserRow][laserCol] = null;
        }

        gridMatrix[--laserRow][laserCol] = 'laser'; // move laser up a row
        this.setState({ gridMatrix }, () => {
          setTimeout(moveLaser, 1000 / this.laserSpeed); // schedule next laser move
        });
      } else {
        if (nextCell === 'enemy') { // if laser hits an enemy, remove enemy from grid
          gridMatrix[laserRow - 1][laserCol] = null;
          const cellDiv = document.getElementById(`r${laserRow - 1}c${laserCol}`);
          ReactDOM.render(<Explosion />, cellDiv);
          setTimeout(() => { ReactDOM.unmountComponentAtNode(cellDiv); }, 100);
          this.setState({ gridMatrix, score: this.state.score + 10 });
        }

        // note: ship and enemy lasers may or may not pass by each other
        gridMatrix[laserRow][laserCol] = null;
        this.setState({ gridMatrix });
      }
    };

    moveLaser();
  };

  addEnemy = () => {
    let row = Math.floor(Math.random() * (3 - 1)) + 1;
    let col = Math.floor(Math.random() * (this.cols - 1) - 1) + 1;

    while (this.state.gridMatrix[row][col]) {
      row = Math.floor(Math.random() * (3 - 1)) + 1;
      col = Math.floor(Math.random() * (this.cols - 1) - 1) + 1;
    }

    const gridMatrix = [...this.state.gridMatrix];
    gridMatrix[row][col] = 'enemy';
    this.setState({ gridMatrix });
  };

  moveEnemies = () => {
    const gridMatrix = this.state.gridMatrix.map(row => [...row]);

    for (let i = 1; i < this.rows - 1; i++) { // iterate through all cells
      for (let j = 1; j < this.cols - 1; j++) {
        if (this.state.gridMatrix[i][j] === 'enemy') { // if cell contains an enemy, move enemy closer to ship
          const newRow = this.state.shipRow > i ? i + 1 : (this.state.shipRow < i ? i - 1 : i);
          const newCol = this.state.shipCol > j ? j + 1 : (this.state.shipCol < j ? j - 1 : j);
          if (!this.state.gridMatrix[newRow][newCol]) { // move enemy only if next spot is null
            gridMatrix[i][j] = null;
            gridMatrix[newRow][newCol] = 'enemy';
            if (Math.random() < 0.01 * this.enemyLaserFrequency) {
              this.shootEnemyLaser(newRow, newCol);
            }
          } else if (this.state.gridMatrix[newRow][newCol] === 'ship') { // if an enemy hits a ship, end game
            this.endGame();
          }
        }
      }
    }

    this.setState({ gridMatrix });
  };

  shootEnemyLaser = (row, col) => {
    const moveEnemyLaser = () => {
      const nextCell = this.state.gridMatrix[row + 1][col];
      const gridMatrix = [...this.state.gridMatrix];

      if (nextCell === null || nextCell === 'laser') {
        if (gridMatrix[row][col] !== 'enemy') {
          gridMatrix[row][col] = null;
        }

        gridMatrix[++row][col] = 'laser';
        this.setState({ gridMatrix }, () => {
          setTimeout(moveEnemyLaser, 1000 / this.enemyLaserSpeed);
        });
      } else {
        if (nextCell === 'ship') {
          const cellDiv = document.getElementById(`r${row + 1}c${col}`);
          const shipDiv = document.getElementsByClassName('ship')[0];
          shipDiv.parentNode.removeChild(shipDiv);
          ReactDOM.render(<Explosion />, cellDiv);
          this.endGame();
        }

        gridMatrix[row][col] = null;
        this.setState({ gridMatrix });
      }
    };

    moveEnemyLaser();
  };

  render = () => (
    <div className="app">
      <div className="gamecontainer">
        <div className="titleheader">Grass Invaders</div>
        <Score score={this.state.score} />
        <Grid
          rows={this.rows}
          cols={this.cols}
          letsPlay={this.letsPlay}
          handleKeyDown={this.handleKeyDown}
          gridMatrix={this.state.gridMatrix}
          gameState={this.state.gameState}
          allScores={this.state.allScores}
          closeLeaderboard={this.closeLeaderboard}
        />
        <ButtonPad
          startGame={this.startGame}
          openLeaderboard={this.openLeaderboard}
        />
      </div>
    </div>
  );
}

export default App;
