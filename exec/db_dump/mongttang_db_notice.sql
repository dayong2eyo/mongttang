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
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `created_time` datetime DEFAULT NULL,
  `updated_time` datetime DEFAULT NULL,
  `notice_content` text NOT NULL,
  `notice_title` varchar(255) NOT NULL,
  PRIMARY KEY (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT INTO `notice` VALUES
(1,'2023-04-07 12:16:33','2023-04-07 12:16:33','안녕하세요. 몽땅연필 관리팀입니다.\n3월 16일 화요일에 총 6시간에 걸쳐 서비스 점검이 시작됩니다.\n[점검 예상 시간] 09:00 ~ 15:00\n이용에 불편을 드려서 죄송합니다.','[공지] 서비스 점검시간 안내'),
(2,'2023-04-07 12:16:35','2023-04-07 12:16:35','안녕하세요. 몽땅연필 관리팀입니다. 저희 서비스는 항상 건강한 인터넷 문화 정착을 위해 노력하고 있습니다. 하지만 최근 일부 사용자분들께서 욕설, 비하, 선정적인 내용 등 부적절한 게시글을 올리는 경우가 빈번히 발생하여, 이에 대한 제재 조치를 시행하고자 합니다. 아래와 같은 내용의 게시글은 제재 대상입니다.\n\n 1.욕설, 비하, 혐오 발언 등 부적절한 언어 사용\n 2.선정적인 내용의 게시물 개인정보 유출 등 법적 문제가 될 수 있는 게시물\n 3.상업적 목적으로의 홍보 게시물\n\n 이와 같은 게시글을 올릴 경우, 관리자의 제재 조치를 받을 수 있습니다. 제재 조치는 경고, 게시글 삭제, 이용 제한 등의 방법으로 이루어질 수 있으며, 경우에 따라 계정 삭제 등의 조치도 이루어질 수 있습니다. 저희 몽땅연필은 모든 사용자분들이 즐거운 인터넷 환경에서 소통할 수 있도록 최선을 다하겠습니다. 감사합니다.','[공지] 게시글 제재 관련 안내'),
(3,'2023-04-07 12:16:36','2023-04-07 12:16:36','안녕하세요. 몽땅연필 관리팀입니다. 3월 16일에 진행된 서비스 업데이트에 대한 공지입니다. 본 업데이트 내용은 다음과 같습니다.\n\n 개선된 기능: 지갑 생성 속도 향상\n 버그 수정: 동화 생성 과정에서 발견된 버그 수정\n\n 여러분들의 보다 나은 서비스 이용을 위해 계속해서 노력하는 몽땅연필이 되겠습니다. 감사합니다.','[공지] 서비스 업데이트 안내'),
(4,'2023-04-07 12:16:38','2023-04-07 12:16:38','안녕하세요. 몽땅연필 관리팀입니다. 최근 몽땅연필 챌린지에서 우승하신 나작가님의 새로운 동화가 드디어 출간되었습니다. 나작가님의 동화는 몽땅연필과 오프라인 서점에서 만나보실 수 있습니다. 또한, 이번 출간을 기념하여 선착순으로 이벤트를 진행하오니 많은 관심 부탁드립니다.\n책을 통해 많은 분들께 도움이 되고, 즐거움을 선사할 수 있도록 최선을 다하겠습니다.\n감사합니다.','[공지] 나작가님의 도서 출간 알림'),
(5,'2023-04-07 12:16:39','2023-04-07 12:16:39','안녕하세요. 몽땅연필 관리팀입니다.\n\n저희 서비스는 보다 원활한 회원관리와 서비스 제공을 위해 회원관리 정책을 변경하게 되었습니다. 변경된 정책은 아래와 같습니다.\n\n1. 휴면 회원 제도 도입: 일정 기간 이상 로그인하지 않은 회원은 휴면 회원으로 분류됩니다. 휴면 회원은 서비스 이용에 제한이 있을 수 있습니다.\n\n2. 회원 탈퇴 시 데이터 보존 정책 변경: 회원 탈퇴 시 일부 데이터는 보존됩니다. 이는 추후 분쟁 조정, 법적 문제 해결 등을 위한 것입니다.\n\n위 정책 변경은 2023년 4월 15일부터 시행됩니다. 변경된 정책에 따라 불편함이 있을 수 있으나, 고객님의 보다 원활한 서비스 이용을 위한 조치입니다. 이용에 참고해주시기 바랍니다.\n\n여러분들의 보다 나은 서비스 이용을 위해 계속해서 노력하는 몽땅연필이 되겠습니다. 감사합니다','[공지] 회원관리 정책 변경 안내'),
(6,'2023-04-07 12:16:41','2023-04-07 12:16:41','안녕하세요. 몽땅연필 관리팀입니다.\n\n저희 서비스는 어뷰징 행위를 엄격히 금지하고 있습니다. 하지만 최근 일부 회원들이 어뷰징 행위를 저지르고 있어 이에 대한 제재 조치를 취하게 되었습니다.\n\n해당 회원들은 일부 서비스 이용에 제한을 받으며, 어뷰징 행위가 확인될 경우 해당 회원의 계정은 영구 제재될 수 있습니다. 또한 법적 책임을 물을 수도 있습니다.\n\n저희 서비스는 어뷰징 행위를 막기 위해 노력하고 있습니다. 만약 어뷰징 행위를 목격하신 경우, 즉시 신고해주시기 바랍니다. 고객님들의 적극적인 협조를 부탁드립니다.\n\n여러분들의 보다 나은 서비스 이용을 위해 계속해서 노력하는 몽땅연필이 되겠습니다. 감사합니다.','[공지] 어뷰징 회원 제재 안내'),
(7,'2023-04-07 12:16:43','2023-04-07 12:16:43','안녕하세요. 몽땅연필 관리팀입니다.\n\n저희 서비스에서는 다양한 동화를 자유롭게 작성하실 수 있습니다. 그러나 고객님들의 동화 작성이 원활하고 안전하게 이루어질 수 있도록 동화 작성 가이드라인을 마련하였습니다. 자세한 내용은 아래와 같습니다.\n\n1.제공되는 동화의 줄거리를 벗어나는 내용 작성 금지\n2.동화의 분량 10~20장 권장\n3.타인의 명예를 훼손하거나 저작권을 침해하는 동화 작성 엄격히 금지\n\n위 동화 작성 가이드라인은 저희 서비스의 안전하고 원활한 운영을 위해 필요한 것입니다. 고객님들께서는 이 가이드라인을 따라 동화를 작성해주시기를 권장드립니다.\n\n여러분들의 보다 나은 서비스 이용을 위해 계속해서 노력하는 몽땅연필이 되겠습니다. 감사합니다.','[공지] 동화 작성 가이드라인 안내');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
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
