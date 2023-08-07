function AllIdHotel(data) {
    const room = document.getElementById("hotel_name");
    let dataOfRoom = "";
    
    data[0].hotels.forEach((id) => {
      dataOfRoom += `<option value="${id}">${id}</option>`;
    });
  
    room.innerHTML = dataOfRoom;
  }
    
  function IdHotel() {
    fetch("http://localhost:5000/CreateRoom")
      .then((data) => data.json()) 
      .then((data) => {
        AllIdHotel(data);
      })
      .catch((error) => console.error(error));
  }
  
 IdHotel();
  