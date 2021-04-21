# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: stylish_test
# Generation Time: 2021-04-14 09:33:11 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table campaign
# ------------------------------------------------------------

DROP TABLE IF EXISTS `campaign`;

CREATE TABLE `campaign` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `picture` varchar(255) NOT NULL,
  `story` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `campaign_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;

INSERT INTO `campaign` (`id`, `product_id`, `picture`, `story`)
VALUES
	(1,1,'keyvisual.jpg','測試1'),
	(2,2,'keyvisual.jpg','測試2'),
	(3,3,'keyvisual.jpg','測試3');

/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table hot
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hot`;

CREATE TABLE `hot` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `hot` WRITE;
/*!40000 ALTER TABLE `hot` DISABLE KEYS */;

INSERT INTO `hot` (`id`, `title`)
VALUES
	(1,'hot1'),
	(2,'hot2'),
	(3,'new hots'),
	(4,'new hots');

/*!40000 ALTER TABLE `hot` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table hot_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `hot_product`;

CREATE TABLE `hot_product` (
  `hot_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`hot_id`,`product_id`),
  KEY `product` (`product_id`),
  CONSTRAINT `hot_product_ibfk_1` FOREIGN KEY (`hot_id`) REFERENCES `hot` (`id`),
  CONSTRAINT `hot_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `hot_product` WRITE;
/*!40000 ALTER TABLE `hot_product` DISABLE KEYS */;

INSERT INTO `hot_product` (`hot_id`, `product_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(4,1),
	(1,2),
	(3,2),
	(4,2),
	(1,3),
	(3,3),
	(4,3),
	(2,4);

/*!40000 ALTER TABLE `hot_product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table order_table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `order_table`;

CREATE TABLE `order_table` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `time` bigint(20) unsigned NOT NULL,
  `status` tinyint(4) NOT NULL,
  `details` json NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `order_table` WRITE;
/*!40000 ALTER TABLE `order_table` DISABLE KEYS */;

INSERT INTO `order_table` (`id`, `number`, `time`, `status`, `details`, `user_id`, `total`)
VALUES
	(1,'314228391992',1618381239199,0,X'7B226C697374223A205B7B226964223A20312C2022717479223A20312C20226E616D65223A2022E5898DE9968BE8A1A9E689ADE7B590E6B48BE8A39D222C202273697A65223A202253222C2022636F6C6F72223A207B22636F6465223A2022464646464646222C20226E616D65223A2022E799BDE889B2227D2C20227072696365223A20313030302C202273746F636B223A20322C20226D61696E5F696D616765223A202268747470733A2F2F746573742F312F6D61696E2E6A7067227D5D2C2022746F74616C223A20313036302C202266726569676874223A2036302C20227061796D656E74223A20226372656469745F63617264222C20227368697070696E67223A202264656C6976657279222C2022737562746F74616C223A20313030302C2022726563697069656E74223A207B226E616D65223A202274657374222C202274696D65223A2022616E7974696D65222C2022656D61696C223A20227465737440676D61696C2E636F6D222C202270686F6E65223A202230393132333435363738222C202261646472657373223A20227465737461646472657373227D7D',1,1060),
	(2,'314228392059',1618381239205,0,X'7B226C697374223A205B7B226964223A20312C2022717479223A20312C20226E616D65223A2022E5898DE9968BE8A1A9E689ADE7B590E6B48BE8A39D222C202273697A65223A202253222C2022636F6C6F72223A207B22636F6465223A2022464646464646222C20226E616D65223A2022E799BDE889B2227D2C20227072696365223A20313030302C202273746F636B223A20322C20226D61696E5F696D616765223A202268747470733A2F2F746573742F312F6D61696E2E6A7067227D5D2C2022746F74616C223A20313036302C202266726569676874223A2036302C20227061796D656E74223A20226372656469745F63617264222C20227368697070696E67223A202264656C6976657279222C2022737562746F74616C223A20313030302C2022726563697069656E74223A207B226E616D65223A202274657374222C202274696D65223A2022616E7974696D65222C2022656D61696C223A20227465737440676D61696C2E636F6D222C202270686F6E65223A202230393132333435363738222C202261646472657373223A20227465737461646472657373227D7D',1,1060);

/*!40000 ALTER TABLE `order_table` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `details` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_table` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;

INSERT INTO `payment` (`id`, `order_id`, `details`)
VALUES
	(1,2,X'7B226D7367223A202253756363657373222C2022616D6F756E74223A20383035362C2022737461747573223A20302C20226163717569726572223A202254575F43544243222C202263757272656E6379223A2022545744222C2022617574685F636F6465223A2022313332343831222C2022636172645F696E666F223A207B2274797065223A20312C20226C6576656C223A2022222C2022697373756572223A2022222C202262616E6B5F6964223A2022222C2022636F756E747279223A2022554E49544544204B494E47444F4D222C202266756E64696E67223A20302C202262696E5F636F6465223A2022343234323432222C20226C6173745F666F7572223A202234323432222C2022636F756E7472795F636F6465223A20224742222C20226973737565725F7A685F7477223A2022227D2C20226D65726368616E745F6964223A2022417070576F726B735363686F6F6C5F43544243222C20226F726465725F6E756D626572223A2022222C20227265635F74726164655F6964223A2022443230323030323130654B765A7976222C202262616E6B5F726573756C745F6D7367223A2022222C2022636172645F6964656E746966696572223A20226465653932313536306230373462653761383630613662343461383063323162222C202262616E6B5F726573756C745F636F6465223A2022222C202262616E6B5F7472616E73616374696F6E5F6964223A202254503230323030323130654B765A7976222C202262616E6B5F7472616E73616374696F6E5F74696D65223A207B22656E645F74696D655F6D696C6C6973223A202231353831333235373230323531222C202273746172745F74696D655F6D696C6C6973223A202231353831333235373230323531227D2C20227472616E73616374696F6E5F74696D655F6D696C6C6973223A20313538313332353732303230377D');

/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(127) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  `texture` varchar(127) NOT NULL,
  `wash` varchar(127) NOT NULL,
  `place` varchar(127) NOT NULL,
  `note` varchar(127) NOT NULL,
  `story` text NOT NULL,
  `main_image` varchar(255) DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `category`, `title`, `description`, `price`, `texture`, `wash`, `place`, `note`, `story`, `main_image`, `images`)
VALUES
	(1,'men','product1','Product 1',100,'pt1','pw1','pp1','pn1','ps1','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(2,'women','product2','Product 2',200,'pt2','pw2','pp2','pn2','ps2','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(3,'men','product3','Product 3',300,'pt3','pw3','pp3','pn3','ps3','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(4,'accessories','product4','Product 4',400,'pt4','pw4','pp4','pn4','ps4','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(5,'accessories','product5','Product 5',500,'pt5','pw5','pp5','pn5','ps5','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(6,'accessories','product6','Product 6',600,'pt6','pw6','pp6','pn6','ps6','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(7,'women','product7','Product 7',700,'pt7','pw7','pp7','pn7','ps7','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(8,'men','product8','Product 8',800,'pt8','pw8','pp8','pn8','ps8xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(9,'men','product9','Product 9',900,'pt9','pw9','pp9','pn9','ps9xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(10,'men','test searchkey product10','Product 10',1000,'pt10','pw10','pp10','pn10','ps10xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(11,'men','test searchkey product11','Product 11',1100,'pt11','pw11','pp11','pn11','ps11xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(12,'men','test searchkey product12','Product 12',1200,'pt12','pw12','pp12','pn12','ps12xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(13,'men','test searchkey product13','Product 13',1300,'pt13','pw13','pp13','pn13','ps13xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg'),
	(14,'men','test searchkey product14','Product 14',1400,'pt14','pw14','pp14','pn14','ps14xwxw','main.jpg','0.jpg,1.jpg,0.jpg,1.jpg');

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;

INSERT INTO `role` (`id`, `name`)
VALUES
	(1,'admin'),
	(2,'user');

/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) unsigned DEFAULT NULL,
  `provider` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(127) NOT NULL,
  `picture` varchar(500) DEFAULT NULL,
  `access_token` varchar(1000) NOT NULL DEFAULT '',
  `access_expired` bigint(20) unsigned NOT NULL,
  `login_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`provider`,`email`,`password`),
  KEY `access_token` (`access_token`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `role_id`, `provider`, `email`, `password`, `name`, `picture`, `access_token`, `access_expired`, `login_at`)
VALUES
	(1,1,'native','test1@gmail.com','$2b$10$EKP9nLYxyisfQj4dHNluQuPlWDNcOLVqKbSsEeZLtEChg3AKLy/B2','test1',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0MSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIiwicGljdHVyZSI6bnVsbCwiaWF0IjoxNjE4MzgxMjM5fQ.pi8C1ALQOPBjcSr1nB3biSIil_urn3MHuuBb6AE1FCU',2592000,'2021-04-14 14:20:40'),
	(2,2,'facebook','test2@gmail.com',NULL,'test2','https://graph.facebook.com/1/picture?type=large','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6ImZhY2Vib29rIiwibmFtZSI6InRlc3QyIiwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMjIyMi9waWN0dXJlP3R5cGU9bGFyZ2UiLCJpYXQiOjE2MTgzODEyMzl9.5UKcJ_ffKEoowQw6h3jwAQdW_6s-sP3WxmTXMtasIlY',2592000,'2021-04-14 14:20:40'),
	(3,2,'native','test3@gmail.com','$2b$10$Y7MvhvfulHHkPDyHkXaYHukR/M5pvSwbVAxh.m8IMNR2/GvUC7HYW','test3',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJ0ZXN0MyIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwicGljdHVyZSI6bnVsbCwiaWF0IjoxNjE4MzgxMjM4fQ.cRSyq2mHEeYkcX5R0J7bzWDm46u-XA3-ap5Ad92W74Y',2592000,'2021-04-14 14:20:39'),
	(4,2,'native','arthur@gmail.com','$2b$10$fglIKeGkRDQCZ/GL0kzy8eAFehrz4p300VtyxY8fs602.aPn1/56a','arthur',NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6Im5hdGl2ZSIsIm5hbWUiOiJhcnRodXIiLCJlbWFpbCI6ImFydGh1ckBnbWFpbC5jb20iLCJwaWN0dXJlIjpudWxsLCJpYXQiOjE2MTgzODEyMzl9.HR3L_4K1SqM4_H_Uq1207bwcr9tqcM_uxB1rv1iH34M',2592000,'2021-04-14 14:20:39'),
	(5,2,'facebook','fakefbuser@gmail.com',NULL,'fake fb user','https://graph.facebook.com/1111/picture?type=large','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm92aWRlciI6ImZhY2Vib29rIiwibmFtZSI6ImZha2UgZmIgdXNlciIsImVtYWlsIjoiZmFrZWZidXNlckBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTExMS9waWN0dXJlP3R5cGU9bGFyZ2UiLCJpYXQiOjE2MTgzODEyMzl9.5NmZc7Wp_CeMHIrG9ki1wkyq1LPi1LqoI-ldBnSroo0',2592000,'2021-04-14 14:20:40');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table variant
# ------------------------------------------------------------

DROP TABLE IF EXISTS `variant`;

CREATE TABLE `variant` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `color_code` varchar(15) NOT NULL,
  `color_name` varchar(15) NOT NULL,
  `size` varchar(15) NOT NULL,
  `stock` int(10) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product` (`product_id`),
  CONSTRAINT `variant_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;

INSERT INTO `variant` (`id`, `color_code`, `color_name`, `size`, `stock`, `product_id`)
VALUES
	(1,'FFFFFF','白色','S',2,1),
	(2,'FFFFFF','白色','M',5,1),
	(3,'DDFFBB','亮綠','S',2,1),
	(4,'FFFFFF','白色','S',2,2),
	(5,'DDFFBB','亮綠','L',2,2);

/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
