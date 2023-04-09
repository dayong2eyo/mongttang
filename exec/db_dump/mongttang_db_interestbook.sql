-- MariaDB dump 10.19  Distrib 10.11.2-MariaDB, for Win64 (AMD64)
--
-- Host: j8a308.p.ssafy.io    Database: mongttang_db
-- ------------------------------------------------------
-- Server version	10.3.38-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `interestbook`
--

DROP TABLE IF EXISTS `interestbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interestbook` (
  `interestbook_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `interestbook_book_id` int(11) NOT NULL,
  `interestbook_user_id` int(11) NOT NULL,
  PRIMARY KEY (`interestbook_id`),
  KEY `FKmm3u12trc9lpio3sd1mgql0co` (`interestbook_book_id`),
  KEY `FK700ocvuupbcjmnp0a4v78bc0i` (`interestbook_user_id`),
  CONSTRAINT `FK700ocvuupbcjmnp0a4v78bc0i` FOREIGN KEY (`interestbook_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKmm3u12trc9lpio3sd1mgql0co` FOREIGN KEY (`interestbook_book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interestbook`
--

LOCK TABLES `interestbook` WRITE;
/*!40000 ALTER TABLE `interestbook` DISABLE KEYS */;
INSERT INTO `interestbook` VALUES
(1,5,1),
(2,6,1),
(3,9,1),
(4,5,4),
(5,15,6),
(6,4,6),
(7,14,6),
(8,10,1),
(10,4,1),
(11,5,3),
(12,15,7),
(13,2,7),
(14,5,7),
(15,2,1);
/*!40000 ALTER TABLE `interestbook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 13:11:30
