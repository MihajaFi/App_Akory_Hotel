function showAllStaff(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id_employee}</td>
      <td>${values.staff_name}</td>
      <td>${values.email}</td>
      <td>${values.work_contact}</td>
      <td>${values.hotel_name}</td>
      <td>${values.province_name}</td>
      <td class="action">
      
      <button class="btn btn-primary" onclick="editAction(${values.id_employee})">Edit</button>
      <button class="btn btn-danger" onclick="deleteAction(${values.id_employee})">Delete</button>
    </td>
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
  let myTable = document.getElementById('table-data');
  let tr = myTable.getElementsByTagName('tr');

  for (var i = 0; i < tr.length; i++) {
      let tdId = tr[i].getElementsByTagName('td')[0]; // Première colonne (ID de réservation)
      let tdName = tr[i].getElementsByTagName('td')[1]; // Deuxième colonne (Nom)
      let tdHotel = tr[i].getElementsByTagName('td')[4];
      let tdProvince = tr[i].getElementsByTagName('td')[5];

      if (tdId || tdName || tdHotel || tdProvince) {
          let textId = tdId.textContent || tdId.innerHTML;
          let textName = tdName.textContent || tdName.innerHTML;
          let textHotel = tdHotel.textContent || tdHotel.innerHTML;
          let textProvince = tdProvince.textContent || tdProvince.innerHTML;

          // Recherche dans l'ID de réservation OU le nom
          if (textId.toUpperCase().indexOf(filter) > -1 || textName.toUpperCase().indexOf(filter) > -1 ||
          textHotel.toUpperCase().indexOf(filter) > -1 || textProvince.toUpperCase().indexOf(filter) > -1){
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}

function deleteAction(id) {
  // Demande de confirmation à l'utilisateur avant de supprimer la réservation
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette employée ?");
  
  // Si l'utilisateur confirme la suppression
  if (confirmation) {
    // Endpoint de l'API pour supprimer la réservation
    const deleteURL = `http://localhost:5000/staff/${id}`;

    // Configuration de la requête fetch pour envoyer une requête DELETE au serveur
    fetch(deleteURL, {
      method: "DELETE",
    })
    .then((response) => {
      // Vérification de la réponse du serveur
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de cette employée");
      }
      // Suppression réussie, recharger la page pour mettre à jour le tableau
      location.reload();
    })
    .catch((error) => {
      console.error("Erreur :", error);
      // Gérer les erreurs d'une manière appropriée, par exemple, afficher un message d'erreur à l'utilisateur
      alert("Une erreur est survenue lors de la suppression de l'employée.");
    });
  }
}
