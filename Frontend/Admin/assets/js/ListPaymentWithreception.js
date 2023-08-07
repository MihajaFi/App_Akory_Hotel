function ListReceptionist (data){
    const body_table = document.querySelector('#table_receptionist');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
        <td>${values.id_payment}</td>
        <td>${values.first_name}</td>
        <td>${values.last_name}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}
function receptionistInformation(){
    fetch("http://localhost:5000/Receptionist")
    .then((data) => {
     
        return data.json(); //convert to object
      })
      .then((data) => {
        ListReceptionist(data)
        
      })
      .catch(data=>alert(data))
}
receptionistInformation();