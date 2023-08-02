
CREATE DATABASE hotel;

\c hotel;

CREATE TABLE hotel(
        id_hotel   Varchar (200) PRIMARY KEY,
        hotel_name Varchar (200) NOT NULL ,
        "address"    Varchar (200) NOT NULL
);

CREATE TABLE province_available(
        id_province   Int PRIMARY KEY ,
        province_name Varchar (100) NOT NULL ,
        code_province Int ,
        id_hotel Varchar(200) references hotel(id_hotel)
);

CREATE TABLE receptionist(
        id_employee  serial PRIMARY KEY ,
        first_name   Varchar (200) NOT NULL ,
        last_name    Varchar (200) NOT NULL ,
        "Password"     Varchar (50) NOT NULL ,
        email        Varchar (200) NOT NULL ,
        work_contact bigint NOT NULL,
        id_province int references province_available(id_province)
);

CREATE TABLE Client(
        id_client         serial PRIMARY KEY ,
        "name"              Varchar (200) NOT NULL ,
        last_name         Varchar (200) NOT NULL ,
        principal_contact Varchar (50) NOT NULL ,
        "address"          Varchar (200) NOT NULL ,
        emergency_number  Varchar (50) NOT NULL ,
        gender            Char (1) NOT NULL ,
        CIN               Int NOT NULL ,
        Email             Varchar (1) NOT NULL ,
        "Password"          Varchar (50) NOT NULL ,
        id_employee int references receptionist(id_employee)
);

