# Description
Grass Invaders is a full-stack replica of the classic Space Invaders game. The app itself is fairly simple - you control a ship and shoot at monsters while they chase and shoot at you. The game ends when a monster touches or hits you with a laser. All scores are saved in database and high scores can be displayed in the game.

## Technical Stack:
  - Development: PostgreSQL | Express | React | Node.js
  - Testing: Jest | Supertest

# Demos
- Gameplay: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass_invaders.gif

# Setup
Run the following, then open 'localhost:3000' in the Chrome browser.
** Must have PostgreSQL set up with a database named "grassinvaders". See npm scripts for schema build
  ```
  npm install
  npm run build
  npm run start-dev
  ```
