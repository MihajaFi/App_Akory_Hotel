function rooms(data){
    const room = document.getElementById("roomsprice");
     
    data.map((values)=> {
        let dataOfRoom = "";
        dataOfRoom += `
        <div class='roombox roomboxs'>
        <div class='text-center no-boder'>
            <i class='fa-solid fa-bed fa-4x mb-2'></i>
            <p>Room : ${values.room_type}</p>
            <p> price:<span id='noprice'> ${values.cost_per_night} Ar<span></p>
            <p>promotion : <span id='percent'> -${values.percent} %</span></p>
            <p>total price now: <span id='pricenow'> ${values.price_actuelle}Ar</span></p>
        </div>
        </div>`;
    room.innerHTML += dataOfRoom;
    });

}

function addRoom() {
    fetch("http://localhost:5000/listroom")
      .then((data) => data.json()) 
      .then((data) => {
        rooms(data);
      })
      .catch((error) => console.error(error));
  }
  
  addRoom();
  




// select room.room_type,price.cost_per_night as price,price.cost_per_night-((promotion.percent*price.cost_per_night)/100) as reduction from room inner join price on room.id_room=price.id_room
// inner join promotion on room.id_promotion=promotion.id_promotion inner join season on price.id_season
// =season.id_season where current_date>season.start_date and current_date<season.end_date;

// select room.room_type,price.cost_per_night as price,promotion.percent as reduction_de,price.cost_per_night-((promotion.percent*price.cost_per_night)/100) as price_actuelle from room inner join price on room.id_room=price.id_room
//inner join promotion on room.id_promotion=promotion.id_promotion where current_date>promotion.begin_date and current_date<promotion.end_date;