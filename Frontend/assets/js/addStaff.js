function AddStaff(data) {
    const formData = new FormData(data);
    const staffData = {
        Name : formData.get('Name'),
        LastName : formData.get('LastName'),
        Email : formData.get('Email'),
        Phone : formData.get('Phone'),
        Country : formData.get('Country'),
        Password : formData.get('Password'),
        Cpassword : formData.get('Cpassword')
    };

    fetch("http://localhost:5000/staff", {
        method : "POST",
        headers : {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(staffData),
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

const Names = document.getElementById('Name');
const lastname = document.getElementById('LastName');
const email = document.getElementById('Email');
const Phone = document.getElementById('Phone');
const Country = document.getElementById('Country');
const Password = document.getElementById('Password');
const CPassword = document.getElementById('CPassword');

document.getElementById('guestdetailpanel').addEventListener("submit", (e) =>{
    e.preventDefault();
    AddStaff(e.target);

    Names.value = "";
    lastname.value = "";
    email.value = "";
    Phone.value = "";
    Country.value = "";
    Password.value = "";
    CPassword.value = "";
});

