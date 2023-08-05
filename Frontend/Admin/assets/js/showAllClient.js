function showAllClient(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id_client}</td>
      <td>${values.client_name}</td>
      <td>${values.email}</td>
      <td>${values.principal_contact}</td>
      <td class="action">
      
      <button class="btn btn-primary" onclick="editAction(${values.id_client})">Edit</button>
      <button class="btn btn-danger" onclick="deleteAction(${values.id_client})">Delete</button>
    </td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}

function addAllinformation() {
    fetch("http://localhost:5000/client")
    .then((data) => {
      return data.json(); //convert to object
    })
    .then((data) => {
        showAllClient(data);
    })
    .catch(data=>alert(data))
}

addAllinformation() ;

const searchFun = () => {
  let filter = document.getElementById('search_bar').value.toUpperCase();
  let myTable = document.getElementById('table-data');
  let tr = myTable.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
      let tdId = tr[i].getElementsByTagName('td')[0]; // Première colonne (ID de réservation)
      let tdName = tr[i].getElementsByTagName('td')[1]; // Deuxième colonne (Nom)

      if (tdId || tdName) {
          let textId = tdId.textContent || tdId.innerHTML;
          let textName = tdName.textContent || tdName.innerHTML;

          // Recherche dans l'ID de réservation OU le nom
          if (textId.toUpperCase().indexOf(filter) > -1 || textName.toUpperCase().indexOf(filter) > -1){
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}   