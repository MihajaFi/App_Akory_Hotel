function AddRoom(data) {
    const formData = new FormData(data);
    const roomData = {
      room_number: formData.get('room_number'),
      room_type: formData.get('room_type'),
      capacity_room: formData.get('capacity_room'),
      Client: formData.get('Client'),
      name: formData.get('name'),
      id_features: formData.get('id_features'),
      hotel_name: formData.get('hotel_name'),
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
          window.location.href = './room.html';
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

    const  room_number = document.getElementById('room_number');
    const   room_type = document.getElementById('room_type');
    const   capacity_room = document.getElementById('capacity_room');
    const   Client = document.getElementById('Client');
    const   name = document.getElementById('name');
    const   id_features = document.getElementById('id_features');
    const   hotel_name = document.getElementById('hotel_name');

  document.getElementById('room-form').addEventListener("submit", (e) => {
    e.preventDefault();
    AddRoom(e.target);
    
    room_number.value = "";
    room_type.value = "";
    capacity_room.value = "";
    Client.value = "";
    name.value = "";
    id_features.value = "";
    hotel_name.value = "";
    alert("tonga")
  });

  
