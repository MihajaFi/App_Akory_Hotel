function rooms(data){
    const room = document.getElementById("rooms");
     
    data.map((values)=> {
        let dataOfRoom = "";
        dataOfRoom += `
        <div class='roombox roomboxsingle'>
        <div class='text-center no-boder'>
            <i class='fa-solid fa-bed fa-4x mb-2'></i>
            <p>Room : ${values.number}</p>
            <h3>Type :${values.room_type}</h3>
            <p>Capacity :  ${values.capacity_room}</p>
            <div class='mb-1'>None</div>
            <a href='#'><button class='btn btn-danger'>Delete</button></a>
        </div>
        </div>`;
    room.innerHTML += dataOfRoom;
    });

}

function addRoom() {
    fetch("http://localhost:5000/")
      .then((data) => data.json()) // Convert to object
      .then((data) => {
        rooms(data);
      })
      .catch((error) => console.error(error));
  }
  
  addRoom();
  