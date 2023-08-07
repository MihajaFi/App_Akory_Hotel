function AllIdPromotion(data) {
    const room = document.getElementById("name");
    let dataOfRoom = "";
    
    data[0].promotions.forEach((id) => {
      dataOfRoom += `<option value="${id}">${id}</option>`;
    });
  
    room.innerHTML = dataOfRoom;
  }
    
  function IdPromotion() {
    fetch("http://localhost:5000/CreateRoom")
      .then((data) => data.json()) 
      .then((data) => {
        AllIdPromotion(data);
      })
      .catch((error) => console.error(error));
  }
  
 IdPromotion();
  