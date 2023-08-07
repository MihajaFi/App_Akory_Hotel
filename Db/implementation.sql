DROP DATABASE IF EXISTS hotel ; 
CREATE DATABASE hotel ; 

\c hotel ;

CREATE TABLE signup (
  UserID SERIAL PRIMARY KEY,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL
);

CREATE TABLE hotel (
    id_hotel   serial PRIMARY KEY,
    hotel_name varchar(200) NOT NULL,
    address    varchar(200) NOT NULL
);
-- Insertion dans la table "hotel" pour chaque province
INSERT INTO hotel (hotel_name, "address") VALUES
    ('Akory Hotel Antananarivo', '123 Rue Antananarivo'),
    ('Akory Hotel Antsiranana', '222 Rue Antsiranana'),
    ('Akory Hotel Fianarantsoa', '101 Rue Fianarantsoa'),
    ('Akory Hotel Mahajanga', '789 Rue Mahajanga'),
    ('Akory Hotel Toamasina', '456 Rue Toamasina'),
    ('Akory Hotel Toliara', '111 Rue Toliara');


CREATE TABLE province_available (
    id_province   serial PRIMARY KEY,
    province_name varchar(100) NOT NULL,
    code_province int,
    id_hotel int REFERENCES hotel(id_hotel)
);
INSERT INTO province_available (province_name, code_province, id_hotel)
VALUES
    ('Antananarivo', 101, 1),
    ('Antsiranana', 201, 2),
    ('Fianarantsoa', 301, 3),
    ('Mahajanga', 401, 4),
    ('Toamasina', 501, 5),
    ('Toliara', 601, 6);
CREATE TABLE receptionist (
    id_employee  serial PRIMARY KEY,
    first_name   varchar(200) NOT NULL,
    last_name    varchar(200) NOT NULL,
    password     varchar(50) NOT NULL,
    email        varchar(200) NOT NULL,
    work_contact VARCHAR(50) NOT NULL,
    id_province int REFERENCES province_available(id_province)
);

INSERT INTO receptionist (first_name, last_name, password, email, work_contact, id_province)
VALUES
    ('Admin', 'Admin', '1234', 'Admin@gmail.com', 0346801859, 1);


CREATE TABLE client (
    id_client         serial PRIMARY KEY,
    first_name              varchar(200) NOT NULL,
    last_name         varchar(200) NOT NULL,
    principal_contact varchar(50) NOT NULL,
    address           varchar(200) NOT NULL,
    emergency_number  varchar(50) NOT NULL,
    gender            char(1) NOT NULL,
    CIN               VARCHAR(50) NOT NULL,
    email             varchar(200) NOT NULL,
    password          varchar(50) NOT NULL,
    id_employee int REFERENCES receptionist(id_employee)
);

CREATE TABLE reservation (
    id_reservation serial PRIMARY KEY,
    date_arrived Date NOT NULL,
    leaving_date Date NOT NULL,
    number_of_person int NOT NULL,
    room_type VARCHAR(200) NOT NULL,
    id_client int REFERENCES client(id_client)
);

CREATE TABLE cancel (
    id_cancel int PRIMARY KEY,
    status_cancel boolean,
    id_reservation int REFERENCES reservation(id_reservation)
);

CREATE TABLE promotion (
    id_promotion serial PRIMARY KEY,
    name         varchar(100) NOT NULL,
    begin_date   Date NOT NULL,
    end_date     Date NOT NULL,
    percent      int NOT NULL
);


INSERT INTO promotion ("name", begin_date, end_date, percent)
VALUES
    ('Summer Sale', '2023-08-01', '2023-08-31', 20),
    ('Winter Promotion', '2023-12-01', '2023-12-31', 15),
    ('Spring Special', '2023-04-01', '2023-04-30', 25);

CREATE TABLE room_features (
    id_features    serial PRIMARY KEY,
    sea_view       boolean NOT NULL,
    VIP_category   boolean NOT NULL,
    hot_water      boolean NOT NULL,
    wifi_available boolean NOT NULL,
    room_service   boolean NOT NULL,
    mini_bar       boolean NOT NULL,
    flat_screen    boolean NOT NULL
);

INSERT INTO room_features (sea_view, VIP_category, hot_water, wifi_available, room_service, mini_bar, flat_screen)
VALUES
    (true, false, true, true, true, false, true),
    (false, true, true, true, true, true, true),
    (true, true, true, true, false, true, true);

CREATE TABLE room (
    id_room serial PRIMARY KEY,
    room_number varchar(100),
    room_type varchar(200),
    capacity_room int,
    id_reservation int REFERENCES reservation(id_reservation),
    id_promotion int REFERENCES promotion(id_promotion),
    id_features int REFERENCES room_features(id_features),
    id_hotel int REFERENCES hotel(id_hotel)
);

INSERT INTO room (room_number, room_type, capacity_room, id_reservation, id_promotion, id_features, id_hotel)
VALUES
    ('101', 'Standard', 2, 1, 1, 1, 1),
('202', 'Deluxe', 3, 10, 2, 2, 2);

CREATE TABLE have (
    id_room int REFERENCES room(id_room),
    id_hotel int REFERENCES hotel(id_hotel),
    PRIMARY KEY (id_room, id_hotel)
);

CREATE TABLE season (
    id_season  serial PRIMARY KEY,
    items      varchar(50),
    start_date Date,
    end_date   Date
);

CREATE TABLE price (
    id_price_by_season serial PRIMARY KEY,
    cost_per_night float,
    id_room int REFERENCES room(id_room),
    id_season int REFERENCES season(id_season)
);

CREATE TABLE payment (
    id_payment serial PRIMARY KEY,
    payment_date date NOT NULL,
    amount_paid float NOT NULL,
    number_night int NOT NULL,
    room_occupied int NOT NULL,
    deadline_payment varchar(200) NOT NULL,
    lending_status boolean NOT NULL,
    total_amount_status boolean NOT NULL,
    id_employee int REFERENCES receptionist(id_employee)
);

CREATE TABLE payment_method (
    id_payment_method serial PRIMARY KEY,
    mobile_money       boolean NOT NULL,
    credit_card        boolean NOT NULL,
    cash               boolean NOT NULL
);

CREATE TABLE choose (
    id_payment int REFERENCES payment(id_payment),
    id_payment_method int REFERENCES payment_method(id_payment_method),
    PRIMARY KEY (id_payment, id_payment_method)
);
