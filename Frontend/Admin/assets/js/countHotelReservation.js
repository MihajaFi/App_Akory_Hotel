function countReservation(data) {
    const body_table = document.querySelector('#table_hotel');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id_hotel}</td>
      <td>${values.hotel_name}</td>
      <td>${values.total_reservations}</td>
      
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}

function infoHotel(){
    fetch("http://localhost:5000/hotelReservation")
.then((data) => {
    return data.json();
})
.then((data)=>{
    countReservation(data)
})
.catch(data =>alert(data))
}
infoHotel();

