# Description
Grass Invaders is a full-stack replica of the classic Space Invaders game. The app itself is fairly simple - you control a ship and shoot at monsters while they chase and shoot at you, and the game ends when a monster touches or hits you with a laser. This was, however, an exercise to implement some deployment best practices such as continuous integration testing.

## Technical Stack:
  - Development: PostgreSQL | Express | React | Node.js
  - Testing: Jest | Supertest | Enzyme

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
