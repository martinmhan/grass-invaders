# Description
This is a small side-project I built during my time at Hack Reactor using purely React for the front-end. The app itself is a simple Space Invaders replica where you control a ship and shoot at monsters while they chase and shoot at you (and view others' high scores). However, this was an opportunity for me to implement some deployment best practices such as testing with Enzyme/Jest and Continuous Integration with Travis CI.

Technical Stack:
  - Development: PostgreSQL | Express | React | Node.js
  - Testing: Jest | Enzyme | Travis CI
  - Deployment: Docker | EC2 | S3

# GIF Demos
- Gameplay: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass_invaders.gif
- Leaderboard: ...

# Setup
Run the following, then open 'localhost:3000' in the Chrome browser.
  ```
  npm install
  npm run build
  npm run start-dev
  ```
