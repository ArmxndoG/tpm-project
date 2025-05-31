-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: checklist
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `atributos`
--

DROP TABLE IF EXISTS `atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atributos` (
  `id_atributo` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_atributo`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atributos`
--

LOCK TABLES `atributos` WRITE;
/*!40000 ALTER TABLE `atributos` DISABLE KEYS */;
INSERT INTO `atributos` VALUES (1,'Actividad','text'),(2,'Procedimiento','text'),(3,'Herramienta Material','text'),(4,'Tiempoo','text'),(5,'Responsable','text'),(17,'atributo de prueba','texto'),(35,'titulo nuevo 66','texto'),(36,'titulo nuevo 67','texto'),(37,'Actividad','texto'),(38,'Titulo de prueba 1','texto'),(39,'Titulo de prueba 2','texto'),(40,'Tiempo','texto'),(41,'Responsable','texto'),(42,'Herramienta material','texto'),(43,'Responsable','texto'),(44,'test','texto'),(45,'test2','texto'),(46,'test3','texto'),(47,'sadasd','texto'),(48,'asdasd','texto'),(49,'test','texto'),(50,'titulo de prueba 3','texto'),(51,'asdasdsad','texto'),(54,'dsasdasd','texto'),(55,'nnnnnnoooopo','texto'),(56,'Actividad','texto'),(57,'Tiempo','texto'),(58,'Responsable','texto'),(59,'Herramienta material','texto'),(60,'asd','texto'),(61,'asdasd','texto'),(62,'4353','texto'),(63,'test','texto'),(64,'TEST','texto'),(65,'TEST','texto'),(66,'TEST','texto'),(67,'','texto'),(68,'','texto'),(69,'TEST','texto'),(70,'','texto'),(71,'','texto'),(72,'tetts','texto'),(73,'ferfwdf','texto'),(74,'sdfsdfsd','texto'),(75,'resras','texto'),(76,'TEST','texto'),(77,'KJSNKADSKJSAD','texto'),(78,'LKDÑAKSDÑLASD','texto'),(79,'Actividad','texto'),(80,'Tiempo','texto'),(81,'Herramienta material','texto'),(82,'Responsable','texto'),(83,'Actividad','texto'),(84,'test','texto'),(85,'test','texto'),(86,'Titulo de prueba 3','texto'),(87,'Titulo test','texto'),(88,'dsfsdfsf','texto'),(89,'Actividad','texto'),(90,'Procedimiento','texto'),(91,'Herramienta material','texto'),(92,'Tiempo','texto'),(93,'Responsable','texto'),(94,'Actividad','texto'),(95,'Procedimiento','texto'),(96,'Herramienta material','texto'),(97,'Tiempo','texto'),(98,'Responsable','texto'),(99,'','texto'),(100,'test','texto'),(101,'asdasd','texto'),(102,'Actividad','texto'),(103,'Procedimiento','texto'),(104,'test','texto'),(105,'Actividad','texto'),(106,'Procedimiento','texto'),(107,'Herramienta material','texto'),(108,'Tiempo','texto'),(109,'Responsable','texto'),(110,'Actividad','texto'),(111,'Procedimiento','texto'),(112,'Herramienta material','texto'),(113,'Tempo','texto'),(114,'Actividad','texto'),(115,'Procedimiento','texto'),(116,'Tiempo','texto'),(117,'Herramienta material','texto'),(118,'Responsable','texto'),(119,'TEST','texto');
/*!40000 ALTER TABLE `atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ayudavisual`
--

DROP TABLE IF EXISTS `ayudavisual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ayudavisual` (
  `id_ayudaVisual` int(11) NOT NULL AUTO_INCREMENT,
  `id_punto` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_ayudaVisual`),
  KEY `id_punto` (`id_punto`),
  CONSTRAINT `ayudavisual_ibfk_1` FOREIGN KEY (`id_punto`) REFERENCES `puntos` (`id_punto`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ayudavisual`
--

LOCK TABLES `ayudavisual` WRITE;
/*!40000 ALTER TABLE `ayudavisual` DISABLE KEYS */;
INSERT INTO `ayudavisual` VALUES (62,1,'1741204751454-879006231.png'),(64,2,'1741204762471-565874551.png'),(65,3,'1741204793978-739440391.png'),(66,3,'1741204793998-717501474.png'),(67,3,'1741204794000-1958613.png'),(68,4,'1741204822152-762270266.png'),(69,8,'1741204832486-272122803.png'),(72,2,'1741365114222-570475895.png'),(73,1,'1742488312012-785947722.png'),(74,15,'1742415386830-635252838.png'),(75,15,'1742415386834-501228342.png'),(76,22,'1742483211529-706325909.png'),(77,22,'1742483211530-122953370.png'),(78,1,'1742488360415-196680207.png'),(80,41,'1742576254397-550264894.png'),(81,41,'1742576254399-251668777.png'),(82,46,'1742685788385-84196902.png'),(83,46,'1742685788385-619866987.png'),(84,48,'1742831688244-399819882.png'),(85,48,'1742831688249-465479143.png'),(86,50,'1743092123195-26902506.png'),(87,50,'1743092123197-852784513.png'),(88,51,'1743092304813-672944002.png'),(89,55,'1743390019784-671355895.png'),(90,55,'1743390019785-991592354.png'),(91,55,'1743390019785-374558811.png'),(92,56,'1743390219421-873974654.png');
/*!40000 ALTER TABLE `ayudavisual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_puntos`
--

DROP TABLE IF EXISTS `categorias_puntos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_puntos` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_puntos`
--

LOCK TABLES `categorias_puntos` WRITE;
/*!40000 ALTER TABLE `categorias_puntos` DISABLE KEYS */;
INSERT INTO `categorias_puntos` VALUES (1,'Seguridad','Puntos relacionados con sistemas mecánicos'),(2,'Eléctrica','Puntos relacionados con sistemas eléctricos');
/*!40000 ALTER TABLE `categorias_puntos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checklist`
--

DROP TABLE IF EXISTS `checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checklist` (
  `id_checklist` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `confirmacion` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id_checklist`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `checklist_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `checklist_ibfk_2` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=358 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checklist`
--

LOCK TABLES `checklist` WRITE;
/*!40000 ALTER TABLE `checklist` DISABLE KEYS */;
INSERT INTO `checklist` VALUES (330,1,1,'2025-03-14 09:47:52',1),(331,1,1,'2025-03-14 09:49:19',1),(332,1,1,'2025-03-14 11:56:56',0),(333,1,1,'2025-03-14 11:57:11',0),(334,1,1,'2025-03-14 10:31:08',1),(335,1,1,'2025-03-14 10:32:46',1),(337,1,44,'2025-03-15 11:38:50',1),(338,1,1,'2025-03-05 13:48:17',1),(343,1,1,'2025-03-18 18:24:37',0),(344,1,1,'2025-03-18 18:32:31',0),(345,1,1,'2025-03-18 18:32:49',0),(346,1,1,'2025-03-22 18:32:59',1),(347,1,1,'2025-03-18 18:40:36',1),(348,1,1,'2025-03-30 19:27:55',0),(349,1,1,'2025-03-30 19:30:36',0),(350,1,1,'2025-03-30 19:31:31',1),(351,1,47,'2025-03-30 21:01:56',0),(352,1,47,'2025-03-30 21:02:45',0),(353,1,47,'2025-03-30 21:03:02',0),(354,1,47,'2025-03-30 21:04:21',0),(355,1,47,'2025-03-30 21:04:48',0),(356,1,47,'2025-03-30 21:04:55',0),(357,1,47,'2025-03-30 21:09:38',1);
/*!40000 ALTER TABLE `checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuartos`
--

DROP TABLE IF EXISTS `cuartos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuartos` (
  `id_cuarto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cuarto` varchar(50) NOT NULL,
  PRIMARY KEY (`id_cuarto`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuartos`
--

LOCK TABLES `cuartos` WRITE;
/*!40000 ALTER TABLE `cuartos` DISABLE KEYS */;
INSERT INTO `cuartos` VALUES (1,'01 - GH Low Pressure Testing'),(2,'02 - Vibration Testing (ATF Oil & Coolant)'),(3,'03 - Vibration Testing (ATF Oil & Coolant)'),(4,'04 - GH Hydraulic Pulsation Testing'),(5,'05 - Future Expansion'),(6,'06 - Vibration Testing (Dry)'),(7,'07 - Climate Testing'),(8,'08 - Corrosion Testing'),(9,'09 - LAC, PS-CC, QMM-Lab SlpP Testing'),(10,'10 - GH Mechanical Testing'),(11,'11 - TC Testing'),(12,'12 - TC Testing (ATF Oil)');
/*!40000 ALTER TABLE `cuartos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_checklist`
--

DROP TABLE IF EXISTS `detalle_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_checklist` (
  `id_detalle` int(11) NOT NULL AUTO_INCREMENT,
  `id_tpm` int(11) NOT NULL,
  `id_punto` int(11) NOT NULL,
  `status` enum('ok','nok') NOT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_tpm` (`id_tpm`),
  KEY `id_punto` (`id_punto`),
  CONSTRAINT `detalle_checklist_ibfk_1` FOREIGN KEY (`id_tpm`) REFERENCES `checklist` (`id_checklist`),
  CONSTRAINT `detalle_checklist_ibfk_2` FOREIGN KEY (`id_punto`) REFERENCES `puntos` (`id_punto`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_checklist`
--

LOCK TABLES `detalle_checklist` WRITE;
/*!40000 ALTER TABLE `detalle_checklist` DISABLE KEYS */;
INSERT INTO `detalle_checklist` VALUES (219,330,3,'ok'),(220,330,4,'ok'),(221,330,37,'ok'),(222,330,1,'ok'),(223,331,3,'nok'),(224,331,4,'ok'),(225,331,37,'ok'),(226,331,1,'nok'),(227,334,1,'ok'),(228,334,3,'ok'),(229,334,4,'ok'),(230,334,48,'ok'),(231,335,1,'nok'),(232,335,3,'ok'),(233,335,4,'ok'),(234,335,48,'ok'),(236,337,47,'nok'),(237,338,1,'nok'),(238,338,3,'ok'),(239,338,4,'ok'),(240,338,48,'ok'),(242,340,1,'nok'),(243,340,3,'ok'),(244,340,4,'ok'),(245,340,48,'ok'),(246,340,49,'ok'),(247,346,1,'nok'),(248,346,3,'ok'),(249,346,4,'ok'),(250,346,48,'nok'),(251,346,49,'ok'),(252,347,1,'ok'),(253,347,3,'ok'),(254,347,4,'ok'),(255,347,48,'nok'),(256,347,49,'ok'),(257,350,1,'ok'),(258,350,3,'nok'),(259,350,4,'ok'),(260,350,48,'ok'),(261,350,49,'ok'),(262,357,55,'nok'),(263,357,56,'ok'),(264,357,57,'ok');
/*!40000 ALTER TABLE `detalle_checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_equipo` varchar(50) NOT NULL,
  `id_cuarto` int(11) NOT NULL,
  `activo` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id_equipo`),
  KEY `id_cuarto` (`id_cuarto`),
  CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`id_cuarto`) REFERENCES `cuartos` (`id_cuarto`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
INSERT INTO `equipos` VALUES (1,'Compresor A',1,1),(2,'SC7 80KN ATEX',2,1),(3,'Camara climatica 1',1,0),(4,'Camara climatica 2',1,1),(5,'Camara climatica 3',1,1),(11,'SC6 80KN RMS',3,1),(12,'HYP1',4,1),(13,'HYP2',4,1),(14,'HYP3',12,1),(15,'HYP4',4,1),(16,'HYP5',4,1),(17,'SC1 35KN',6,1),(18,'SC1 35KN-ST',6,1),(19,'SC3 62KN',6,1),(20,'SC4 80KN',6,1),(21,'SC5 80KN',6,1),(22,'CRHHS1',8,1),(23,'CRHHS2',8,1),(24,'CRH',8,1),(25,'equipo dinamita',5,1),(26,'nuevo equipo de prueba',11,0),(27,'test',7,1),(31,'asdasd',10,1),(33,'nuevo nombre',11,1),(34,'equipo nuevo nuevoo',1,0),(35,'nuevo equipo 2.0',1,0),(36,'asdasdsa',12,0),(37,'hola',1,0),(38,'chiller',12,1),(39,'nuevo equipo',1,0),(40,'L',1,0),(43,'EQUIPO DE PRUEBA',12,1),(44,'Equipo TEST',1,1),(45,'Nueva maquina ',5,0),(46,'Nueva maquina',12,1),(47,'NUEVO EQUIPO DE PRUEBA',1,1);
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `header`
--

DROP TABLE IF EXISTS `header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `header` (
  `id_header` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(45) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_header`),
  KEY `header_ibfk_1` (`id_equipo`),
  CONSTRAINT `header_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `header`
--

LOCK TABLES `header` WRITE;
/*!40000 ALTER TABLE `header` DISABLE KEYS */;
INSERT INTO `header` VALUES (1,'1741122255318-181626393.png',4),(5,'1741186716347-388254805.png',5),(7,'1741187818192-492768848.png',35),(8,'1741196296009-953115771.png',2),(9,'1741205577814-602884787.png',31),(11,'1742488133350-861467467.png',1),(12,'1742406889887-129182734.png',34),(13,'1742413781297-800648343.png',3),(14,'1742483141618-43864931.png',39),(15,'1742489225270-33680672.png',37),(16,'1742576185759-477380646.png',43),(17,'1743091911997-125785284.png',46),(18,'1743390180218-770892057.png',47);
/*!40000 ALTER TABLE `header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opl`
--

DROP TABLE IF EXISTS `opl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opl` (
  `id_opl` int(11) NOT NULL AUTO_INCREMENT,
  `id_detalle_tpm` int(11) NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `fotografia` varchar(255) DEFAULT NULL,
  `status` enum('abierto','cerrado') NOT NULL,
  PRIMARY KEY (`id_opl`),
  KEY `id_detalle_tpm` (`id_detalle_tpm`),
  CONSTRAINT `opl_ibfk_1` FOREIGN KEY (`id_detalle_tpm`) REFERENCES `detalle_checklist` (`id_detalle`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opl`
--

LOCK TABLES `opl` WRITE;
/*!40000 ALTER TABLE `opl` DISABLE KEYS */;
INSERT INTO `opl` VALUES (50,247,'No se muestra el mensaje de alarma en el monitor','1743294826879-355652888.png','abierto'),(51,247,'No se muestra el mensaje de alarma en el monitor','1743294826880-229088552.png','abierto'),(52,250,'DSDIJSKFJSDF','1743294826881-74482733.png','cerrado'),(53,255,'Se quebró el vidrio','1743295268820-935798103.png','abierto'),(54,255,'Se quebró el vidrio','1743295268820-599558624.png','abierto'),(55,255,'Se quebró el vidrio','1743295268820-257333662.png','abierto'),(56,255,'Se quebró el vidrio','1743295268822-22767289.png','abierto'),(57,255,'Se quebró el vidrio','1743295268824-267809630.png','abierto'),(58,258,'texto pruebasd asdkñdf','1743384821081-551448202.png','abierto'),(59,258,'texto pruebasd asdkñdf','1743384821081-595721759.png','abierto'),(60,262,'COMENTARIO DE PRUEBA','1743390726472-210909865.png','abierto'),(61,262,'COMENTARIO DE PRUEBA','1743390726472-835931331.png','abierto'),(62,262,'COMENTARIO DE PRUEBA','1743390726473-720811885.png','abierto');
/*!40000 ALTER TABLE `opl` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntos`
--

DROP TABLE IF EXISTS `puntos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntos` (
  `id_punto` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_punto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `puntos_ibfk_1` (`id_equipo`),
  CONSTRAINT `puntos_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id_equipo`),
  CONSTRAINT `puntos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_puntos` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntos`
--

LOCK TABLES `puntos` WRITE;
/*!40000 ALTER TABLE `puntos` DISABLE KEYS */;
INSERT INTO `puntos` VALUES (1,1,1,2,1),(2,1,1,6,0),(3,1,1,1,1),(4,1,2,3,1),(5,2,1,1,1),(6,2,1,2,1),(7,2,1,3,1),(8,1,1,4,0),(9,1,1,5,0),(14,3,1,1,0),(15,3,1,2,0),(16,4,1,1,1),(17,1,1,7,0),(18,1,1,8,0),(19,1,1,5,0),(20,1,1,6,0),(21,1,1,5,0),(22,39,1,1,1),(23,3,1,1,1),(24,5,1,1,1),(25,5,1,2,1),(26,1,1,6,0),(27,1,1,7,0),(28,34,1,1,0),(29,34,1,1,0),(30,34,1,1,1),(31,35,1,1,0),(32,35,1,1,1),(33,1,1,5,0),(34,1,1,5,0),(35,1,1,6,0),(36,37,1,1,1),(37,1,1,4,0),(38,27,1,1,1),(39,27,1,2,1),(40,27,1,3,1),(41,43,1,1,1),(42,43,1,2,1),(43,43,1,3,1),(44,43,1,4,1),(45,43,1,5,1),(46,1,1,5,0),(47,44,1,1,1),(48,1,1,5,1),(49,1,1,4,1),(50,46,1,1,1),(51,46,1,2,1),(52,46,1,3,0),(53,46,1,3,0),(54,46,1,3,0),(55,47,1,1,1),(56,47,1,2,1),(57,47,1,3,1),(58,47,1,4,0),(59,47,1,5,0),(60,47,1,6,0),(61,47,1,7,0),(62,47,1,8,0),(63,47,1,9,0),(64,47,1,10,0),(65,47,1,11,0),(66,47,1,12,0),(67,47,1,13,0),(68,47,1,14,0);
/*!40000 ALTER TABLE `puntos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntos_atributos`
--

DROP TABLE IF EXISTS `puntos_atributos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntos_atributos` (
  `id_pa` int(11) NOT NULL AUTO_INCREMENT,
  `id_punto` int(11) NOT NULL,
  `id_atributo` int(11) NOT NULL,
  `valor` varchar(500) NOT NULL,
  PRIMARY KEY (`id_pa`),
  KEY `id_punto` (`id_punto`),
  KEY `id_atributo` (`id_atributo`),
  CONSTRAINT `puntos_atributos_ibfk_1` FOREIGN KEY (`id_punto`) REFERENCES `puntos` (`id_punto`),
  CONSTRAINT `puntos_atributos_ibfk_2` FOREIGN KEY (`id_atributo`) REFERENCES `atributos` (`id_atributo`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntos_atributos`
--

LOCK TABLES `puntos_atributos` WRITE;
/*!40000 ALTER TABLE `puntos_atributos` DISABLE KEYS */;
INSERT INTO `puntos_atributos` VALUES (1,1,1,'Paro de emergencia'),(2,1,2,'Verificar que el paro de emergencia sea funcional, se encuentre bien colocado y que al presionarlo se muestre el mensaje de alarma en el monitor'),(3,1,3,'N/A'),(4,1,4,'1min'),(6,2,1,'Puertas y vidrio'),(7,2,2,'Verificar que ambas puertas se encuentren bien colocadas, especialmente la puerta pequeña. Verificar igualmente el vidrio, si este se encuentra fisurado o dañado el equipo no debe ser operado hasta su reemplazo.'),(8,2,3,'Herramienta x'),(9,2,4,'1min'),(10,2,5,'Operatoria'),(11,3,1,'Guardas de seguridad'),(12,3,2,'Revisar que las guardas alrederdor del equipo estén correctamente cerradas'),(13,3,3,'N/A'),(14,3,4,'1min'),(15,3,5,'Operatoria'),(16,4,1,'Panel de control '),(17,4,2,'Verificar que al presionar el botón de System power el botón se retroilumine y encienda la lampara que se encuentra al interior del equipo. revisar que al presionar el botón Xray Power se retroilumine y active la bomba de refrigerante. Checar que al presionar el botón rojo 0 apague la lampara interna. '),(53,5,37,'t1'),(54,8,38,'valor prueba 1'),(55,8,39,'valor prueba 2'),(56,5,40,'asdasdas'),(57,5,41,'asdasdsad'),(58,5,42,'asd'),(59,1,43,'Operatoria'),(72,6,56,'asdasdasdadsasd'),(73,6,57,'tgrdfsdfsdf'),(74,6,58,'sadasdasd'),(75,6,59,'N/A'),(76,7,60,'asdasdasd'),(77,7,61,'sadasdasd'),(78,7,62,'sdasdasd'),(85,2,69,'TEST'),(86,2,70,''),(87,2,71,''),(88,14,72,'sadasdas'),(89,15,73,'sdfsdfsdf'),(90,15,74,'fsdfsdfsdfsdf'),(91,15,75,'dasdasdasd'),(92,16,76,'TEST'),(93,17,77,'SDAKSDLKAJSDLKSA'),(94,17,78,'SASLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD'),(95,22,79,'test'),(96,22,80,'test'),(97,22,81,'N/A'),(98,22,82,'Operatoria'),(99,23,83,'Botón de seguridad'),(100,28,84,'test'),(101,32,85,'test'),(102,8,86,'valor de prueba 3'),(103,33,87,'Paro de emergencia 2'),(104,36,88,'sfffsdfsdf'),(105,41,89,'test'),(106,41,90,'test'),(107,41,91,'test'),(108,41,92,'test'),(109,41,93,'test'),(110,46,94,'adasdjklajdklasdhlkahsdkjhqksfdjadfsfdsa'),(111,46,95,'fdsdnlakfjhajklsdhfkajlsdhfaklsdjfhaklsjdfhklajsdfhkljasdhfkjahsdfkljashdfklasdf'),(112,46,96,'askdñasjdflajsdfiasjodfjewiojasnv,mdsnflfkfsfjdffosLÑFJDAÑSDLFÑsdf'),(113,46,97,'5 min'),(114,46,98,'Operatoria'),(116,47,100,'asdasd'),(117,47,101,'asdasd'),(118,48,102,'Puertas y vidrio'),(119,48,103,'Texto de prueba'),(120,49,104,'tetstasdasd'),(121,50,105,'Actividad de prueba'),(122,50,106,'Verificar que los tornillo sin fin no se encuentren dañados, rayados o pandeados. Si alguno de ellos presenta algún tipo de desgaste se deberá notificar inmediatamente ya que puede dañar los servomotores. Verificar que la polea dentada se encuentre en buen estado y que los dientes no se encuentren dañados'),(123,50,107,'N/A'),(124,50,108,'5 min'),(125,50,109,'Operatoria'),(126,51,110,'Cableado y orugas'),(127,51,111,'Verificar que todo el cableado interno se encuentre en buen estado. Verificar que las orugas se encuentren igualmente en buen estado y se muevan sin complicaciones.'),(128,51,112,'N/A'),(129,51,113,'5 min'),(130,55,114,'EJEMPLO'),(131,55,115,'TEST'),(132,55,116,'1m'),(133,55,117,'N/A'),(134,55,118,'Operatoria'),(135,56,119,'ASDASD');
/*!40000 ALTER TABLE `puntos_atributos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'usuario','usuario comun para realizar checklists');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Hugo Armando','García','Hernández','ghh1slp',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_atributos_equipo`
--

DROP TABLE IF EXISTS `vista_atributos_equipo`;
/*!50001 DROP VIEW IF EXISTS `vista_atributos_equipo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_atributos_equipo` AS SELECT 
 1 AS `id_punto`,
 1 AS `atributo_titulo`,
 1 AS `atributo_tipo`,
 1 AS `atributo_valor`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_equipos_cuartos`
--

DROP TABLE IF EXISTS `vista_equipos_cuartos`;
/*!50001 DROP VIEW IF EXISTS `vista_equipos_cuartos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_equipos_cuartos` AS SELECT 
 1 AS `id_equipo`,
 1 AS `nombre_equipo`,
 1 AS `activo`,
 1 AS `nombre_cuarto`,
 1 AS `id_cuarto`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_opl_por_equipo`
--

DROP TABLE IF EXISTS `vista_opl_por_equipo`;
/*!50001 DROP VIEW IF EXISTS `vista_opl_por_equipo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_opl_por_equipo` AS SELECT 
 1 AS `id_equipo`,
 1 AS `id_checklist`,
 1 AS `id_usuario`,
 1 AS `fecha_checklist`,
 1 AS `año`,
 1 AS `semana_iso`,
 1 AS `id_punto`,
 1 AS `nombre_punto`,
 1 AS `id_detalle`,
 1 AS `comentario`,
 1 AS `fotografias`,
 1 AS `estado_opl`,
 1 AS `fecha_completa`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_puntos_equipo`
--

DROP TABLE IF EXISTS `vista_puntos_equipo`;
/*!50001 DROP VIEW IF EXISTS `vista_puntos_equipo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_puntos_equipo` AS SELECT 
 1 AS `id_punto`,
 1 AS `orden_punto`,
 1 AS `categoria_punto`,
 1 AS `atributo_titulo`,
 1 AS `atributo_tipo`,
 1 AS `atributo_valor`,
 1 AS `ayuda_visual`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_atributos_equipo`
--

/*!50001 DROP VIEW IF EXISTS `vista_atributos_equipo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_atributos_equipo` AS select `p`.`id_punto` AS `id_punto`,`a`.`titulo` AS `atributo_titulo`,`a`.`tipo` AS `atributo_tipo`,`pa`.`valor` AS `atributo_valor` from ((`puntos` `p` left join `puntos_atributos` `pa` on(`p`.`id_punto` = `pa`.`id_punto`)) left join `atributos` `a` on(`pa`.`id_atributo` = `a`.`id_atributo`)) order by `p`.`id_punto`,`pa`.`id_pa` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_equipos_cuartos`
--

/*!50001 DROP VIEW IF EXISTS `vista_equipos_cuartos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_equipos_cuartos` AS select `equipos`.`id_equipo` AS `id_equipo`,`equipos`.`nombre_equipo` AS `nombre_equipo`,`equipos`.`activo` AS `activo`,`cuartos`.`nombre_cuarto` AS `nombre_cuarto`,`cuartos`.`id_cuarto` AS `id_cuarto` from (`equipos` join `cuartos` on(`equipos`.`id_cuarto` = `cuartos`.`id_cuarto`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_opl_por_equipo`
--

/*!50001 DROP VIEW IF EXISTS `vista_opl_por_equipo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_opl_por_equipo` AS select `c`.`id_equipo` AS `id_equipo`,`c`.`id_checklist` AS `id_checklist`,`c`.`id_usuario` AS `id_usuario`,cast(`c`.`fecha` as date) AS `fecha_checklist`,year(`c`.`fecha`) AS `año`,week(`c`.`fecha`,1) AS `semana_iso`,`dc`.`id_punto` AS `id_punto`,(select `pa1`.`valor` from `puntos_atributos` `pa1` where `pa1`.`id_punto` = `p`.`id_punto` order by `pa1`.`id_pa` limit 1) AS `nombre_punto`,`dc`.`id_detalle` AS `id_detalle`,`o`.`comentario` AS `comentario`,group_concat(`o`.`fotografia` separator '|') AS `fotografias`,`o`.`status` AS `estado_opl`,`c`.`fecha` AS `fecha_completa` from (((`opl` `o` join `detalle_checklist` `dc` on(`o`.`id_detalle_tpm` = `dc`.`id_detalle`)) join `checklist` `c` on(`dc`.`id_tpm` = `c`.`id_checklist`)) left join `puntos` `p` on(`dc`.`id_punto` = `p`.`id_punto`)) where `dc`.`status` = 'nok' group by `c`.`id_equipo`,`c`.`id_checklist`,`c`.`id_usuario`,`dc`.`id_punto`,`dc`.`id_detalle`,`o`.`comentario`,`o`.`status`,`c`.`fecha` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_puntos_equipo`
--

/*!50001 DROP VIEW IF EXISTS `vista_puntos_equipo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_puntos_equipo` AS select 1 AS `id_punto`,1 AS `orden_punto`,1 AS `categoria_punto`,1 AS `atributo_titulo`,1 AS `atributo_tipo`,1 AS `atributo_valor`,1 AS `ayuda_visual` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-30 18:14:48
