import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scoreboard from './Scoreboard.jsx';
import Grid from './Grid.jsx';
import ButtonPad from './ButtonPad.jsx';
import Explosion from './Explosion.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 18;
    this.cols = 18;
    this.lastLaser = null;
    this.msBetweenLasers = 250;
    this.laserSpeed = 40; // 1 = square per second
    this.enemyLaserSpeed = 15; // 1 = square per second
    this.enemyLaserFrequency = 10; // % of enemy movements that fire a laser
    this.addEnemyIntervalms = 1000; // ms between enemies are added to screen
    this.moveEnemiesIntervalms = 300; // ms between enemy movements
    this.addEnemyInterval = null;
    this.moveEnemiesInterval = null;
    this.state = {
      gameState: 'intro', // possible values --> 'intro', 'pre-game', playing', 'game over' 
      score: 0,
      gridMatrix: [],
      shipRow: null,
      shipCol: null,
    };
  }

  componentWillMount = () => {
    this.resetGame();
  };

  startGame = () => {
    if (this.state.gameState !== 'playing') {
      this.resetGame();
      this.addEnemyInterval = setInterval(this.addEnemy, this.addEnemyIntervalms);
      this.moveEnemiesInterval = setInterval(this.moveEnemies, this.moveEnemiesIntervalms);
      this.setState({ gameState: 'playing' });
    }
  };

  endGame = () => {
    clearInterval(this.addEnemyInterval);
    clearInterval(this.moveEnemiesInterval);
    this.setState({ gameState: 'game over' });
  };

  resetGame = () => {
    let gridMatrix = [];
    let shipRow = this.rows - 2;
    let shipCol = Math.floor(this.cols / 2);
    let score = 0;

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j ++) {
        const cellDiv = document.getElementById(`r${i}c${j}`);
        if (cellDiv) { ReactDOM.unmountComponentAtNode(cellDiv); }
        if (i === shipRow && j === shipCol) { row.push('ship'); }
        else if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1) { row.push('wall'); }
        else { row.push(null); }
      }
      gridMatrix.push(row);
    }

    this.setState({ gridMatrix, shipRow, shipCol, score, gameState: 'intro' });
  }

  gotIt = () => {
    this.setState({ gameState: 'pre-game' });
  };

  handleKeyDown = (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
      this.moveShip(e.key);
    } else if (e.key === ' ') {
      e.preventDefault();
      if (Date.now() < this.lastLaser + this.msBetweenLasers) { return; }
      else { this.shootLaser(); }
    }
  };

  moveShip = (directionKey) => {
    if (this.state.gameState !== 'playing') { return; }
    let newRow = this.state.shipRow, newCol = this.state.shipCol;
    let gridMatrix = [...this.state.gridMatrix];

    if (directionKey === 'ArrowUp') { newRow = Math.max(1, this.state.shipRow - 1); }
    else if (directionKey === 'ArrowDown') { newRow = Math.min(this.rows - 2, this.state.shipRow + 1); }
    else if (directionKey === 'ArrowLeft') { newCol = Math.max(1, this.state.shipCol - 1); }
    else if (directionKey === 'ArrowRight') { newCol = Math.min( this.cols - 2, this.state.shipCol + 1); }

    if (!gridMatrix[newRow][newCol]) {
      gridMatrix[this.state.shipRow][this.state.shipCol] = null;
      gridMatrix[newRow][newCol] = 'ship';
      this.setState({ gridMatrix, shipRow: newRow, shipCol: newCol });
    } else if (gridMatrix[newRow][newCol] === 'enemy') {
      this.endGame();
    }
  };

  shootLaser = () => {
    if (this.state.gameState !== 'playing') { return; }
    this.lastLaser = Date.now();
    let laserRow = this.state.shipRow, laserCol = this.state.shipCol;

    const moveLaser = () => { // recursive function that moves laser dot up a cell until it hits a wall or enemy
      let gridMatrix = [...this.state.gridMatrix];
      let nextCell = this.state.gridMatrix[laserRow - 1][laserCol];

      if (nextCell === null) { // if next cell is empty, move laser forward
        if (gridMatrix[laserRow][laserCol] !== 'ship') { // if current laser row/col is not a ship, remove from grid
          gridMatrix[laserRow][laserCol] = null;
        }
        gridMatrix[--laserRow][laserCol] = 'laser'; // move laser up a row
        this.setState({ gridMatrix }, () => { setTimeout(moveLaser, 1000 / this.laserSpeed); }); // schedule laser to move up another row
      } else {
        if (nextCell === 'enemy') { // if laser hits an enemy, remove enemy from grid
          gridMatrix[laserRow - 1][laserCol] = null;
          const cellDiv = document.getElementById(`r${laserRow - 1}c${laserCol}`);
          ReactDOM.render(<Explosion/>, cellDiv);
          setTimeout(() => { ReactDOM.unmountComponentAtNode(cellDiv); }, 100);
          this.setState({ gridMatrix, score: this.state.score + 10 });
        }

        gridMatrix[laserRow][laserCol] = null;
        this.setState({ gridMatrix });
      }
    };

    moveLaser();
  };

  addEnemy = () => {
    let row = Math.floor(Math.random() * (2)) + 1;
    let col = Math.floor(Math.random() * (this.cols - 2)) + 1;

    while (this.state.gridMatrix[row][col]) {
      row = Math.floor(Math.random() * (2)) + 1;
      col = Math.floor(Math.random() * (this.cols - 2)) + 1;
    }

    let gridMatrix = [...this.state.gridMatrix];
    gridMatrix[row][col] = 'enemy';
    this.setState({ gridMatrix });
  };

  moveEnemies = () => {
    let gridMatrix = [];
    for (let row of this.state.gridMatrix) {
      gridMatrix.push([...row]);
    }

    for (let i = 1; i < this.rows - 1; i++) { // iterate through all cells
      for (let j = 1; j < this.cols - 1; j++) {
        if (this.state.gridMatrix[i][j] === 'enemy') { // if cell contains an enemy, move enemy closer to ship
          let newRow = this.state.shipRow > i ? i + 1 : (this.state.shipRow < i ? i - 1 : i);
          let newCol = this.state.shipCol > j ? j + 1 : (this.state.shipCol < j ? j - 1 : j);
          if (!this.state.gridMatrix[newRow][newCol]) { // move enemy only if next spot is null
            gridMatrix[i][j] = null;
            gridMatrix[newRow][newCol] = 'enemy';
            if (Math.random() < .01 * this.enemyLaserFrequency) { this.shootEnemyLaser(newRow, newCol); }
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
      let nextCell = this.state.gridMatrix[row + 1][col];
      let gridMatrix = [...this.state.gridMatrix];

      if (nextCell === null) {
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
          ReactDOM.render(<Explosion/>, cellDiv);
          this.endGame();
        }

        gridMatrix[row][col] = null;
        this.setState({ gridMatrix });
      }
    };

    moveEnemyLaser();
  };

  render = () => (
    <div id="app">
      <div id="gamecontainer">
        <div className="titleheader">Grass Invaders</div>
        <Scoreboard score={this.state.score} />
        <Grid
          rows={this.rows}
          cols={this.cols}
          gotIt={this.gotIt}
          handleKeyDown={this.handleKeyDown}
          gridMatrix={this.state.gridMatrix}
          gameState={this.state.gameState}
        />
        <ButtonPad startGame={this.startGame} endGame={this.endGame} />
      </div>
    </div>
  );
}

export default App;
