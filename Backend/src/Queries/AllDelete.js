const deleteBooking = `
DELETE FROM reservation
WHERE id_reservation = $1 ;
`

const AllDelete = {
    deleteBooking,
}

export default AllDelete ;