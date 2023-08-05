function AllIdFeature(data) {
    const room = document.getElementById("id_features");
    let dataOfRoom = "";
    
    data[0].room_features.forEach((id) => {
      dataOfRoom += `<option value="${id}">${id}</option>`;
    });
  
    room.innerHTML = dataOfRoom;
  }
    
  function IdFeature() {
    fetch("http://localhost:5000/CreateRoom")
      .then((data) => data.json()) 
      .then((data) => {
        AllIdFeature(data);
      })
      .catch((error) => console.error(error));
  }
  
 IdFeature();
  