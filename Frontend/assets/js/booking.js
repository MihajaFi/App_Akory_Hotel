$(document).ready(function() {
  
  $("#LogoutButton").on("click", function(event) {
    event.preventDefault(); 

    
    $.ajax({
      url: "http://localhost:5000/home",
      method: "POST",
      xhrFields: {
        withCredentials: true 
      },
      success: function(data) {    
        window.location.href = "./index.html"; 
      },
      error: function(xhr, textStatus, errorThrown) {
        if (xhr.status === 401) {
          window.location.href = "./index.html"; 
        } else {
          console.error("Déconnexion échouée.", textStatus, errorThrown);
          console.log(xhr.responseText);
          alert("Déconnexion échouée. Veuillez réessayer.");
        }
      }
    });
  });

  history.pushState(null, null, location.href);
  window.onpopstate = function(event) {
    history.go(1);
  };
});