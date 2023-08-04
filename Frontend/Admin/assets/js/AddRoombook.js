function AddRoomBook(data) {
    const formData = new FormData(data);
    const roomBookData = {
        DArrived : formData.get('DArrived'),
        DLeaved : formData.get('DLeaved'),
        PerNbr : formData.get('PerNbr'),
        Country : formData.get('Country')
    };

    fetch("http://localhost:5000/roombook", {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(roomBookData),
    })
    .then((response) => {
        if (response.ok) {
          alert('Inserted successfully')
          window.location.href = './roombook.html'
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

document.getElementById('guestdetailpanel').addEventListener("submit", (e) =>{
    e.preventDefault();
    AddRoomBook(e.target);
});