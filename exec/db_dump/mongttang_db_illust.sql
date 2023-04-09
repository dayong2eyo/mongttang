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
-- Table structure for table `illust`
--

DROP TABLE IF EXISTS `illust`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `illust` (
  `illust_id` int(11) NOT NULL AUTO_INCREMENT,
  `illust_file_path` varchar(255) NOT NULL,
  `illust_original_filename` varchar(255) NOT NULL,
  `illust_page_number` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`illust_id`),
  KEY `FKj8m8aptyf3rel3l8ogubl67d0` (`book_id`),
  CONSTRAINT `FKj8m8aptyf3rel3l8ogubl67d0` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `illust`
--

LOCK TABLES `illust` WRITE;
/*!40000 ALTER TABLE `illust` DISABLE KEYS */;
INSERT INTO `illust` VALUES
(1,'books/1/1/page02164013103895146','p0.jpg',0,1),
(2,'books/1/1/page12164013284184482','p01.jpg',1,1),
(3,'books/1/1/page22164013343593394','p02.jpg',2,1),
(4,'books/1/1/page32164013392154052','p03.jpg',3,1),
(5,'books/1/1/page42164013426204255','p04.jpg',4,1),
(6,'books/1/1/page52164013474157685','p05.jpg',5,1),
(7,'books/1/1/page62164013559969131','p06.jpg',6,1),
(8,'books/1/1/page72164013613332347','p09.jpg',7,1),
(9,'books/1/1/page82164013698915823','p10.jpg',8,1),
(10,'books/1/2/page02164064273222803','p0.jpg',0,2),
(11,'books/1/2/page12164064318895860','page01.jpg',1,2),
(12,'books/1/2/page22164064400307486','page02.jpg',2,2),
(13,'books/1/2/page32164064515087627','page03.jpg',3,2),
(14,'books/1/2/page42164064561292793','page04.jpg',4,2),
(15,'books/1/2/page52164064704329782','page05.jpg',5,2),
(16,'books/1/2/page62164064795491720','page06.jpg',6,2),
(17,'books/1/3/page02164141732419657','p0.jpg',0,3),
(18,'books/1/3/page12164141934408830','page03.jpg',1,3),
(19,'books/1/3/page22164142021406536','page04.jpg',2,3),
(20,'books/1/3/page32164142114634744','page05.jpg',3,3),
(21,'books/1/3/page42164142183372155','page06.jpg',4,3),
(22,'books/1/3/page52164142269150794','page07.jpg',5,3),
(23,'books/1/3/page62164142308364525','page08.jpg',6,3),
(24,'books/1/4/page02164224624999695','real0.jpg',0,4),
(25,'books/1/4/page12164224718707274','real1.jpg',1,4),
(26,'books/1/4/page22164224813355060','real2.jpg',2,4),
(27,'books/1/4/page32164224891432454','real3.jpg',3,4),
(28,'books/1/4/page42164225000348085','real4.jpg',4,4),
(29,'books/1/4/page52164225034067838','real5.jpg',5,4),
(30,'books/1/4/page62164225121910352','real6.jpg',6,4),
(31,'books/1/4/page72164225204610660','real7.jpg',7,4),
(32,'books/1/4/page82164225250547366','real8.jpg',8,4),
(33,'books/1/4/page92164225341568269','real9.jpg',9,4),
(34,'books/1/4/page102164225445025506','real10.jpg',10,4),
(35,'books/1/4/page112164225518358962','real11.jpg',11,4),
(36,'books/1/4/page122164225611308882','real12.jpg',12,4),
(37,'books/1/4/page132164225711262889','real13.jpg',13,4),
(38,'books/2/5/page02164225389269618','p0.jpg',0,5),
(39,'books/2/5/page12164225448177222','page01.jpg',1,5),
(40,'books/2/5/page22164225486045110','page02.jpg',2,5),
(41,'books/2/5/page32164225522283149','page03.jpg',3,5),
(42,'books/2/5/page42164225619260683','page04.jpg',4,5),
(43,'books/2/5/page52164225658235914','page05.jpg',5,5),
(44,'books/2/5/page62164225698316914','page06.jpg',6,5),
(45,'books/2/5/page72164225734375393','page07.jpg',7,5),
(46,'books/2/5/page82164225766040171','page08.jpg',8,5),
(47,'books/2/5/page92164225837069423','page09.jpg',9,5),
(48,'books/2/5/page102164225913337260','page10.jpg',10,5),
(49,'books/2/6/page02164330521834886','p0.jpg',0,6),
(50,'books/2/6/page12164330564693770','page01.jpg',1,6),
(51,'books/2/6/page22164330614317204','page02.jpg',2,6),
(52,'books/2/6/page32164330653257371','page03.jpg',3,6),
(53,'books/2/6/page42164330729131238','page04.jpg',4,6),
(54,'books/2/6/page52164330822125275','page05.jpg',5,6),
(55,'books/2/6/page62164330874228160','page06.jpg',6,6),
(56,'books/2/6/page72164330954429301','page07.jpg',7,6),
(57,'books/2/6/page82164331010717161','page08.jpg',8,6),
(58,'books/2/7/page02164458458767179','p0.jpg',0,7),
(59,'books/2/7/page12164458534701196','page01.jpg',1,7),
(60,'books/2/7/page22164458614784538','page02.jpg',2,7),
(61,'books/2/7/page32164458659511134','page03.jpg',3,7),
(62,'books/2/7/page42164458737398956','page04.jpg',4,7),
(63,'books/2/7/page52164458806877574','page05.jpg',5,7),
(64,'books/2/7/page62164458854283859','page06.jpg',6,7),
(65,'books/2/7/page72164458916397709','page07.jpg',7,7),
(66,'books/2/7/page82164459035180663','page08.jpg',8,7),
(67,'books/2/7/page92164459112329133','page09.jpg',9,7),
(68,'books/2/7/page102164459154200936','page10.jpg',10,7),
(69,'books/3/8/page02164519736717545','p0.jpg',0,8),
(70,'books/3/8/page12164519777960868','p1.jpg',1,8),
(71,'books/3/8/page22164519856138369','p2.jpg',2,8),
(72,'books/3/9/page02164557255831329','p0.jpg',0,9),
(73,'books/3/9/page12164557338860914','p1.jpg',1,9),
(74,'books/3/9/page22164557421205016','p2.jpg',2,9),
(75,'books/3/10/page02164594883273805','p0.jpg',0,10),
(76,'books/3/10/page12164594937104865','p1.jpg',1,10),
(77,'books/3/10/page22164594976523980','p2.jpg',2,10),
(78,'books/4/11/page02164652221795702','p0.jpg',0,11),
(79,'books/4/11/page12164652261782311','page01.jpg',1,11),
(80,'books/4/11/page22164652296614161','page02.jpg',2,11),
(81,'books/4/11/page32164652332399748','page03.jpg',3,11),
(82,'books/4/11/page42164652368078355','page04.jpg',4,11),
(83,'books/4/11/page52164652408795869','page05.jpg',5,11),
(84,'books/4/11/page62164652478118694','page06.jpg',6,11),
(85,'books/4/12/page02164770050418739','p0.jpg',0,12),
(86,'books/4/12/page12164770090951370','page01.jpg',1,12),
(87,'books/4/12/page22164770121615672','page02.jpg',2,12),
(88,'books/4/12/page32164770153285316','page03.jpg',3,12),
(89,'books/4/12/page42164770182968506','page04.jpg',4,12),
(90,'books/4/12/page52164770214389816','page04.jpg',5,12),
(91,'books/4/12/page62164770242814105','page05.jpg',6,12),
(92,'books/4/12/page72164770273704629','page06.jpg',7,12),
(93,'books/4/12/page82164770312490376','page07.jpg',8,12),
(94,'books/4/12/page92164770345166057','page08.jpg',9,12),
(95,'books/4/12/page102164770377833527','page09.jpg',10,12),
(96,'books/4/12/page112164770413570675','page10.jpg',11,12),
(97,'books/4/12/page122164770475526589','page11.jpg',12,12),
(98,'books/4/12/page132164770509808990','page12.jpg',13,12),
(99,'books/4/13/page02164843368860955','p0.jpg',0,13),
(100,'books/4/13/page12164843409045254','page01.jpg',1,13),
(101,'books/4/13/page22164843479583681','page02.jpg',2,13),
(102,'books/4/13/page32164843530754856','page03.jpg',3,13),
(103,'books/4/13/page42164843567845536','page04.jpg',4,13),
(104,'books/4/13/page52164843603505527','page05.jpg',5,13),
(105,'books/4/13/page62164843689512283','page06.jpg',6,13),
(106,'books/4/13/page72164843776482125','page07.jpg',7,13),
(107,'books/4/13/page82164843821450418','page08.jpg',8,13),
(108,'books/4/13/page92164843856050281','page09.jpg',9,13),
(109,'books/4/13/page102164843892792239','page10.jpg',10,13),
(110,'books/5/14/page02164918254700385','p0.jpg',0,14),
(111,'books/5/14/page12164918326592834','page01.jpg',1,14),
(112,'books/5/14/page22164918397587652','page02.jpg',2,14),
(113,'books/5/14/page32164918434917775','page03.jpg',3,14),
(114,'books/5/14/page42164918485119762','page04.jpg',4,14),
(115,'books/5/14/page52164918522001708','page05.jpg',5,14),
(116,'books/5/14/page62164918554571825','page06.jpg',6,14),
(117,'books/5/14/page72164918590512373','page07.jpg',7,14),
(118,'books/5/14/page82164918670975670','page08.jpg',8,14),
(119,'books/5/15/page02164981222315485','p0.jpg',0,15),
(120,'books/5/15/page12164981283746521','page01.jpg',1,15),
(121,'books/5/15/page22164981338681744','page02.jpg',2,15),
(122,'books/5/15/page32164981375367204','page03.jpg',3,15),
(123,'books/5/15/page42164981415431275','page04.jpg',4,15),
(124,'books/5/15/page52164981451434577','page05.jpg',5,15),
(125,'books/5/15/page62164981560272920','page06.jpg',6,15),
(126,'books/5/15/page72164981625632924','page07.jpg',7,15),
(127,'books/5/15/page82164981743537140','page08.jpg',8,15),
(128,'books/5/16/page02165039206531660','p0.jpg',0,16),
(129,'books/5/16/page12165039260933653','page01.jpg',1,16),
(130,'books/5/16/page22165039355920190','page02.jpg',2,16),
(131,'books/5/16/page32165039434292982','page03.jpg',3,16),
(132,'books/5/16/page42165039512494327','page04.jpg',4,16),
(133,'books/5/16/page52165039583005377','page05.jpg',5,16),
(134,'books/5/16/page62165039620250049','page06.jpg',6,16),
(135,'books/5/16/page72165039665274858','page07.jpg',7,16),
(136,'books/5/16/page82165039734086412','page08.jpg',8,16),
(137,'books/6/17/page02165118415274398','p0.jpg',0,17),
(138,'books/6/17/page12165118459718600','page01.jpg',1,17),
(139,'books/6/17/page22165118494536136','page02.jpg',2,17),
(140,'books/6/17/page32165118572335159','page03.jpg',3,17),
(141,'books/6/17/page42165118637259093','page04.jpg',4,17),
(142,'books/6/17/page52165118673149860','page05.jpg',5,17),
(143,'books/6/17/page62165118745354036','page06.jpg',6,17),
(144,'books/6/17/page72165118831073734','page07.jpg',7,17),
(145,'books/6/17/page82165118906269661','page08.jpg',8,17),
(146,'books/6/17/page92165118973823034','page09.jpg',9,17),
(147,'books/6/17/page102165119023414746','page10.jpg',10,17),
(148,'books/6/18/page02165193539779293','p0.jpg',0,18),
(149,'books/6/18/page12165193582374420','page01.jpg',1,18),
(150,'books/6/18/page22165193636640300','page02.jpg',2,18),
(151,'books/6/18/page32165193690225515','page03.jpg',3,18),
(152,'books/6/18/page42165193762251762','page04.jpg',4,18),
(153,'books/6/18/page52165193816281443','page05.jpg',5,18),
(154,'books/6/18/page62165193895690932','page05.jpg',6,18),
(155,'books/6/18/page72165193971557759','page06.jpg',7,18),
(156,'books/6/18/page82165194008164012','page07.jpg',8,18),
(157,'books/6/18/page92165194037261456','page08.jpg',9,18),
(158,'books/6/18/page102165194080205134','page09.jpg',10,18),
(159,'books/6/19/page02165297322868568','p0.jpg',0,19),
(160,'books/6/19/page12165297386306270','page01.jpg',1,19),
(161,'books/6/19/page22165297445330613','page02.jpg',2,19),
(162,'books/6/19/page32165297502462297','page03.jpg',3,19),
(163,'books/6/19/page42165297560650949','page04.jpg',4,19),
(164,'books/6/19/page52165297590725061','page05.jpg',5,19),
(165,'books/6/19/page62165297621947312','page06.jpg',6,19);
/*!40000 ALTER TABLE `illust` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 13:11:29
