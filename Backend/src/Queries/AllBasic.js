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

const AllBasic = {
    getAllRecptionist,
    getAllReservation,
    getClientNotPaid,
    getAllSignupStaff,
    getCheckEmail,
    getAllSignupUser,
};

export default AllBasic;