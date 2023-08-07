function AllIdReservation(data) {
    const room = document.getElementById("Client");
    let dataOfRoom = "";
    
    data[0].reservations.forEach((id) => {
      dataOfRoom += `<option value="${id}">${id}</option>`;
    });
  
    room.innerHTML = dataOfRoom;
  }
    
  function IdReservation() {
    fetch("http://localhost:5000/CreateRoom")
      .then((data) => data.json()) 
      .then((data) => {
        AllIdReservation(data);
      })
      .catch((error) => console.error(error));
  }
  
 IdReservation();
  