### SCHEMA

CREATE DATABASE bootcamp_db;

USE bootcamp_db;

CREATE TABLE subject
( 
  id int NOT NULL AUTO_INCREMENT,
  technology_name varchar(100) NOT NULL,
  learned BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);