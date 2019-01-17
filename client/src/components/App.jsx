import React, { Component } from 'react';
import Scoreboard from './Scoreboard.jsx';
import Grid from './Grid.jsx';
import ButtonPad from './ButtonPad.jsx';
import Sidebar from './Sidebar.jsx';
import Explosion from './Explosion.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.rows = 18;
    this.cols = 18;
    this.lastLaser = null;
    this.msBetweenLasers = 250;
    this.laserSpeed = 40;
    this.addEnemyIntervalms = 750;
    this.moveEnemiesIntervalms = 750;
    this.addEnemyInterval = null;
    this.moveEnemiesInterval = null;
    this.state = {
      gameStarted: false,
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
    if (!this.state.gameStarted) {
      this.addEnemyInterval = setInterval(this.addEnemy, this.addEnemyIntervalms);
      this.moveEnemiesInterval = setInterval(this.moveEnemies, this.moveEnemiesIntervalms);
      this.setState({ gameStarted: true });
    }
  };

  endGame = () => {
    clearInterval(this.addEnemyInterval);
    clearInterval(this.moveEnemiesInterval);
    this.resetGame();
  };

  resetGame = () => {
    let gridMatrix = [];
    let shipRow = this.rows - 2; 
    let shipCol = Math.floor(this.cols / 2);
    let score = 0;

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j ++) {
        if (i === shipRow && j === shipCol) { row.push('ship'); }
        else if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1) { row.push('wall'); }
        else { row.push(null); }
      }
      gridMatrix.push(row);
    }

    this.setState({ gridMatrix, shipRow, shipCol, score, gameStarted: false });
  }

  handleKeyDown = (e) => {
    e.preventDefault();
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      this.moveShip(e.key);
    } else if (e.key === ' ') {
      if (Date.now() < this.lastLaser + this.msBetweenLasers) { return; }
      else { this.shootLaser(); }
    }
  };

  moveShip = (directionKey) => {
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
      console.log('game over'); // fix game over message
    }
  };

  shootLaser = () => {
    this.lastLaser = Date.now();
    let laserRow = this.state.shipRow, laserCol = this.state.shipCol;

    const moveLaser = () => {
      let gridMatrix = [...this.state.gridMatrix];
      let nextCell = this.state.gridMatrix[laserRow - 1][laserCol];

      if (nextCell === null) { // if next cell is empty, move laser forward
        if (gridMatrix[laserRow][laserCol] !== 'ship') { // if current laser row/col is not a ship, remove from grid
          gridMatrix[laserRow][laserCol] = null;
        }
        gridMatrix[--laserRow][laserCol] = 'laser'; // move laser up a row
        this.setState({ gridMatrix }, () => { setTimeout(moveLaser, 1000 / this.laserSpeed); }); // schedule laser to move up another row
      } else {
        if (nextCell === 'enemy') {
          gridMatrix[laserRow - 1][laserCol] = null;
          // add explosion image if laser hits an enemy
          // document.getElementById(`r${laserRow - 1}c${laserCol}`).appendChild(Explosion()); 
          // setTimeout(() => {
          //   console.log('remove explosion');
          // }, 0);
          let score = this.state.score + 10;
          this.setState({ score });
        }

        gridMatrix[laserRow][laserCol] = null;
        this.setState({ gridMatrix });
      }
    };

    moveLaser();
  };

  addEnemy = () => {
    let row = Math.floor(Math.random() * (2)) + 1;
    let col = Math.floor(Math.random() * (this.cols - 1 - 1)) + 1;

    while (this.state.gridMatrix[row][col]) {
      row = Math.floor(Math.random() * (3 - 2)) + 1;
      col = Math.floor(Math.random() * (this.cols - 1 - 1)) + 1;
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

    for (let i = 1; i < this.rows - 1; i++) {
      for (let j = 1; j < this.cols - 1; j++) {
        if (this.state.gridMatrix[i][j] === 'enemy') {
          let newRow = this.state.shipRow > i ? i + 1: i;
          let newCol = this.state.shipCol > j ? j + 1 : j - 1;
          if (!this.state.gridMatrix[newRow][newCol]) { // if next spot is empty, move
            gridMatrix[i][j] = null;
            gridMatrix[newRow][newCol] = 'enemy';
          } else if (this.state.gridMatrix[newRow][newCol] === 'ship') { // if next spot is the ship, game over
            this.endGame();
            console.log('game over!'); // fix game over message
          }
        }
      }
    }

    this.setState({ gridMatrix });
  };

  render = () => (
    <div id="app">
      <div id="gamecontainer">
        <Scoreboard score={this.state.score} />
        <Grid
          rows={this.rows}
          cols={this.cols}
          gridMatrix={this.state.gridMatrix}
          handleKeyDown={this.handleKeyDown}
        />
        <ButtonPad startGame={this.startGame} endGame={this.endGame} />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
