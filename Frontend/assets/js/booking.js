const { response } = require("express");

function booking(data) {
    const formData = new FormData(data);
    const bookData = {
      Name : formData.get('first_name'),
      Email : formData.get('Email') ,
    Country : formData.get('countryDropdown'),
    Phone : formData.get('phonenbr'),
    RoomType : formData.get('roomtype'),
    Bed : formData.get('bed'),
    NoofRoom : formData.get('noofroom'),
    Meal : formData.get('meal'),
    cin : formData.get('cin'),
    cout : formData.get('cout')
    }; 
    fetch('http://localhost:/8000/home.html',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })
    .then((response)=>{
      if (response.ok) {
        alert("reserved successfuly")
      }else{
        throw new console.error("Error in inserted");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
document.getElementById('reservation').addEventListener('submit',function(event){
  event.preventDefault();

  booking(event.target);
})