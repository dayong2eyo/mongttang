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
-- Table structure for table `paidbook`
--

DROP TABLE IF EXISTS `paidbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paidbook` (
  `paidbook_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  `paidbook_user_id` int(11) NOT NULL,
  PRIMARY KEY (`paidbook_id`),
  KEY `FKnn4b0m6y7ub5fl3acbybl9udm` (`paidbook_user_id`),
  CONSTRAINT `FKnn4b0m6y7ub5fl3acbybl9udm` FOREIGN KEY (`paidbook_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paidbook`
--

LOCK TABLES `paidbook` WRITE;
/*!40000 ALTER TABLE `paidbook` DISABLE KEYS */;
INSERT INTO `paidbook` VALUES
(1,'2023-04-07 03:37:09','2023-04-07 03:37:09',4,6),
(2,'2023-04-07 03:41:59','2023-04-07 03:41:59',4,7),
(3,'2023-04-07 03:49:59','2023-04-07 03:49:59',5,3),
(4,'2023-04-07 03:50:33','2023-04-07 03:50:33',15,3),
(5,'2023-04-07 03:52:22','2023-04-07 03:52:22',2,7),
(6,'2023-04-07 03:58:51','2023-04-07 03:58:51',2,1),
(7,'2023-04-07 04:00:39','2023-04-07 04:00:39',9,7),
(8,'2023-04-07 04:06:59','2023-04-07 04:06:59',10,7);
/*!40000 ALTER TABLE `paidbook` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 13:11:27
