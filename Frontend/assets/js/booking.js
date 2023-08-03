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
      dataInitial += `<tr>
      <td>${values.id_hotel}</td>
      <td>${values.hotel_name}</td>
      <td>${values.address}</td> 
      </tr>`;
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
