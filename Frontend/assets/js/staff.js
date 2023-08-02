function StaffSignIn(data){
    const formData = new FormData(data);

    const StaffData = {
       
        Emp_Email : formData.get('Emp_Email'),
        Emp_Password : formData.get('Emp_Password')
    } ;
    
   

    fetch('http://localhost:5000/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(StaffData),
  })
        .then((response) => {
            if (response.ok) {
                return response.json() ;
            }
            else{
                throw new Error('Hafa')
            }
        }) 
        .then((data) => {
           if (data.success){
            window.location.href = 'Admin/pages/admin.html'
           }
          })
          .catch((error) => {
            console.error(error);
            alert('Erreur');
          });
  
}
document.querySelector("#employeelogin").addEventListener('submit', function (event) {
    event.preventDefault();
  StaffSignIn(event.target);
   });
