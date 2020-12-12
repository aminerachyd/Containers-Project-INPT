CREATE TABLE IF NOT EXISTS `personnage` (
`id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `characteristics` text COLLATE utf8mb4_unicode_ci
);