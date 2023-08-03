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
`

const AllBasic = {
    getAllRecptionist,
    getAllReservation,
    getClientNotPaid,
};

export default AllBasic;