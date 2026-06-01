-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: banco-mysql-08-projetomobilecoding-87ae.c.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.45

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '46c13613-4c86-11f1-9d6d-8a84d8eacd5a:1-27,
911a4324-5294-11f1-8718-62f9105da041:1-22,
cd4be979-53b1-11f1-97aa-125fade28384:1-177';

--
-- Table structure for table `alimento`
--

DROP TABLE IF EXISTS `alimento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimento`
--

LOCK TABLES `alimento` WRITE;
/*!40000 ALTER TABLE `alimento` DISABLE KEYS */;
INSERT INTO `alimento` VALUES (1,'Arroz Integral'),(2,'Arroz Branco'),(3,'Feijão Carioca'),(4,'Feijão Preto'),(5,'Frango Grelhado'),(6,'Patinho Moído'),(7,'Filé de Tilápia'),(8,'Ovo Cozido'),(9,'Ovo Estrelado'),(10,'Omelete Simples'),(11,'Pão Francês'),(12,'Pão de Forma Integral'),(13,'Tapioca'),(14,'Cuscuz'),(15,'Aveia em Flocos'),(16,'Banana'),(17,'Maçã'),(18,'Mamão'),(19,'Morango'),(20,'Abacaxi'),(21,'Batata Doce Cozida'),(22,'Batata Inglesa Cozida'),(23,'Mandioca Cozida'),(24,'Macarrão Integral'),(25,'Alface'),(26,'Tomate'),(27,'Cebola'),(28,'Cenoura Ralada'),(29,'Brócolis Cozido'),(30,'Espinafre'),(31,'Azeite de Oliva'),(32,'Castanha de Caju'),(33,'Pasta de Amendoim'),(34,'Queijo Cottage'),(35,'Queijo Minas Frescal'),(36,'Leite Desnatado'),(37,'Leite Integral'),(38,'Iogurte Natural'),(39,'Whey Protein'),(40,'Suco de Laranja Natural'),(41,'Café sem Açúcar'),(42,'Chá Verde'),(43,'Mel de Abelha'),(44,'Atum em Lata'),(45,'Sardinha em Lata'),(46,'Carne de Panela'),(47,'Lombo de Porco Grelhado'),(48,'Abacate'),(49,'Couve-Flor'),(50,'Abóbora Cozida');
/*!40000 ALTER TABLE `alimento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refeicao`
--

DROP TABLE IF EXISTS `refeicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refeicao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ref_tipo` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refeicao`
--

LOCK TABLES `refeicao` WRITE;
/*!40000 ALTER TABLE `refeicao` DISABLE KEYS */;
INSERT INTO `refeicao` VALUES (3,'Almoço'),(2,'Café da manhã'),(6,'Ceia'),(1,'Desjejum'),(5,'Jantar'),(4,'Lanche da tarde');
/*!40000 ALTER TABLE `refeicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refeicao_usuario`
--

DROP TABLE IF EXISTS `refeicao_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refeicao_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `refeicao` int NOT NULL,
  `alimento` int NOT NULL,
  `usuario` int NOT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_pertence_usuario` (`usuario`),
  KEY `fk_refeicao_pertence_refeicao` (`refeicao`),
  KEY `fk_alimento_pertence_alimento` (`alimento`),
  CONSTRAINT `fk_alimento_pertence_alimento` FOREIGN KEY (`alimento`) REFERENCES `alimento` (`id`),
  CONSTRAINT `fk_refeicao_pertence_refeicao` FOREIGN KEY (`refeicao`) REFERENCES `refeicao` (`id`),
  CONSTRAINT `fk_usuario_pertence_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refeicao_usuario`
--

LOCK TABLES `refeicao_usuario` WRITE;
/*!40000 ALTER TABLE `refeicao_usuario` DISABLE KEYS */;
INSERT INTO `refeicao_usuario` VALUES (1,3,50,1,0),(4,3,49,1,0),(5,3,49,2,0),(6,3,47,2,0),(7,3,40,2,0),(8,2,4,1,0),(9,2,6,1,0),(10,3,4,1,0),(11,3,18,1,0),(12,3,18,1,0),(13,3,18,1,0),(14,3,18,1,0),(15,3,18,1,0),(16,3,18,1,0),(17,3,18,1,0),(18,3,18,1,0),(19,3,18,1,0),(20,3,18,1,0),(21,3,18,1,0),(22,3,18,1,0),(23,3,17,1,0),(24,3,17,1,0),(25,3,17,1,0),(26,3,17,1,0),(27,3,17,1,0),(28,3,17,1,0),(29,3,17,1,0),(30,3,17,1,0),(31,3,17,1,0),(32,3,17,1,0),(33,3,17,1,0),(34,3,19,1,0),(35,3,19,1,0),(36,3,19,1,0),(37,3,19,1,0),(38,3,19,1,0),(39,3,16,1,0),(40,3,16,1,0),(41,3,16,1,0),(42,3,16,1,0),(43,3,16,1,0),(44,3,16,1,0),(45,3,16,1,0),(46,3,16,1,0),(47,3,20,1,0),(48,3,20,1,0),(49,3,20,1,0),(50,3,20,1,0),(51,3,20,1,0),(52,3,20,1,0),(53,3,39,1,0),(54,3,1,1,0),(55,3,1,1,0),(56,3,1,1,0),(57,3,18,1,0),(58,3,18,1,0),(59,3,18,1,0),(60,3,18,1,0),(61,3,18,1,0),(62,3,18,1,0),(63,3,18,1,0),(64,3,18,1,0),(65,3,18,1,0),(66,3,2,1,0),(67,3,2,1,0),(68,3,2,1,0),(69,3,14,1,0),(70,3,14,1,0),(71,3,14,1,0),(72,3,14,1,0),(73,3,14,1,0),(74,3,14,1,0),(75,3,39,1,0),(76,3,39,1,0),(77,6,50,9,0),(78,3,30,15,0),(79,4,30,5,0),(80,4,30,5,0),(81,4,30,5,0),(82,3,2,54,0),(83,3,2,54,3),(92,1,1,57,2),(93,1,6,57,1),(94,1,1,57,2),(95,2,2,57,1),(97,3,6,57,1),(102,4,5,57,1),(103,5,6,57,1),(104,6,1,57,1);
/*!40000 ALTER TABLE `refeicao_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome_completo` varchar(60) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `us_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Lucas Turbinado','lucas.silva@email.com'),(2,'Mariana','mariana.costa@email.com'),(3,'Pedro','pedro.santos@email.com'),(4,'Ana','ana.oliveira@email.com'),(5,'Boca de pinicu','rafael.souza@email.com'),(6,'Juliana','juliana.lima@email.com'),(7,'Carlos','carlos.ferreira@email.com'),(8,'Fernanda','fernanda.alves@email.com'),(9,'Marcos','marcos.ribeiro@email.com'),(10,'Camila','camila.gomes@email.com'),(11,'João','joao.martins@email.com'),(12,'Beatriz','beatriz.carvalho@email.com'),(13,'Gabriel','gabriel.mendes@email.com'),(14,'Larissa','larissa.nunes@email.com'),(15,'Thiago','thiago.rocha@email.com'),(16,'Letícia','leticia.barros@email.com'),(17,'Marcelo','marcelo.correia@email.com'),(18,'Amanda','amanda.teixeira@email.com'),(19,'Felipe','felipe.cavalcanti@email.com'),(20,'Bruna','bruna.dias@email.com'),(21,'Rodrigo','rodrigo.castro@email.com'),(22,'Patrícia','patricia.melo@email.com'),(23,'Bruno','bruno.freitas@email.com'),(24,'Carolina','carolina.cardoso@email.com'),(25,'Vitor','vitor.moura@email.com'),(26,'Isabela','isabela.borges@email.com'),(27,'Eduardo','eduardo.neves@email.com'),(28,'Natália','natalia.machado@email.com'),(29,'Leonardo','leonardo.guedes@email.com'),(30,'Renata','renata.monteiro@email.com'),(31,'Diego','diego.pinto@email.com'),(32,'Vanessa','vanessa.reis@email.com'),(33,'Guilherme','guilherme.moraes@email.com'),(34,'Tatiane','tatiane.nogueira@email.com'),(35,'Leandro','leandro.farias@email.com'),(36,'Aline','aline.batista@email.com'),(37,'Alexandre','alexandre.vieira@email.com'),(38,'Jéssica','jessica.cunha@email.com'),(39,'Daniel','daniel.ramos@email.com'),(40,'Priscila','priscila.pires@email.com'),(41,'Ricardo','ricardo.lopes@email.com'),(42,'Carla','carla.fonseca@email.com'),(43,'Fernando','fernando.araujo@email.com'),(44,'Bianca','bianca.pacheco@email.com'),(45,'André','andre.xavier@email.com'),(46,'Raquel','raquel.duarte@email.com'),(47,'Igor','igor.andrade@email.com'),(48,'Thaís','thais.medeiros@email.com'),(49,'Caio','caio.peixoto@email.com'),(50,'Cláudia','claudia.tavares@email.com'),(51,'Jão','jao@teste.com'),(52,'Jão Oliveira','jaoOliveira@teste.com'),(53,'Novo Jão','jao.novo@email.com'),(54,'kodrau boca de pinicu','kodraumachoalfa@email.com'),(55,'Teste Perfil Atualizado','perfil@notfat.app'),(56,'Inu','user@notfat.app'),(57,'Joao dador de caneco','eduardo75felipe@gmail.com');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-31 22:13:48
