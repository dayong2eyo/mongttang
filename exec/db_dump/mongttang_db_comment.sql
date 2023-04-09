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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `comment_content` varchar(1000) DEFAULT NULL,
  `comment_status` tinyint(1) NOT NULL DEFAULT 1,
  `comment_book_id` int(11) NOT NULL,
  `comment_user_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKlwlyeu855ndi3pry5ixnxwg2p` (`comment_book_id`),
  KEY `FKg2l4shfkbp38lr4gyhsk3ntfi` (`comment_user_id`),
  CONSTRAINT `FKg2l4shfkbp38lr4gyhsk3ntfi` FOREIGN KEY (`comment_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKlwlyeu855ndi3pry5ixnxwg2p` FOREIGN KEY (`comment_book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES
(1,'2023-04-07 03:31:28','2023-04-07 03:31:28','그림체가 참 아기자기하네요',1,5,4),
(2,'2023-04-07 03:31:43','2023-04-07 03:31:43','이 이야기는 매우 감동적입니다. 고양이와 왕자의 이야기가 마음에 와닿고, 왕자가 할아버지로부터 받은 교훈을 따라 행동하며 성장하는 과정이 인상적입니다. 작가의 이야기 풀이와 글쓰기 능력이 훌륭합니다',1,8,4),
(3,'2023-04-07 03:31:58','2023-04-07 03:31:58','이 이야기는 지나치게 낙화(落話)적인 면이 있어서 실제 세상에서는 어떻게든 다른 사람들에게 무관심한 사람들도 있기 때문에 현실성이 떨어진다고 생각합니다. 좀 더 현실적인 이야기로 만들어졌다면 더욱 공감이 가고 인상적이었을 것 같습니다',1,9,4),
(4,'2023-04-07 03:32:16','2023-04-07 03:32:16','좀 더 현실적인 이야기로 만들어졌다면 더욱 공감이 가고 인상적이었을 것 같습니다',1,11,4),
(5,'2023-04-07 03:33:23','2023-04-07 03:33:23','이야기에서 왕자의 변화가 너무 급격하게 일어난 것 같아요. 왕자가 고양이를 만나고 나서 갑자기 선량한 사람으로 변했다는 것이 이해하기 어려웠습니다. 더 자연스러운 전개를 보여줄 수 있었다면 더 좋았을 것 같습니다',1,11,5),
(6,'2023-04-07 03:33:39','2023-04-07 03:33:39','이야기의 왕자처럼, 우리도 모든 것을 자신만 생각하는 것이 아니라 다른 사람들과 함께 나누는 것이 중요하다는 것을 기억해야 합니다. 이 이야기는 좋은 교훈을 가지고 있으며, 우리 모두가 그것을 따라가면 세상이 더 나은 곳이 될 것입니다',1,5,5),
(7,'2023-04-07 03:35:18','2023-04-07 03:35:18','이 이야기에서 나라 사람들은 서로를 돕고 지지하며, 부유함과 행복을 함께 얻었습니다. 이것은 우리 모두에게 좋은 가르침입니다. 함께 일하고, 서로를 돕는 것이 우리 모두에게 좋은 결과를 가져올 것입니다.',1,15,6),
(8,'2023-04-07 03:37:54','2023-04-07 03:37:54','이 이야기는 우리가 어떻게 살아가야 할지에 대한 좋은 가르침입니다. 서로를 돕고 지지하며, 사랑과 친절함으로 가득 찬 세상이 얼마나 좋을지 상상해볼 수 있습니다.',1,14,6),
(9,'2023-04-07 03:39:16','2023-04-07 03:39:16','그림이 참 이뻐요',1,17,1),
(10,'2023-04-07 03:39:52','2023-04-07 03:39:52','동물의 시대가 오는 상상을 할 수 있어서 좋았어요.',1,5,7),
(11,'2023-04-07 03:40:11','2023-04-07 03:40:11','안녕하세요 나작가입니다^^ 고양이와 왕자는 제가 2년의 고민 끝에 출간한 동화입니다. 재미있게 봐주시고 많은 관심과 사랑 부탁드립니다! 독자 여러분 항상 건강하시고 새해 복 많이 받으세요',1,4,3),
(12,'2023-04-07 03:40:38','2023-04-07 03:40:38','저는 고양이보다 강아지를 좋아하지만, 이런 고양이라면 한 마리 쯤 나쁘지 않을 것 같네요',1,2,7),
(13,'2023-04-07 03:40:57','2023-04-07 03:40:57','작가님 그림 수준이 나날이 높아지는 것 같아요 ㄷㄷ',1,4,7),
(14,'2023-04-07 03:41:25','2023-04-07 03:41:25','동화에서 현실성을 따지실거면 수필을 읽으시는게 어떨까요?',1,9,7),
(15,'2023-04-07 03:45:07','2023-04-07 03:45:07','용 이야기는 언제나 재미있죠 어린시절로 돌아가서 모험을 하는 기분이었습니다!',1,15,7),
(16,'2023-04-07 03:52:48','2023-04-07 03:52:48','마법의 사탕..어렸을 때 자주 먹었던 왕눈사탕이 생각나네요..잠시 학창시절로 돌아간 듯한 기분이였습니다. 너무 재미있네요',1,6,8),
(17,'2023-04-07 03:54:32','2023-04-07 03:54:32','나의 가장 특별한 고양이..나한테 가장 특별한 추억이 뭐였을까 하는 생각이 들게 하는 동화였습니다. 제게도 특별한 고양이가 있었으면 좋겠네요 잘 봤습니다.',1,2,8),
(18,'2023-04-07 03:55:22','2023-04-07 03:55:22','재미있게 읽었습니다.',1,16,8),
(19,'2023-04-07 03:55:47','2023-04-07 03:55:47','너무 재미있네요 울다 웃다..엉덩이에 뿔 났어요',1,1,8),
(20,'2023-04-07 03:56:29','2023-04-07 03:56:29','고양이 그림이 좀..어린 아이들이 보기에 살짝 무서울 수도 있을 것 같아요',1,3,8),
(21,'2023-04-07 03:56:57','2023-04-07 03:56:57','금을 만드는 마법이라니 저도 그런 마법 한번쯤 배워보고 싶네욯ㅎㅎㅎ',1,7,8);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-07 13:11:26
