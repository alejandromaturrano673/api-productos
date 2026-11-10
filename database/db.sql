DROP DATABASE tiendaperu;

CREATE DATABASE tiendaperu;

USE tiendaperu;

CREATE TABLE
  IF NOT EXISTS productos (
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