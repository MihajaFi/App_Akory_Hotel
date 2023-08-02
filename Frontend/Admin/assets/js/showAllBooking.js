function showAllBooking(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id}</td>
      <td>${values.Name}</td>
      <td>${values.Email}</td>
      <td>${values.Country}</td>
      <td>${values.Phone}</td>
      <td>${values.RoomType}</td>
      <td>${values.Bed}</td>
      <td>${values.Meal}</td>
      <td>${values.NoofRoom}</td>
      <td>${values.cin}</td>
      <td>${values.cout}</td>
      <td>${values.nodays}</td>
      <td>${values.stat}</td>
      
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