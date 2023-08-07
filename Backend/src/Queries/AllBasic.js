const getAllpaymentByClient = `
        SELECT client.id_client, client.first_name, client.email ,payment.total_amount_status
        FROM client
        LEFT OUTER JOIN payment ON payment.id_employee = client.id_employee
       ;
` ; 

const getAllRecptionist = `
        SELECT 
        r.id_employee, r.first_name ||' '|| r.last_name AS staff_name, r.email, r.work_contact, 
        h.hotel_name,
        p.province_name
        FROM 
        receptionist r
        JOIN 
        province_available p ON r.id_province = p.id_province
        JOIN 
        hotel h ON p.id_hotel = h.id_hotel ORDER BY r.id_employee ASC;
` ;

const getAllReservation = `
        select reservation.id_reservation , client.first_name || ' ' || client.last_name AS client_name , client.email ,reservation.date_arrived ,reservation.number_of_person,reservation.leaving_date ,client.CIN, reservation.room_type
        from reservation 
        inner join client ON reservation.id_client = client.id_client ;
` ;

const getDetailRoomOccupiedByClient = `
        SELECT room.id_room, room.room_number, room.room_type, room.capacity_room, room_features.*
        FROM room
        INNER JOIN reservation ON room.id_reservation = reservation.id_reservation
        INNER JOIN client ON reservation.id_client = client.id_client
        INNER JOIN room_features ON room.id_features = room_features.id_features
        WHERE client.id_client = 9
        AND reservation.leaving_date >= CURRENT_DATE;
`; 

const getCountClientCancelled = `
        SELECT c.id_client, c.first_name, COUNT(ca.id_cancel) AS nombre_annulations
        FROM client c
        LEFT JOIN reservation r ON c.id_client = r.id_client
        LEFT JOIN cancel ca ON r.id_reservation = ca.id_reservation
        GROUP BY c.id_client, c.first_name;

`;

const getPaymentByMobileMoney = `
        SELECT SUM(amount_paid) AS total_mobile_money_payments
        FROM payment
        JOIN choose ON payment.id_payment = choose.id_payment
        JOIN payment_method ON choose.id_payment_method = payment_method.id_payment_method
        WHERE payment_method.mobile_money = true; 
` ; 
const getstatuscountreserved = `
        SELECT client.first_name,client.last_name, COUNT(reservation.id_reservation) AS reservation_count
        FROM client
        INNER JOIN reservation ON  client.id_client = reservation.id_client
        GROUP BY client.id_client;
`

const getCountReservationByHotel = `
        SELECT h.id_hotel, h.hotel_name, COUNT(r.id_reservation) AS total_reservations
        FROM hotel h
        LEFT JOIN room rm ON h.id_hotel = rm.id_hotel
        LEFT JOIN reservation r ON rm.id_reservation = r.id_reservation
        GROUP BY h.id_hotel, h.hotel_name;
`
const getAllSignupStaff = `
        SELECT email, password
        FROM receptionist
        WHERE "email" = $1 AND "password" = $2 ; 
`;

const getCheckEmail = `
        SELECT *
        FROM signup 
        WHERE Email = $1 ;
`;


const getAllSignupUser =  `
        SELECT *
        FROM signup
        WHERE Email = $1 AND Password = $2
`;
const getHotelRoomAvailable = `
        SELECT h.hotel_name
        FROM hotel h
        LEFT JOIN room r ON h.id_hotel = r.id_hotel
        LEFT JOIN reservation rv ON r.id_reservation = rv.id_reservation
        WHERE rv.id_reservation IS NULL OR 
        NOT (rv.date_arrived <= '2023-08-15' AND rv.leaving_date >= '2023-08-10')
        GROUP BY h.hotel_name, h.id_hotel;
`

const getRoomPricePricereduction = `
        select room.room_type,price.cost_per_night,promotion.percent 
        ,price.cost_per_night-((promotion.percent*price.cost_per_night)/100) 
        as price_actuelle from room inner join price on room.id_room=price.id_room
        inner join promotion on room.id_promotion=promotion.id_promotion where 
        current_date>promotion.begin_date and current_date<promotion.end_date;
        `

const getListOfPaymentWithNameOfReceptionist = `
        select payment.id_payment, receptionist.first_name, receptionist.last_name
        from payment inner join receptionist on
        payment.id_employee = receptionist.id_employee;
`

const AllBasic = {
    getAllRecptionist,
    getAllReservation,
    getAllpaymentByClient,
    getAllSignupStaff,
    getCheckEmail,
    getAllSignupUser,
    getDetailRoomOccupiedByClient,
    getCountClientCancelled,
    getPaymentByMobileMoney,
    getCountReservationByHotel,
    getstatuscountreserved,
    getHotelRoomAvailable,
    getRoomPricePricereduction,
    getListOfPaymentWithNameOfReceptionist
};

export default AllBasic;