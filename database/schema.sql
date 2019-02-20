DROP DATABASE IF EXISTS grassinvaders;

CREATE DATABASE grassinvaders;

\c grassinvaders;

CREATE TABLE highscores (
  username VARCHAR(255),
  score INT,
  score_date DATE
);
