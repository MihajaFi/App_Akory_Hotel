const getClientNotPaid = `
        SELECT client.id_client, client.name, client.email
        FROM client
        LEFT OUTER JOIN payment ON payment.id_employee = client.id_employee
        WHERE payment.id_employee IS NULL;
` ; 

const getAllRecptionist = `
        SELECT 
        r.id_employee, r.first_name, r.last_name, r.email, r.work_contact, 
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
        select reservation.id_reservation , client.name , client.email ,reservation.date_arrived ,reservation.number_of_person,reservation.leaving_date ,client.CIN
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
        SELECT c.id_client, c.name, COUNT(ca.id_cancel) AS nombre_annulations
        FROM client c
        LEFT JOIN reservation r ON c.id_client = r.id_client
        LEFT JOIN cancel ca ON r.id_reservation = ca.id_reservation
        GROUP BY c.id_client, c.name;

`;

const getPaymentByMobileMoney = `
        SELECT SUM(amount_paid) AS total_mobile_money_payments
        FROM payment
        JOIN choose ON payment.id_payment = choose.id_payment
        JOIN payment_method ON choose.id_payment_method = payment_method.id_payment_method
        WHERE payment_method.mobile_money = true; 
` ; 

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

const AllBasic = {
    getAllRecptionist,
    getAllReservation,
    getClientNotPaid,
    getAllSignupStaff,
    getCheckEmail,
    getAllSignupUser,
    getDetailRoomOccupiedByClient,
    getCountClientCancelled,
    getPaymentByMobileMoney,
};

export default AllBasic;