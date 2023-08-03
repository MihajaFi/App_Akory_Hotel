function SumByHotel(data){
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
function InformationOfHotel(){
    fetch("http://localhost:5000/Sum")
    .then((data) => {
     
      return data.json(); //convert to object
    })
    .then((data) => {
      SumByHotel(data)
      
    })
    .catch(data=>alert(data))
}
InformationOfHotel();