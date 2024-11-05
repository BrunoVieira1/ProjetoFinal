-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 05-Nov-2024 às 16:30
-- Versão do servidor: 5.7.17
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bar`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `brand`
--

CREATE TABLE `brand` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

CREATE TABLE `debtor` (
  `id` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `expenses`
--

CREATE TABLE `expenses` (
  `id` int(5) NOT NULL,
  `reason` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `orders`
--

CREATE TABLE `orders` (
  `id` int(5) NOT NULL,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `total` float(8,2) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `position`
--

CREATE TABLE `position` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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

CREATE TABLE `product` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `idBrand` int(5) NOT NULL,
  `type` varchar(100) NOT NULL,
  `price` float(8,2) NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `product`
--

INSERT INTO `product` (`id`, `name`, `idBrand`, `type`, `price`, `idRequester`) VALUES
(1, 'Brahma Lata 269Ml', 3, 'Cerveja Lata', 2.79, 1),
(2, 'Pilsner Duplo Malte', 3, 'Lata', 2.89, 1),
(3, 'teste', 1, 'Lata', 2.12, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stock`
--

CREATE TABLE `stock` (
  `id` int(5) NOT NULL,
  `idProduct` int(5) NOT NULL,
  `minStock` int(4) NOT NULL,
  `maxStock` int(4) NOT NULL,
  `qtt` int(4) NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `stock`
--

INSERT INTO `stock` (`id`, `idProduct`, `minStock`, `maxStock`, `qtt`, `idRequester`) VALUES
(1, 1, 10, 1000, 88, 1),
(8, 2, 10, 1000, 0, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stockin`
--

CREATE TABLE `stockin` (
  `id` int(5) NOT NULL,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `stockin`
--

INSERT INTO `stockin` (`id`, `idProduct`, `qtt`, `date`, `idRequester`) VALUES
(1, 2, 12, '2024-09-17', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stockout`
--

CREATE TABLE `stockout` (
  `id` int(5) NOT NULL,
  `idProduct` int(5) NOT NULL,
  `qtt` int(4) NOT NULL,
  `date` date NOT NULL,
  `idRequester` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `stockout`
--

INSERT INTO `stockout` (`id`, `idProduct`, `qtt`, `date`, `idRequester`) VALUES
(1, 2, 12, '2024-09-10', 1),
(3, 2, 1, '2024-11-04', 1),
(4, 2, 1, '2024-11-04', 1),
(5, 2, 1, '2024-11-04', 1),
(6, 2, 1, '2024-11-04', 1),
(7, 2, 1, '2024-11-04', 1),
(8, 2, 1, '2024-11-04', 1),
(9, 2, 1, '2024-11-04', 1),
(10, 1, 1, '2024-11-04', 1),
(11, 1, 1, '2024-11-04', 1),
(12, 1, 1, '2024-11-04', 1),
(13, 1, 1, '2024-11-04', 1),
(14, 2, 1, '2024-11-04', 1),
(15, 2, 1, '2024-11-04', 1),
(16, 2, 1, '2024-11-04', 1),
(17, 2, 1, '2024-11-04', 1),
(18, 2, 1, '2024-11-04', 1),
(19, 1, 1, '2024-11-04', 1),
(20, 1, 1, '2024-11-04', 1),
(21, 1, 1, '2024-11-04', 1),
(22, 1, 1, '2024-11-04', 1),
(23, 1, 1, '2024-11-04', 1),
(24, 1, 1, '2024-11-04', 1),
(25, 1, 1, '2024-11-04', 1),
(26, 1, 1, '2024-11-04', 1),
(27, 1, 1, '2024-11-04', 1),
(28, 1, 1, '2024-11-04', 1),
(29, 1, 1, '2024-11-04', 1),
(30, 1, 1, '2024-11-04', 1),
(31, 1, 1, '2024-11-04', 1),
(32, 1, 1, '2024-11-04', 1),
(33, 1, 1, '2024-11-04', 1),
(34, 1, 1, '2024-11-04', 1),
(35, 1, 1, '2024-11-04', 1),
(36, 1, 1, '2024-11-04', 1),
(37, 1, 1, '2024-11-04', 1),
(38, 1, 1, '2024-11-04', 1),
(39, 2, 1, '2024-11-04', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `idPosition` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `login`, `password`, `email`, `idPosition`) VALUES
(1, 'as', 'ass', 'ass', 'ass', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`);

--
-- Indexes for table `debtor`
--
ALTER TABLE `debtor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`) USING BTREE;

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProduct` (`idProduct`) USING BTREE,
  ADD KEY `idRequester` (`idRequester`) USING BTREE;

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`),
  ADD KEY `idProduct` (`idProduct`) USING BTREE;

--
-- Indexes for table `stockin`
--
ALTER TABLE `stockin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`),
  ADD KEY `idProduct` (`idProduct`) USING BTREE;

--
-- Indexes for table `stockout`
--
ALTER TABLE `stockout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRequester` (`idRequester`),
  ADD KEY `idProduct` (`idProduct`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `idPosition` (`idPosition`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `stockin`
--
ALTER TABLE `stockin`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `stockout`
--
ALTER TABLE `stockout`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `brand_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `debtor`
--
ALTER TABLE `debtor`
  ADD CONSTRAINT `debtor_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `stockin`
--
ALTER TABLE `stockin`
  ADD CONSTRAINT `stockin_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `stockout`
--
ALTER TABLE `stockout`
  ADD CONSTRAINT `stockout_ibfk_1` FOREIGN KEY (`idRequester`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
