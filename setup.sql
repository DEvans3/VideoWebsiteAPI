DROP DATABASE IF EXISTS devdatabase;
CREATE DATABASE devdatabase;

use devdatabase;

CREATE TABLE videos(
video_id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100),
video_url VARCHAR(255),
thumbnail VARCHAR(255),
likes INT,
dislikes INT,
PRIMARY KEY (video_id)
);

CREATE TABLE comment(
comment_id INT NOT NULL AUTO_INCREMENT,
video_id INT NOT NULL,
user_id INT,
user_comment VARCHAR(255),
PRIMARY KEY (comment_id)
);

CREATE TABLE users(
user_id INT NOT NULL AUTO_INCREMENT,
user_name VARCHAR(255),
PRIMARY KEY (user_id)
);

CREATE TABLE likes_dislikes(
rating_id INT NOT NULL AUTO_INCREMENT,
video_id INT NOT NULL,
user_id INT NOT NULL,
likes INT,
dislikes INT,
PRIMARY KEY (rating_id)
);



