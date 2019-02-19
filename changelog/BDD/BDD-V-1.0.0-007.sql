-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 19 fév. 2019 à 15:05
-- Version du serveur :  10.1.37-MariaDB
-- Version de PHP :  7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `amiltools`
--
CREATE DATABASE IF NOT EXISTS `amiltools` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `amiltools`;

DELIMITER $$
--
-- Fonctions
--
DROP FUNCTION IF EXISTS `changePos`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `changePos` (`id` INT, `oldPos` INT, `newPos` INT) RETURNS TINYINT(1) begin
	if NOT EXISTS(select * from amil_taskgroup where tgr_id=id and tgr_position=oldPos) then
		return FALSE;
	END IF;
	if NOT EXISTS(select * from amil_taskgroup where tgr_position=newPos) then
		return FALSE;
	END IF;
	UPDATE amil_taskgroup set tgr_position =-1 where tgr_id=id and tgr_position=oldPos;
	IF newPos<oldPos THEN
		UPDATE amil_taskgroup set tgr_position =(tgr_position+1) where tgr_position>=newPos and tgr_position<oldPos order BY tgr_position desc;
	ELSE
		UPDATE amil_taskgroup set tgr_position =(tgr_position-1) where tgr_position<=newPos and tgr_position>oldPos order BY tgr_position;
	END IF;
	UPDATE amil_taskgroup set tgr_position = newPos where tgr_id=id;
	RETURN TRUE;
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `amil_api_key`
--

DROP TABLE IF EXISTS `amil_api_key`;
CREATE TABLE `amil_api_key` (
  `id` int(11) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_api_key`
--

INSERT INTO `amil_api_key` (`id`, `api_key`, `available`, `id_user`) VALUES
(8, 'AN8hJ!Mm0dUQSQdR0mRqg1eLSjd562', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `amil_astuce`
--

DROP TABLE IF EXISTS `amil_astuce`;
CREATE TABLE `amil_astuce` (
  `id` int(11) NOT NULL,
  `astuce` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_astuce`
--

INSERT INTO `amil_astuce` (`id`, `astuce`) VALUES
(1, 'Des serpents, il fallait que ce soit des serpents !'),
(2, 'Je suis mon cher ami, très heureux de te voir.'),
(3, 'N\'oubliez pas de faire votre RA avant le 15 !');

-- --------------------------------------------------------

--
-- Structure de la table `amil_bugtracker`
--

DROP TABLE IF EXISTS `amil_bugtracker`;
CREATE TABLE `amil_bugtracker` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `priority` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tags` varchar(255) NOT NULL,
  `archive` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `amil_calendar_events`
--

DROP TABLE IF EXISTS `amil_calendar_events`;
CREATE TABLE `amil_calendar_events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `start` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `end` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `idUser` int(11) NOT NULL,
  `forAll` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Structure de la table `amil_report`
--

DROP TABLE IF EXISTS `amil_report`;
CREATE TABLE `amil_report` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_report`
--

INSERT INTO `amil_report` (`id`, `title`, `content`, `author`, `create_at`) VALUES
(4, 'Report Labs du 28/02/2019', '# Titre\n## Sous-Titre \n### Titre plus profond\n\nAttributs *italique*, **gras**, \n`monospace`, ~~rayé~~.\n\nListe:\n\n  * HTML5\n  * CSS3\n  * Javascript\n\nListe numérotée:\n\n  1. React\n  2. NodeJS\n  3. FireBase\n\n *[Amiltools](https://github.com/Eito33)* \n\n Lien automatique : https://github.com/Eito33 \n\n```\n console.log(&quot;hello&quot;); \n``` ', 'Gabin Rimbault', '2019-02-19 14:00:36');

-- --------------------------------------------------------

--
-- Structure de la table `amil_role`
--

DROP TABLE IF EXISTS `amil_role`;
CREATE TABLE `amil_role` (
  `id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `value` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_role`
--

INSERT INTO `amil_role` (`id`, `role`, `value`) VALUES
(1, 'User', 25),
(2, 'Manager', 50),
(3, 'Admin', 100);

-- --------------------------------------------------------

--
-- Structure de la table `amil_task`
--

DROP TABLE IF EXISTS `amil_task`;
CREATE TABLE `amil_task` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `priority` varchar(255) NOT NULL,
  `tasktag` varchar(255) DEFAULT NULL,
  `assignedto` varchar(255) NOT NULL,
  `idgroupe` int(11) NOT NULL DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `datemodif` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `amil_taskgroup`
--

DROP TABLE IF EXISTS `amil_taskgroup`;
CREATE TABLE `amil_taskgroup` (
  `tgr_id` int(11) NOT NULL,
  `tgr_titre` varchar(255) NOT NULL,
  `tgr_position` int(11) NOT NULL,
  `tgr_datemodif` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_taskgroup`
--

INSERT INTO `amil_taskgroup` (`tgr_id`, `tgr_titre`, `tgr_position`, `tgr_datemodif`) VALUES
(1, 'TODO :', 0, '2019-02-19 14:57:16'),
(2, 'DONE :', 2, '2019-02-19 14:57:09'),
(3, 'DOING :', 1, '2019-02-19 14:57:16');

-- --------------------------------------------------------

--
-- Structure de la table `amil_user`
--

DROP TABLE IF EXISTS `amil_user`;
CREATE TABLE `amil_user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `biographie` varchar(500) DEFAULT 'Voici ma biographie !',
  `job` varchar(255) NOT NULL DEFAULT 'webdev',
  `role` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL DEFAULT 'Niort',
  `api_key` varchar(50) DEFAULT 'noapikey'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `amil_user`
--

INSERT INTO `amil_user` (`id`, `firstname`, `lastname`, `mail`, `password`, `token`, `biographie`, `job`, `role`, `team`, `api_key`) VALUES
(2, 'Admin', 'Admin', 'admin@amiltone.com', '$2a$10$Xv/iDcUpTiSwKqSF09jT7O/BitSYgaVbtWqwqQVK8D09YTRSEORVS', '!fXA3BfApEwT$DWromAqLwfVBAqQoDVkVnxvcXrV3rnT1G6GIO', 'Voici ma biographie !', 'webdev', 'Admin', 'Niort', 'AN8hJ!Mm0dUQSQdR0mRqg1eLSjd562');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `amil_api_key`
--
ALTER TABLE `amil_api_key`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `amil_bugtracker`
--
ALTER TABLE `amil_bugtracker`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_bug_user` (`id_user`);

--
-- Index pour la table `amil_calendar_events`
--
ALTER TABLE `amil_calendar_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Events_User` (`idUser`);

--
-- Index pour la table `amil_report`
--
ALTER TABLE `amil_report`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `amil_role`
--
ALTER TABLE `amil_role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `amil_task`
--
ALTER TABLE `amil_task`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `amil_taskgroup`
--
ALTER TABLE `amil_taskgroup`
  ADD PRIMARY KEY (`tgr_id`),
  ADD UNIQUE KEY `tgr_position` (`tgr_position`);

--
-- Index pour la table `amil_user`
--
ALTER TABLE `amil_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `amil_api_key`
--
ALTER TABLE `amil_api_key`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `amil_bugtracker`
--
ALTER TABLE `amil_bugtracker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `amil_calendar_events`
--
ALTER TABLE `amil_calendar_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `amil_report`
--
ALTER TABLE `amil_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `amil_role`
--
ALTER TABLE `amil_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `amil_task`
--
ALTER TABLE `amil_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `amil_taskgroup`
--
ALTER TABLE `amil_taskgroup`
  MODIFY `tgr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `amil_user`
--
ALTER TABLE `amil_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `amil_bugtracker`
--
ALTER TABLE `amil_bugtracker`
  ADD CONSTRAINT `FK_bug_user` FOREIGN KEY (`id_user`) REFERENCES `amil_user` (`id`);

--
-- Contraintes pour la table `amil_calendar_events`
--
ALTER TABLE `amil_calendar_events`
  ADD CONSTRAINT `FK_Events_User` FOREIGN KEY (`idUser`) REFERENCES `amil_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
