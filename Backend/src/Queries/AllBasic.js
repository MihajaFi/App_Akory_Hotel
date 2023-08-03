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
        hotel h ON p.id_hotel = h.id_hotel;
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

const AllBasic = {
    getAllRecptionist,
    getAllReservation,
    getClientNotPaid,
    getDetailRoomOccupiedByClient,
    getCountClientCancelled,
};

export default AllBasic;