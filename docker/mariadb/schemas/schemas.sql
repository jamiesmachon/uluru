-- create core databases
CREATE DATABASE IF NOT EXISTS `uluru_local`;
-- select the database to apply the next script to
USE `uluru_local`;
-- create root user and grant rights
CREATE USER IF NOT EXISTS 'uluru_user'@'localhost' IDENTIFIED BY '&Ch5hHqJW1fBeA6';
GRANT ALL ON `uluru_local` TO 'uluru_user'@'localhost';
CREATE USER IF NOT EXISTS 'uluru_user'@'%' IDENTIFIED BY '&Ch5hHqJW1fBeA6';
GRANT ALL ON `uluru_local` TO 'uluru_user'@'%';

-- select the database to apply the next script to
USE `uluru_local`;

-- Create table statements below --