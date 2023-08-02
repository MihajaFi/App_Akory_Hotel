-- Database: bluebirdhotel
CREATE DATABASE hotel;

\c hotel;
-- Table structure for table emp_login
CREATE TABLE emp_login (
  empid SERIAL NOT NULL,
  "Emp_Email" varchar(50) NOT NULL,
  "Emp_Password" varchar(50) NOT NULL,
  PRIMARY KEY (empid)
);

-- Dumping data for table emp_login
INSERT INTO emp_login (empid, "Emp_Email", "Emp_Password") VALUES
(1, 'Admin@gmail.com', '1234');

-- Table structure for table payment
CREATE TABLE payment (
  id SERIAL NOT NULL,
  "Name" varchar(30) NOT NULL,
  "Email" varchar(30) NOT NULL,
  "RoomType" varchar(30) NOT NULL,
  "Bed" varchar(30) NOT NULL,
  "NoofRoom" int NOT NULL,
  "cin" date NOT NULL,
  "cout" date NOT NULL,
  "noofdays" int NOT NULL,
  "roomtotal" numeric(8,2) NOT NULL,
  "bedtotal" numeric(8,2) NOT NULL,
  "meal" varchar(30) NOT NULL,
  "mealtotal" numeric(8,2) NOT NULL,
  "finaltotal" numeric(8,2) NOT NULL,
  PRIMARY KEY (id)
);

-- Dumping data for table payment
INSERT INTO payment (id, "Name", "Email", "RoomType", "Bed", "NoofRoom", "cin", "cout", "noofdays", "roomtotal", "bedtotal", "meal", "mealtotal", "finaltotal") VALUES
(41, 'Tushar pankhaniya', 'pankhaniyatushar9@gmail.com', 'Single Room', 'Single', 1, '2022-11-09', '2022-11-10', 1, 1000.00, 10.00, 'Room only', 0.00, 1010.00);

-- Table structure for table room
CREATE TABLE room (
  id SERIAL NOT NULL,
  "type" varchar(50) NOT NULL,
  "bedding" varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

-- Dumping data for table room
INSERT INTO room (id, "type", "bedding") VALUES
(4, 'Superior Room', 'Single'),
(6, 'Superior Room', 'Triple'),
(7, 'Superior Room', 'Quad'),
(8, 'Deluxe Room', 'Single'),
(9, 'Deluxe Room', 'Double'),
(10, 'Deluxe Room', 'Triple'),
(11, 'Guest House', 'Single'),
(12, 'Guest House', 'Double'),
(13, 'Guest House', 'Triple'),
(14, 'Guest House', 'Quad'),
(16, 'Superior Room', 'Double'),
(20, 'Single Room', 'Single'),
(22, 'Superior Room', 'Single'),
(23, 'Deluxe Room', 'Single'),
(24, 'Deluxe Room', 'Triple'),
(27, 'Guest House', 'Double'),
(30, 'Deluxe Room', 'Single');

-- Table structure for table roombook
CREATE TABLE roombook (
  id SERIAL NOT NULL,
  "Name" varchar(50) NOT NULL,
  "Email" varchar(50) NOT NULL,
  "Country" varchar(30) NOT NULL,
  "Phone" varchar(30) NOT NULL,
  "RoomType" varchar(30) NOT NULL,
  "Bed" varchar(30) NOT NULL,
  "Meal" varchar(30) NOT NULL,
  "NoofRoom" varchar(30) NOT NULL,
  "cin" date NOT NULL,
  "cout" date NOT NULL,
  "nodays" int NOT NULL,
  "stat" varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

-- Dumping data for table roombook
INSERT INTO roombook (id, "Name", "Email", "Country", "Phone", "RoomType", "Bed", "Meal", "NoofRoom", "cin", "cout", "nodays", "stat") VALUES
(41, 'Tushar pankhaniya', 'pankhaniyatushar9@gmail.com', 'India', '9313346569', 'Single Room', 'Single', 'Room only', '1', '2022-11-09', '2022-11-10', 1, 'Confirm');

-- Table structure for table signup
CREATE TABLE signup (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

CREATE TABLE receptionist(
        id_employee  serial PRIMARY KEY ,
        first_name   Varchar (200) NOT NULL ,
        last_name    Varchar (200) NOT NULL ,
        "Password"     Varchar (50) NOT NULL ,
        email        Varchar (200) NOT NULL ,
        work_contact bigint NOT NULL,
        country varchar(200) NOT NULL
);