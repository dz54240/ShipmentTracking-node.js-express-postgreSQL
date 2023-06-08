create database shipmentTracking;

create table Products (
  id integer primary key,
  productName varchar(200),
  brand varchar(200),
  model varchar(200),
  price decimal(10, 2)
);

create table Delivery (
  id int primary key,
  productID integer,
  state varchar(255),
  shipmentDate date,
  deliveryDate date,
  foreign key (productID) references products(id)
);

insert into products
    (id, productname, brand, model, price) values
  (1, 'iPhone 13 Pro Max', 'Apple', '13', 999.99),
  (2, 'Galaxy S21', 'Samsung', 'S21', 899.99),
  (3, 'Pixel 5', 'Google', '5', 699.99),
  (4, 'OnePlus 9', 'OnePlus', '9', 799.99),
  (5, 'Mi 11', 'Xiaomi', '11', 599.99),
  (6, 'Redmi Note 10', 'Xiaomi', 'Note 10', 299.99),
  (7, 'Nokia 5.4', 'Nokia', '5.4', 199.99),
  (8, 'LG Velvet', 'LG', 'Velvet', 549.99),
  (9, 'Motorola Moto G Power', 'Motorola', 'G Power', 299.99),
  (10, 'Sony Xperia 5 II', 'Sony', '5 II', 899.99);

insert into delivery
    (id, productid, state, shipmentdate, deliverydate) values
  (1, 1, 'Sent', '2023-05-01', '2023-05-05'),
  (2, 2, 'Delivered', '2023-05-02', '2023-05-03'),
  (3, 3, 'preparing for delivery', '2023-05-03', NULL),
  (4, 4, 'Sent', '2023-05-04', NULL),
  (5, 5, 'Delivered', '2023-05-05', '2023-05-06'),
  (6, 6, 'preparing for delivery', '2023-05-06', NULL),
  (7, 7, 'Sent', '2023-05-07', NULL),
  (8, 8, 'Sent', '2023-05-08', NULL),
  (9, 9, 'Delivered', '2023-05-09', '2023-05-10'),
  (10, 10, 'preparing for delivery', '2023-05-10', NULL);


