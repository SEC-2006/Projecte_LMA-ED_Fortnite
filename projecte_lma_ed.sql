-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2025 a las 15:06:20
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
-- Base de datos: `projecte_lma_ed`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cosmetic`
--

CREATE TABLE `cosmetic` (
  `id` int(5) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `tipus` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cosmetic`
--

INSERT INTO `cosmetic` (`id`, `nom`, `tipus`) VALUES
(1, 'Renard', 'Traje'),
(2, 'Lapin', 'Traje'),
(3, 'Peluche de Renard', 'Mochila'),
(4, 'Peluche de Lapin', 'Mochila'),
(5, 'Daga de la Suerte', 'Pico'),
(6, 'Asta del Embaucador', 'Pico'),
(7, 'Capricho del Cazador', 'Envoltorio'),
(8, 'Banano Aventurero', 'Traje'),
(9, 'Brújula Banana', 'Mochila'),
(10, 'Rebanabananas', 'Pico'),
(11, 'Banana Pop', 'Envoltorio'),
(16, 'Jake Sully', 'Traje'),
(17, 'Neytiri', 'Traje'),
(18, 'Espíritu del Bosque', 'Mochila'),
(19, 'Tótem Ikran', 'Mochila'),
(20, 'Hacha de Jake', 'Pico'),
(21, 'Cuchillo de Neytiri', 'Pico'),
(22, 'Banshee de Caza', 'Ala Delta'),
(23, 'Florecer de Pandora', 'Gesto'),
(24, 'Vuelo del Ikran', 'Pantalla de Carga'),
(25, 'Palito de Pescado', 'Traje'),
(26, 'Saco de Agua Salada', 'Mochila'),
(27, 'Cinchas', 'Pico'),
(28, 'Crucero de Coral', 'Ala Delta'),
(29, 'Carapez', 'Envoltorio'),
(30, 'Pezqueñines', 'Envoltorio'),
(31, 'Slippery', 'Envoltorio'),
(32, 'Bailecito Escamoso', 'Gesto'),
(33, 'Pececitos de Ciudad', 'Música'),
(34, 'Rubius', 'Traje'),
(35, 'Wilson', 'Mochila'),
(36, 'Fuego Lunar', 'Pico'),
(37, 'Flamitas de Kevin', 'Envoltorio'),
(38, 'Teclas ASMR', 'Gesto'),
(39, 'TheGrefg', 'Traje'),
(40, 'Esferas de Poder', 'Mochila'),
(41, 'Bastón de Mando', 'Pico'),
(42, 'Cuadrilla de Control', 'Gesto');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cosmeticslote`
--

CREATE TABLE `cosmeticslote` (
  `idLoteTenda` int(11) NOT NULL,
  `idCosmetic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cosmeticslote`
--

INSERT INTO `cosmeticslote` (`idLoteTenda`, `idCosmetic`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11),
(3, 16),
(3, 17),
(3, 18),
(3, 19),
(3, 20),
(3, 21),
(3, 22),
(3, 23),
(3, 24),
(4, 25),
(4, 26),
(4, 27),
(4, 28),
(4, 29),
(4, 30),
(4, 31),
(4, 32),
(4, 33),
(5, 34),
(5, 35),
(5, 36),
(5, 37),
(5, 38),
(6, 39),
(6, 40),
(6, 41),
(6, 42);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotesusuari`
--

CREATE TABLE `lotesusuari` (
  `idUsuari` int(5) NOT NULL,
  `idLote` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotetenda`
--

CREATE TABLE `lotetenda` (
  `id` int(5) NOT NULL,
  `preu` int(5) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lotetenda`
--

INSERT INTO `lotetenda` (`id`, `preu`, `nom`) VALUES
(1, 2000, 'Lote de Fábulas'),
(2, 1800, 'Lote de Banano Aventurero'),
(3, 3400, 'Lote de Avatar: Guerreros de Pandora'),
(4, 2000, 'Lote de Palito de Pescado'),
(5, 2400, 'Lote de Rubius'),
(6, 1800, 'Lote de TheGrefg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuaris`
--

CREATE TABLE `usuaris` (
  `id` int(5) NOT NULL,
  `email` varchar(255) NOT NULL,
  `paVos` int(11) NOT NULL DEFAULT 6000,
  `contrasenya` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cosmetic`
--
ALTER TABLE `cosmetic`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cosmeticslote`
--
ALTER TABLE `cosmeticslote`
  ADD PRIMARY KEY (`idLoteTenda`,`idCosmetic`);

--
-- Indices de la tabla `lotesusuari`
--
ALTER TABLE `lotesusuari`
  ADD PRIMARY KEY (`idUsuari`,`idLote`);

--
-- Indices de la tabla `lotetenda`
--
ALTER TABLE `lotetenda`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuaris`
--
ALTER TABLE `usuaris`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cosmetic`
--
ALTER TABLE `cosmetic`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `lotetenda`
--
ALTER TABLE `lotetenda`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuaris`
--
ALTER TABLE `usuaris`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
