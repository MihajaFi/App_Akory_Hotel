function showAllBooking(data) {
  const body_table = document.querySelector('#table_body');

  data.map((values)=> {
      let dataInitial = "";
      dataInitial += `<tr>
      <td>${values.id_reservation}</td>
      <td>${values.name}</td>
      <td>${values.email}</td>
      <td>${values.date_arrived}</td>
      <td>${values.leaving_date}</td>
      <td>${values.number_of_person}</td>
      <td>${values.cin}</td>
     
    
  </tr>`;
  body_table.innerHTML += dataInitial;
  });
}

function addAllinformation() {
  fetch("http://localhost:5000/roombook")
  .then((data) => {
   
    return data.json(); //convert to object
  })
  .then((data) => {
    showAllBooking(data)
    
  })
  .catch(data=>alert(data))
 }
addAllinformation() ;