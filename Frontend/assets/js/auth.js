function Usersignup(data) {
    const formData = new FormData(data);
    
    const userData = {
      Username: formData.get("Username"),
      Email: formData.get("Email"),
      Password: formData.get("Password"),
      Cpassword: formData.get("CPassword"),
    };
  
    fetch("http://localhost:5000/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          alert('sign up successfully')
          loginpage() ;
          // Effectuer d'autres actions après l'insertion réussie
        } else {
          throw new Error("Erreur lors de l'insertion");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  document
    .getElementById("usersignup")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
  
      Usersignup(event.target);
    });
  