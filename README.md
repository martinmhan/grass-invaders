# Description
Grass Invaders is a full-stack replica of the classic Space Invaders game. The app itself is fairly simple - you control a ship and shoot at monsters while they chase and shoot at you, and the game ends when a monster hits you. High scores are sent to and retrieved from a SQL database via a REST API. This was however an opportunity to exercise some deployment best practices such as React and CI testing with Enzyme and Travis as well as streamlining multi-container deployments with Docker Compose.

Technical Stack:
  - Development: PostgreSQL | Express | React | Node.js
  - Testing: Jest | Supertest | Enzyme | Travis CI
  - Deployment: Docker Compose | EC2 | S3 | PM2

# Demos
- Startup: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-startup.gif
- Gameplay: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-gameplay.gif
- High Scores: https://s3-us-west-1.amazonaws.com/gitbuckets/grass-invaders/gifs/grass-invaders-highscore.gif
