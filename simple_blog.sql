/*
 Navicat Premium Data Transfer

 Source Server         : aws
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : database-1.c6fijxgso4ym.us-east-2.rds.amazonaws.com:3306
 Source Schema         : simple_blog

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 16/07/2020 22:21:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `content` text,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blogs
-- ----------------------------
BEGIN;
INSERT INTO `blogs` VALUES (1, 'First blog', 'A simple first blog', 'This blog is only for demo purpose...', 'https://sahtybucket.s3.us-east-2.amazonaws.com/1594747469528.jpg');
INSERT INTO `blogs` VALUES (2, 'Day la blog thu 2', 'Blog thu 2 roi day', 'Chi la mot blog don gian', 'https://sahtybucket.s3.amazonaws.com/1594747732930.png');
INSERT INTO `blogs` VALUES (3, 'test3', 'test3', 'test3', 'https://sahtybucket.s3.amazonaws.com/1594828428933.jpg');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
