# Description
Grass Invaders is a full-stack replica of the classic Space Invaders game. The app itself is fairly simple - you control a ship and shoot at monsters while they chase and shoot at you, and the game ends when a monster touches or hits you with a laser. High scores are sent to and retrieved from a SQL database via a REST API.

Technical Stack:
  - Development: PostgreSQL | Express | React | Node.js
  - Testing: Jest | Supertest | Enzyme

# Demos
- Startup: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-startup.gif
- Gameplay: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-gameplay.gif
- High Scores: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-highscore.gif

# Setup
Run the following, then open 'localhost:3000' in the Chrome browser.
** Must have PostgreSQL set up with a database named "grassinvaders". See npm scripts for schema build
  ```
  npm i
  npm run build:dev
  npm run start:dev
  ``` 
