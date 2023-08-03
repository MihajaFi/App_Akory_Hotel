function AddRoom(data) {
    const formData = new FormData(data);
    const roomData = {
      number: formData.get('number'),
      room_type: formData.get('room_type'),
      capacity_room: formData.get('capacity_room'),
      id_reservation: formData.get('id_reservation'),
      id_promotion: formData.get('id_promotion'),
      id_features: formData.get('id_features'),
    };
  
    fetch("http://localhost:5000/CreateRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Room added successfully');
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

    const  number = document.getElementById('number');
    const    room_type = document.getElementById('room_type');
    const   capacity_room = document.getElementById('capacity_room');
    const   id_reservation = document.getElementById('id_reservation');
    const   id_promotion = document.getElementById('id_promotion');
    const   id_features = document.getElementById('id_features');

  
  document.getElementById('room-form').addEventListener("submit", (e) => {
    e.preventDefault();
    AddRoom(e.target);
    
    number.value = "";
    room_type.value = "";
    capacity_room.value = "";
    id_reservation.value = "";
    id_promotion.value = "";
    id_features.value = "";
  });
  