DROP DATABASE IF EXISTS tiendaperu;

CREATE DATABASE tiendaperu;

USE tiendaperu;

CREATE TABLE IF NOT EXISTS productos (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(100) NOT NULL,
  descripcion VARCHAR(200) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  create_at DATETIME NOT NULL DEFAULT NOW (),
  update_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO
  productos (marca, descripcion, precio, stock)
VALUES
  ('Samsung', 'TV 55', 2500, 10),
  ('LG', 'Lavadora', 1200, 3),
  ('Sony', 'Playstation 5', 3200, 2);

SELECT
  *
FROM
  productos;

--
CREATE TABLE IF NOT EXISTS clientes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  apellidos VARCHAR(100) NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  telefono VARCHAR(10) NULL,
  direccion VARCHAR(200) NULL,
  email VARCHAR(100) NULL,
  create_at DATETIME NOT NULL DEFAULT NOW (),
  updated_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO
  clientes (apellidos, nombres, telefono, direccion, email)
VALUES
  (
    'Pérez Gómez',
    'Juan Carlos',
    '987654321',
    'Av. Arequipa 123, Lima',
    'juan.perez@email.com'
  ),
  (
    'López Díaz',
    'María Elena',
    '912345678',
    'Jr. Cusco 456, Ica',
    'maria.lopez@email.com'
  ),
  (
    'Torres Quispe',
    'Luis Alberto',
    '998877665',
    'Calle Real 789, Arequipa',
    'luis.torres@email.com'
  );

SELECT
  *
FROM
  clientes;

--
CREATE TABLE IF NOT EXISTS proveedores (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  razonsocial VARCHAR(100) NOT NULL,
  contacto VARCHAR(100) NOT NULL,
  ruc VARCHAR(11) NOT NULL,
  direccion VARCHAR(200) NULL,
  create_at DATETIME NOT NULL DEFAULT NOW (),
  updated_at DATETIME NULL
) ENGINE = INNODB;

INSERT INTO
  proveedores (razonsocial, contacto, ruc, direccion)
VALUES
  (
    'Importaciones Tech SAC',
    'Carlos Mendoza',
    '20512345678',
    'Av. Javier Prado 1020, Lima'
  ),
  (
    'Distribuidora Electro Perú SRL',
    'Ana Morales',
    '20498765432',
    'Calle Las Begonias 340, Lima'
  ),
  (
    'Comercializadora Sur EIRL',
    'Roberto Silva',
    '20601122334',
    'Av. Ejército 512, Arequipa'
  );

SELECT
  *
FROM
  proveedores;