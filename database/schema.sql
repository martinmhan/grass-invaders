DROP DATABASE IF EXISTS grassinvaders;

CREATE DATABASE grassinvaders;

USE grassinvaders;

CREATE TABLE highscores (
  username VARCHAR(255),
  score INT,
  score_date DATE
);
