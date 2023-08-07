function showAllClient(data) {
    const body_table = document.querySelector('#table_body');

    data.map((val)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${val.id_client}</td>
      <td>${val.client_name}</td>
      <td>${val.email}</td>
      <td>${val.principal_contact}</td>
      <td class="action">
      
      <button class="btn btn-primary" onclick="editAction(${val.id_client})">Edit</button>
      <button class="btn btn-danger" onclick="deleteAction(${val.id_client})">Delete</button>
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


function deleteAction(id) {
    // Demande de confirmation à l'utilisateur avant de supprimer le client
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet client ?");
    
    // Si l'utilisateur confirme la suppression
    if (confirmation) {
      // Endpoint de l'API pour supprimer le client
      const deleteURL = `http://localhost:5000/client/${id}`;
  
      // Configuration de la requête fetch pour envoyer une requête DELETE au serveur
      fetch(deleteURL, {
        method: "DELETE",
      })
      .then((response) => {
        // Vérification de la réponse du serveur
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de ce client");
        }
        // Suppression réussie, recharger la page pour mettre à jour le tableau
        location.reload();
      })
      .catch((error) => {
        console.error("Erreur :", error);
        // Gérer les erreurs d'une manière appropriée, par exemple, afficher un message d'erreur à l'utilisateur
        alert("Une erreur est survenue lors de la suppression de ce client.");
      });
    }
  }
  