function UserSignIn(data){
    const formData = new FormData(data);

    const userData = {
       
        Email : formData.get('Email') ,
        Password : formData.get('Password'),
    } ;
    
    console.log(Email);
    console.log(Password);

    fetch('http://localhost:5000/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
        .then((response) => {
            if (response.ok) {
                return response.json() ;
            }
            else{
                throw new Error('Invalid credentials')
            }
        }) 
        .then((data) => {
           if (data.success){
            window.location.href = 'Page/home.html'
           }
          })
          .catch((error) => {
            console.error(error);
            alert('Sign-in failed. Please check your credentials.');
          });
  
}
document.getElementById('userlogin').addEventListener('submit', function (event) {
    event.preventDefault();
   UserSignIn(event.target);
   });
