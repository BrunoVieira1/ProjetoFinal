-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bar
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (3,'Brahma',1),(4,'Heineken',1),(5,'Marlboro',1),(6,'Doritos',1);
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debtor`
--

DROP TABLE IF EXISTS `debtor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debtor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  CONSTRAINT `debtor_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debtor`
--

LOCK TABLES `debtor` WRITE;
/*!40000 ALTER TABLE `debtor` DISABLE KEYS */;
INSERT INTO `debtor` VALUES (1,'Luan',100.00,'2024-11-25',1),(2,'Bruno',50.00,'2024-11-19',1),(3,'Eduardo',25.00,'2024-11-26',1),(4,'Pedro',75.00,'2024-11-26',1),(5,'Robson',15.00,'2024-11-24',1),(6,'Ruan',150.00,'2024-11-26',1);
/*!40000 ALTER TABLE `debtor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expenses`
--

DROP TABLE IF EXISTS `expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `expenses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reason` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expenses`
--

LOCK TABLES `expenses` WRITE;
/*!40000 ALTER TABLE `expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `expenses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProduct` int NOT NULL,
  `qtt` int NOT NULL,
  `total` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProduct` (`idProduct`) USING BTREE,
  KEY `idRequester` (`idRequester`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `position`
--

DROP TABLE IF EXISTS `position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `position`
--

LOCK TABLES `position` WRITE;
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
INSERT INTO `position` VALUES (1,'Owner'),(2,'Manager');
/*!40000 ALTER TABLE `position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idBrand` int NOT NULL,
  `type` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Brahma Lata 269Ml',3,'Cerveja Lata',2.79,1),(2,'Pilsnen Duplo Malte',3,'Lata',2.89,1),(6,'Cerveja Heineken Lata 350 ml',4,'Bebida',5.00,1),(7,'Cigarro marlboro  red',5,'Cigarro',12.00,1),(8,'Salgadinho Doritos Queijo Nacho 75g',6,'Salgadinho',10.00,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProduct` int NOT NULL,
  `minStock` int NOT NULL,
  `maxStock` int NOT NULL,
  `qtt` int NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  KEY `idProduct` (`idProduct`) USING BTREE,
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,1,10,100,86,1),(8,2,10,100,102,1),(9,6,10,50,5,1),(10,7,10,50,25,1),(11,8,10,50,25,1);
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockin`
--

DROP TABLE IF EXISTS `stockin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProduct` int NOT NULL,
  `qtt` int NOT NULL,
  `date` date NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  KEY `idProduct` (`idProduct`) USING BTREE,
  CONSTRAINT `stockin_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockin`
--

LOCK TABLES `stockin` WRITE;
/*!40000 ALTER TABLE `stockin` DISABLE KEYS */;
INSERT INTO `stockin` VALUES (1,2,12,'2024-09-17',1),(2,2,100,'2024-11-26',1),(3,1,100,'2024-09-05',1),(4,2,150,'2024-09-07',1),(5,6,50,'2024-09-10',1),(6,7,40,'2024-09-15',1),(7,8,60,'2024-09-20',1),(8,1,120,'2024-10-05',1),(9,2,160,'2024-10-08',1),(10,6,55,'2024-10-12',1),(11,7,45,'2024-10-18',1),(12,8,70,'2024-10-22',1),(13,1,110,'2024-11-03',1),(14,2,140,'2024-11-06',1),(15,6,60,'2024-11-10',1),(16,7,50,'2024-11-15',1),(17,8,80,'2024-11-20',1);
/*!40000 ALTER TABLE `stockin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockout`
--

DROP TABLE IF EXISTS `stockout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockout` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProduct` int NOT NULL,
  `qtt` int NOT NULL,
  `date` date NOT NULL,
  `idRequester` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`),
  KEY `idProduct` (`idProduct`) USING BTREE,
  CONSTRAINT `stockout_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockout`
--

LOCK TABLES `stockout` WRITE;
/*!40000 ALTER TABLE `stockout` DISABLE KEYS */;
INSERT INTO `stockout` VALUES (1,2,11,'2024-09-26',1),(4,2,1,'2024-11-04',1),(5,2,1,'2024-11-04',1),(6,2,1,'2024-11-04',1),(7,2,1,'2024-11-04',1),(8,2,1,'2024-11-04',1),(9,2,1,'2024-11-04',1),(10,1,1,'2024-11-04',1),(11,1,1,'2024-11-04',1),(12,1,1,'2024-11-04',1),(13,1,1,'2024-11-04',1),(14,2,1,'2024-11-04',1),(15,2,1,'2024-11-04',1),(16,2,1,'2024-11-04',1),(17,2,1,'2024-11-04',1),(18,2,1,'2024-11-04',1),(19,1,1,'2024-11-04',1),(20,1,1,'2024-11-04',1),(21,1,1,'2024-11-04',1),(22,1,1,'2024-11-04',1),(23,1,1,'2024-11-04',1),(24,1,1,'2024-11-04',1),(25,1,1,'2024-11-04',1),(26,1,1,'2024-11-04',1),(27,1,1,'2024-11-04',1),(28,1,1,'2024-11-04',1),(29,1,1,'2024-11-04',1),(30,1,1,'2024-11-04',1),(31,1,1,'2024-11-04',1),(32,1,1,'2024-11-04',1),(33,1,1,'2024-11-04',1),(34,1,1,'2024-11-04',1),(35,1,1,'2024-11-04',1),(36,1,1,'2024-11-04',1),(37,1,1,'2024-11-04',1),(38,1,1,'2024-11-04',1),(39,2,1,'2024-11-04',1),(40,1,10,'2024-09-06',1),(41,2,15,'2024-09-08',1),(42,6,5,'2024-09-11',1),(43,7,4,'2024-09-16',1),(44,8,6,'2024-09-21',1),(45,1,12,'2024-09-25',1),(46,2,18,'2024-09-30',1),(47,6,6,'2024-10-02',1),(48,7,5,'2024-10-06',1),(49,8,7,'2024-10-09',1),(50,1,11,'2024-10-15',1),(51,2,14,'2024-10-19',1),(52,6,6,'2024-10-25',1),(53,7,5,'2024-10-29',1),(54,8,8,'2024-11-01',1),(55,1,12,'2024-11-04',1),(56,2,16,'2024-11-07',1),(57,6,6,'2024-11-11',1),(58,7,6,'2024-11-16',1),(59,8,9,'2024-11-21',1),(60,1,20,'2024-09-06',1),(61,2,25,'2024-09-08',1),(62,6,15,'2024-09-11',1),(63,7,10,'2024-09-16',1),(64,8,15,'2024-09-21',1),(65,1,30,'2024-09-22',1),(66,2,35,'2024-09-23',1),(67,6,20,'2024-09-25',1),(68,7,12,'2024-09-26',1),(69,8,18,'2024-09-27',1),(70,1,25,'2024-09-30',1),(71,2,28,'2024-10-01',1),(72,6,18,'2024-10-02',1),(73,7,14,'2024-10-06',1),(74,8,22,'2024-10-09',1),(75,1,35,'2024-10-12',1),(76,2,40,'2024-10-15',1),(77,6,25,'2024-10-17',1),(78,7,16,'2024-10-20',1),(79,8,20,'2024-10-23',1),(80,1,40,'2024-10-26',1),(81,2,45,'2024-10-30',1),(82,6,30,'2024-11-02',1),(83,7,20,'2024-11-04',1),(84,8,25,'2024-11-05',1),(85,1,50,'2024-11-08',1),(86,2,55,'2024-11-10',1),(87,6,35,'2024-11-12',1),(88,7,25,'2024-11-15',1),(89,8,30,'2024-11-18',1),(90,1,60,'2024-11-20',1),(91,2,65,'2024-11-22',1),(92,6,40,'2024-11-24',1),(93,7,30,'2024-11-26',1),(94,8,35,'2024-11-27',1);
/*!40000 ALTER TABLE `stockout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `idPosition` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idPosition` (`idPosition`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'bruno','bruno','123','bruno@gmail',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27  7:03:41
