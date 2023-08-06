function populateDropdown(data) {
    const selectDropdown = document.getElementById("Employee");
  
    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id_employee; // Valeur à envoyer lorsque l'option est sélectionnée
        option.textContent = `${item.first_name}  ${item.last_name}`; // Texte affiché pour l'option
        selectDropdown.appendChild(option);
    });
  }
  
  function fetchDataFromDatabase() {
    fetch("http://localhost:5000/client") 
        .then((response) => response.json())
        .then((data) => {
            populateDropdown(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
  }
  fetchDataFromDatabase();