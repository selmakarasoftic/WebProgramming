-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: autoverse
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `engine` varchar(255) NOT NULL,
  `horsepower` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cars_user` (`user_id`),
  CONSTRAINT `fk_cars_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(2,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(3,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(4,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(5,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(6,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(7,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(8,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(9,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(10,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(11,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(12,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(13,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(14,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(15,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(16,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(17,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(18,14,'Audi A4 S-line',2022,'2.0 TFSI',190,'https://example.com/audi.jpg'),(19,19,'Updated Model',2030,'Electric Pro',999,'updated.jpg'),(20,19,'TestCar 3000',2025,'Turbo-Electric',500,'assets/images/car.jpg');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_gal_emp` (`user_id`),
  CONSTRAINT `fk_gal_emp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:42:44'),(2,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:54:23'),(9,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:57:29'),(10,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:57:35'),(11,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:57:42'),(12,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:57:50'),(13,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 01:58:44'),(16,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 02:44:28'),(17,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-01 21:19:28'),(18,14,'Updated Audi Gallery','https://example.com/gallery/audi.jpg','2025-04-02 11:11:30'),(19,19,'Test Photo','assets/images/testphoto.jpg','2025-04-03 00:11:59'),(20,19,'Test Pic','assets/images/photo.jpg','2025-04-03 00:31:54');
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetups`
--

DROP TABLE IF EXISTS `meetups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) NOT NULL,
  `organizer_id` int(11) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_meet_emp` (`organizer_id`),
  CONSTRAINT `fk_meet_emp` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetups`
--

LOCK TABLES `meetups` WRITE;
/*!40000 ALTER TABLE `meetups` DISABLE KEYS */;
INSERT INTO `meetups` VALUES (1,'AutoVerse Sarajevo Meetup','2025-04-10','Skenderija Hall',14,'Join us for a gathering of car enthusiasts!'),(2,'Updated Meetup','2025-07-01','New City',19,'Updated description.'),(3,'Test Meetup','2025-06-10','Test City',19,'For testing purposes.');
/*!40000 ALTER TABLE `meetups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `review_text` text NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  PRIMARY KEY (`id`),
  KEY `fk_rev_emp` (`user_id`),
  KEY `fk_rev_som` (`car_id`),
  CONSTRAINT `fk_rev_emp` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (5,14,2,'Updated Review','Very comfortable and smooth ride.',5),(6,14,3,'Updated Review','Very comfortable and smooth ride.',5),(7,14,4,'Updated Review','Very comfortable and smooth ride.',5),(8,14,5,'Updated Review','Very comfortable and smooth ride.',5),(9,14,6,'Updated Review','Very comfortable and smooth ride.',5),(10,14,7,'Updated Review','Very comfortable and smooth ride.',5),(11,14,8,'Updated Review','Very comfortable and smooth ride.',5),(12,14,9,'Updated Review','Very comfortable and smooth ride.',5),(13,14,10,'Updated Review','Very comfortable and smooth ride.',5),(14,14,11,'Updated Review','Very comfortable and smooth ride.',5),(15,14,12,'Updated Review','Very comfortable and smooth ride.',5),(16,14,13,'Updated Review','Very comfortable and smooth ride.',5),(17,14,14,'Updated Review','Very comfortable and smooth ride.',5),(18,14,15,'Updated Review','Very comfortable and smooth ride.',5),(19,14,16,'Updated Review','Very comfortable and smooth ride.',5),(20,14,17,'Updated Review','Very comfortable and smooth ride.',5),(21,14,18,'Updated Review','Very comfortable and smooth ride.',5),(22,19,19,'Updated Review','Actually not that smooth...',3),(23,19,19,'Awesome Ride','Very smooth and futuristic.',5);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('guest','admin') NOT NULL DEFAULT 'guest',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'selma','selma@gmail.com','$2y$10$Cc7USWGONkfDcr/YhX1a6uO5920s0uT6O3NvRllwsI3MPFAqY4iP6','guest','2025-04-01 01:16:51'),(13,'noviUser','noviUser@gmail.com','$2y$10$E0S8eOfEVyu8oN29Wqw3AuliojYkmXWWLm/9lNbizfTi55JbSdmGC','admin','2025-04-01 01:17:41'),(14,'updated_selma','selma_test@example.com','password','admin','2025-04-01 01:42:44'),(19,'updateduser','updated@example.com','$2y$10$EVzwzWGmW0e3TOaj.hCrH.bf51ja39MXK5/hqNpSA.4GFHscc0vjG','guest','2025-04-03 00:11:59');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'autoverse'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03  3:12:18
