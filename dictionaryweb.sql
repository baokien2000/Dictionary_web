-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th12 03, 2022 lúc 09:36 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dictionaryweb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `name` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `question` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `answer` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `role` varchar(5) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `name`, `password`, `question`, `answer`, `date`, `role`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:11', 'admin'),
(2, 'baokien', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:12', 'user'),
(6, 'User', '4297f44b13955235245b2497399d7a93', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-29 16:25:10', 'user'),
(7, 'baokien2', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 15:36:42', 'user'),
(9, 'User1', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:12:48', 'user'),
(10, 'User2', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:22:15', 'user'),
(11, 'User3', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite book?', '0c377427bce12ae69e39ad5ceb881645', '2022-10-30 19:53:43', 'user'),
(12, 'User4', 'fcea920f7412b5da7be0cf42b8c93759', 'What is your favorite flower?', 'a7144e5791d8a23a8b1e4a735b786d7a', '2022-10-30 20:57:40', 'user'),
(13, 'User5', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:11', 'user'),
(14, 'User6', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:12', 'user'),
(15, 'User7', '4297f44b13955235245b2497399d7a93', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-29 16:25:10', 'user'),
(16, 'User8', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 15:36:42', 'user'),
(17, 'User9', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:12:48', 'user'),
(18, 'User10', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:22:15', 'user'),
(19, 'User11', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite book?', '0c377427bce12ae69e39ad5ceb881645', '2022-10-30 19:53:43', 'user'),
(20, 'User12', 'fcea920f7412b5da7be0cf42b8c93759', 'What is your favorite flower?', 'a7144e5791d8a23a8b1e4a735b786d7a', '2022-10-30 20:57:40', 'user'),
(21, 'user21', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:11', 'user'),
(22, 'user22', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-11-22 18:12:12', 'user'),
(23, 'user23', '4297f44b13955235245b2497399d7a93', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-29 16:25:10', 'user'),
(24, 'user24', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 15:36:42', 'user'),
(25, 'user25', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:12:48', 'user'),
(26, 'user26', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite pet?', 'c935d187f0b998ef720390f85014ed1e', '2022-10-30 16:22:15', 'user'),
(27, 'user27', 'e10adc3949ba59abbe56e057f20f883e', 'What is your favorite book?', '0c377427bce12ae69e39ad5ceb881645', '2022-10-30 19:53:43', 'user'),
(28, 'user28', 'fcea920f7412b5da7be0cf42b8c93759', 'What is your favorite flower?', 'a7144e5791d8a23a8b1e4a735b786d7a', '2022-10-30 20:57:40', 'user'),
(29, 'User100', '4297f44b13955235245b2497399d7a93', 'What is your favorite sport?', '37b4e2d82900d5e94b8da524fbeb33c0', '2022-10-30 21:02:31', 'user');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
