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