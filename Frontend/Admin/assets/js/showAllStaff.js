function showAllStaff(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id_employee}</td>
      <td>${values.first_name}</td>
      <td>${values.last_name}</td>
      <td>${values.email}</td>
      <td>${values.work_contact}</td>
      <td>${values.hotel_name}</td>
      <td>${values.province_name}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}
function addAllinformation() {
    fetch("http://localhost:5000/staff")
    .then((data) => {
      return data.json(); //convert to object
    })
    .then((data) => {
      showAllStaff(data);
      
    })
    .catch(data=>alert(data))
}
addAllinformation() ;

const searchFun = () => {
  let filter = document.getElementById('search_bar').value.toUpperCase();
  let myTable = document.getElementById("table-data");
  let tr = myTable.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
      let tdId = tr[i].getElementsByTagName('td')[0]; // Première colonne (ID de réservation)
      let tdName = tr[i].getElementsByTagName('td')[1]; // Deuxième colonne (Nom)
      let tdLname = tr[i].getElementsByTagName('td')[2];
      let tdHotel = tr[i].getElementsByTagName('td')[5];
      let tdProvince = tr[i].getElementsByTagName('td')[6];

      if (tdId || tdName || tdHotel || tdProvince || tdLname) {
          let textId = tdId.textContent || tdId.innerHTML;
          let textName = tdName.textContent || tdName.innerHTML;
          let textHotel = tdHotel.textContent || tdHotel.innerHTML;
          let textProvince = tdProvince.textContent || tdProvince.innerHTML;
          let textLname = tdLname.textContent || tdLname.innerHTML;

          // Recherche dans l'ID de réservation OU le nom
          if (textId.toUpperCase().indexOf(filter) > -1 || textName.toUpperCase().indexOf(filter) > -1 ||
          textHotel.toUpperCase().indexOf(filter) > -1 || textProvince.toUpperCase().indexOf(filter) > -1 ||
          textLname.toUpperCase().indexOf(filter) > -1){
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}