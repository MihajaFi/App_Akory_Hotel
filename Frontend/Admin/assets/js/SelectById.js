// Fonction pour afficher les résultats de la recherche
function rooms(data) {
    const roomContainer = document.getElementById("rooms");
    let dataOfRoom = "";
  
    data.map((values) => {
      dataOfRoom += `
        <div class='roombox roomboxsingle'>
          <div class='text-center no-boder'>
            <i class='fa-solid fa-bed fa-4x mb-2'></i>
            <p>Room : ${values.room_number}</p>
            <h3>${values.room_type}</h3>
            <p>Capacity :  ${values.capacity_room}</p>
            <a href="#" onclick='deleteRoom(${values.id_room})'><button class='btn btn-danger'>Delete</button></a>
          </div>
        </div>`;
    });
  
    roomContainer.innerHTML = dataOfRoom;
  }
  
  // Fonction pour effectuer la recherche de chambre
  function addRooms(room_numberId) {
    fetch(`http://localhost:5000/room/${room_numberId}`)
      .then((data) => data.json())
      .then((data) => {
        rooms(data);
      })
      .catch((error) => console.error(error));
  }
  
  // Fonction pour gérer le clic sur le bouton "Rechercher"
  function searchRoom() {
    const roomNumberInput = document.getElementById("roomNumberInput");
    const roomNumber = roomNumberInput.value;
    addRooms(roomNumber);
  }
  
  // Appeler la fonction addRooms avec une valeur par défaut pour afficher tous les résultats au chargement initial
  addRooms("1");
  