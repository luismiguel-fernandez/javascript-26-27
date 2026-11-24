-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 24-11-2026 a las 13:06:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `records_minesweeper`
--
CREATE DATABASE IF NOT EXISTS `records_minesweeper` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `records_minesweeper`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_times`
--

CREATE TABLE `game_times` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `nick` varchar(15) NOT NULL DEFAULT 'anónime',
  `level` int(11) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `game_times`
--

INSERT INTO `game_times` (`id`, `time`, `nick`, `level`, `duration`) VALUES
(1, '2026-11-23 12:32:53', 'luismi', 1, 18),
(2, '2026-11-23 12:36:19', 'alexis', 1, 14);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `game_times`
--
ALTER TABLE `game_times`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `game_times`
--
ALTER TABLE `game_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
