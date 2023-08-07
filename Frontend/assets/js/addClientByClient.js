function AddClient(data) {
    const formData = new FormData(data);
    const clientData = {
        FirstName : formData.get('FirstName'),
        LastName : formData.get('LastName'),
        Email : formData.get('Email'),
        Phone : formData.get('Phone'),
        EmergePhone : formData.get('EmergePhone'),
        Gender : formData.get('Gender'),
        Cin : formData.get('Cin'),
        Address : formData.get('Address'),
        password : formData.get('password'),
        Cpassword : formData.get('Cpassword')
    };

    fetch("http://localhost:5000/guestdetailsubmitinfo", {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(clientData),
    })
    .then((response) => {
        if (response.ok) {
          alert('Inserted successfully');
          window.location.reload()
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

const FirstName = document.getElementById('FirstName');
const LastName = document.getElementById('LastName');
const Email = document.getElementById('Email');
const Phone = document.getElementById('Phone');
const EmergePhone = document.getElementById('EmergePhone');
const Gender = document.getElementById('Gender');
const Cin = document.getElementById('Cin');
const Address = document.getElementById('Address');
const Password = document.getElementById('password');
const Cpassword = document.getElementById('Cpassword');

document.getElementById('infoClient').addEventListener("submit", function(event){
    event.preventDefault();
    AddClient(event.target)

    FirstName.value = "";
    LastName.value = "";
    Email.value = "";
    Phone.value = "";
    EmergePhone.value = "";
    Gender.value = "";
    Cin.value = "";
    Address.value = "";
    Password.value = "";
    Cpassword.value = "";

});