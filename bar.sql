-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 04/09/2024 às 22h13min
-- Versão do Servidor: 5.5.20
-- Versão do PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `bar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `brand`
--

CREATE TABLE IF NOT EXISTS `brand` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `brand`
--

INSERT INTO `brand` (`id`, `name`, `idRequester`) VALUES
(1, 'xd', 1),
(3, 'Brahma', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `debtor`
--

CREATE TABLE IF NOT EXISTS `debtor` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `expenses`
--

CREATE TABLE IF NOT EXISTS `expenses` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `reason` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `total` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idProduct` (`idProduct`),
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `position`
--

CREATE TABLE IF NOT EXISTS `position` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `position`
--

INSERT INTO `position` (`id`, `name`) VALUES
(1, 'Owner'),
(2, 'Manager');

-- --------------------------------------------------------

--
-- Estrutura da tabela `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `idBrand` int(5) NOT NULL,
  `type` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `product`
--

INSERT INTO `product` (`id`, `name`, `idBrand`, `type`, `price`, `idRequester`) VALUES
(1, 'Brahma Lata 269Ml', 3, 'Cerveja Lata', 2.79, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stock`
--

CREATE TABLE IF NOT EXISTS `stock` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idProduct` int(5) NOT NULL,
  `minStock` int(4) NOT NULL,
  `maxStock` int(4) NOT NULL,
  `qtt` int(4) NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idProduct` (`idProduct`),
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `stock`
--

INSERT INTO `stock` (`id`, `idProduct`, `minStock`, `maxStock`, `qtt`, `idRequester`) VALUES
(1, 1, 10, 1000, 100, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stockin`
--

CREATE TABLE IF NOT EXISTS `stockin` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idProduct` (`idProduct`),
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `stockout`
--

CREATE TABLE IF NOT EXISTS `stockout` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idProduct` (`idProduct`),
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `idPosition` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idPosition` (`idPosition`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `login`, `password`, `email`, `idPosition`) VALUES
(1, 'as', 'ass', 'ass', 'ass', 1);

--
-- Restrições para as tabelas dumpadas
--

--
-- Restrições para a tabela `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Restrições para a tabela `debtor`
--
ALTER TABLE `debtor`
  ADD CONSTRAINT `debtor_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Restrições para a tabela `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
