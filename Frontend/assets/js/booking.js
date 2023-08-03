function booking(data) {
  const formData = new FormData(data);
  const bookData = {
    Name: formData.get('Name'),
    Email: formData.get('Email'),
    Country: formData.get('countryDropdown'),
    Phone: formData.get('Phone'),
    RoomType: formData.get('RoomType'),
    Bed: formData.get('Bed'),
    NoofRoom: formData.get('NoofRoom'),
    Meal: formData.get('Meal'),
    cin: formData.get('cin'),
    cout: formData.get('cout'),
  };

  fetch('http://localhost:5000/guestdetailsubmit', { // Corrected URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  })
    .then((response) => {
      if (response.ok) {
        alert('Reservation successful');
      } else {
        throw new Error('Error in inserting');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

document.getElementById('guestdetailpanel').addEventListener('submit', function (event) {
  event.preventDefault();
  booking(event.target);
});

function showAllhotel(data) {
  const body_table = document.querySelector('#prohotel');

  data.map((values)=> {
      let dataInitial = "";
      dataInitial += `
      <div class="roombox">
          <div class="hotelphoto h1"></div>
          <div class="roomdata">
            <h4 id="hotel_name">${values.id_hotel}</h4>
            <h6 id="provin">T${values.hotel_name}</h6>
            <h6 id="adress">${values.address}</h6>
            <div class="services">
              <i class="fa-solid fa-wifi"></i>
              <i class="fa-solid fa-burger"></i>
              <i class="fa-solid fa-spa"></i>
              <i class="fa-solid fa-dumbbell"></i>
              <i class="fa-solid fa-person-swimming"></i>
            </div>
            <button class="btn btn-primary bookbtn" id="butt" onclick="openbookbox()">Book</button>
          </div>
        </div>`;
  body_table.innerHTML += dataInitial;
  });
}

function showAllinformation() {
  fetch("http://localhost:5000/home")
  .then((data) => {
   
    return data.json(); //convert to object
  })
  .then((data) => {
    showAllhotel(data)
    
  })
  .catch(data=>alert(data))
 }
showAllinformation() ;
document.getElementById("btnsearch").addEventListener('submit',function (event) {
  event.preventDefault();
  showAllhotel(event.target);
})