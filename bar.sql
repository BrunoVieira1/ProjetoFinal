-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 27/08/2024 às 18h13min
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
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  UNIQUE KEY `idRequester` (`idRequester`)
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
  UNIQUE KEY `idRequester` (`idRequester`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
