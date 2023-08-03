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
      <td class="action">
      
      <button class="btn btn-primary" onclick="editAction(${values.id_reservation})">Edit</button>
      <button class="btn btn-danger" onclick="deleteAction(${values.id_reservation})">Delete</button>
    </td>
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


function deleteAction(id) {
  // Demande de confirmation à l'utilisateur avant de supprimer la réservation
  const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
  
  // Si l'utilisateur confirme la suppression
  if (confirmation) {
    // Endpoint de l'API pour supprimer la réservation
    const deleteURL = `http://localhost:5000/roombook/${id}`;

    // Configuration de la requête fetch pour envoyer une requête DELETE au serveur
    fetch(deleteURL, {
      method: "DELETE",
    })
    .then((response) => {
      // Vérification de la réponse du serveur
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la réservation");
      }
      // Suppression réussie, recharger la page pour mettre à jour le tableau
      location.reload();
    })
    .catch((error) => {
      console.error("Erreur :", error);
      // Gérer les erreurs d'une manière appropriée, par exemple, afficher un message d'erreur à l'utilisateur
      alert("Une erreur est survenue lors de la suppression de la réservation.");
    });
  }
}
