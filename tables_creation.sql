DROP TABLE IF EXISTS enruedas_db;
CREATE DATABASE enruedas_db;
USE enruedas_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
id int unsigned NOT NULL AUTO_INCREMENT,
first_name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
last_name varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 email varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 password varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 birth_date date NOT NULL,
 avatar varchar(200),
 primary key (id)
);

INSERT INTO users VALUES
(1, 'Agustin','Rodriguez','aguselkapo@gmail.com','123456','1923-03-12',NULL),
(2, 'Alberto','Paez','alber@gmail.com','12345434346','1993-02-20',NULL),
(3, 'Nicolas','Capelino','nicocape@gmail.com','123423456','1995-06-12',NULL),
(4, 'Facundo','Vela','facuvela@gmail.com','123424656','2001-07-12',NULL),
(5, 'Julieta','Bustos','julib@gmail.com','123424646256','2002-08-12',NULL),
(6, 'Florencia','Rocha','florr@gmail.com','12343683683656','2004-09-12','prueba.jpg'),
(7, 'Pancha','Puma','panpuma@gmail.com','123451231236','2001-02-22',NULL),
(8, 'Rocio','Alvarez','rocioalvarez@gmail.com','1216461463456','2003-12-25',NULL),
(9, 'Julian','Gates','juligates@gmail.com','12345275256','2004-06-28',NULL),
(10, 'Francisco','Franco','franfran@gmail.com','12368638634793456','1983-04-30',NULL);


DROP TABLE IF EXISTS products;
CREATE TABLE products (
id int unsigned NOT NULL AUTO_INCREMENT,
brand varchar(50) COLLATE utf8_unicode_ci NOT NULL,
model varchar(50) COLLATE utf8_unicode_ci NOT NULL,
manufacture_year int NOT NULL,
color varchar(50) COLLATE utf8_unicode_ci NOT NULL,
door_number TINYINT NOT NULL,
transmission varchar(50) COLLATE utf8_unicode_ci NOT NULL,
motor_type varchar(50) COLLATE utf8_unicode_ci NOT NULL,
description varchar(200) COLLATE utf8_unicode_ci,
price int NOT NULL,
discount int,
image varchar(200),
primary key (id)
);

INSERT INTO products VALUES
(1, 'Ford', 'K', 2004, 'Rojo', 3, 'Manual', 'GNC', 'Lindo auto', 23000, 10),
(2, 'Chevrolet', 'Onix', 2005, 'Azul', 5, 'Manual', 'Nafta', NULL, 17000,2),
(3, 'Ford', 'Ranger', 2006, 'Negro', 5, 'Manual', 'Nafta', 'Comfortable', 20000,15),
(4, 'Audi', 'Q3', 2002, 'Negro', 3, 'Manual', 'Diesel', 'Precioso', 53000,23),
(5, 'BWM', 'X5', 2000, 'Blanco', 3, 'Manual', 'GNC', 'Atractivo', 30000,12),
(6, 'Peugeot', '2012', 2004, 'Azul', 5, 'Automatico', 'Diesel', NULL, 16000,14),
(7, 'Audi', 'A5', 2021, 'Gris', 3, 'Automatico', 'Nafta', NULL, 80000,15);

DROP TABLE IF EXISTS users_products;
CREATE TABLE users_products(
id int unsigned NOT NULL AUTO_INCREMENT,
user_id int unsigned NOT NULL,
product_id int unsigned NOT NULL,
primary key (id),
key users_products_user_id_foreign (user_id),
key users_products_product_id_foreign (product_id),
constraint users_products_user_id_foreign foreign key (user_id) references users (id),
constraint users_products_product_id_foreign foreign key (product_id) references products (id)
);

INSERT INTO users_products VALUES
(1, 3, 4),
(2, 1, 3),
(3, 3, 2),
(4, 8, 7),
(5, 6, 5),
(6, 2, 1),
(7, 7, 6);