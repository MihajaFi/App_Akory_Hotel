function AddRoomBook(data) {
    const formData = new FormData(data);
    const roomBookData = {
        RoomType : formData.get('RoomType'),
        cin : formData.get('cin'),
        cout : formData.get('cout'),
        ClientName : formData.get('ClientName'),
        PersNbr : formData.get('PersNbr')
    };

    fetch("http://localhost:5000/guestdetailsubmitinfores", {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(roomBookData),
    })
    .then((response) => {
        if (response.ok) {
          alert('Inserted successfully')
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

const RoomType = document.getElementById('RoomType');
const ClientName = document.getElementById('ClientName');
const PersNbr = document.getElementById('PersNbr');
const cin = document.getElementById('cin');
const cout = document.getElementById('cout');

document.getElementById('infoReservation').addEventListener("submit", (e) =>{
    e.preventDefault();
    AddRoomBook(e.target);

    RoomType.value = "";
    ClientName.value = "";
    PersNbr.value = "";
    cin.value = "";
    cout.value = "";

});