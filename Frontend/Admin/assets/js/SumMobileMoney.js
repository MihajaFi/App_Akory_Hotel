function Sum(data) {
    const body_table = document.querySelector('#table_sum');
  
    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
        <td>${values.total_mobile_money_payments}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
  }
  
  function addAllinformation() {
    fetch("http://localhost:5000/Sum")
    .then((data) => {
     
      return data.json(); //convert to object
    })
    .then((data) => {
      Sum(data)
      
    })
    .catch(data=>alert(data))
   }
  addAllinformation() ;

  const showEmptyTable = () => {
    const emptyTableDiv = document.getElementById('emptyTable');
    const mainTableDiv = document.querySelector('.roombooktable');

    // Vérifier l'état actuel du div vide (affiché ou masqué)
    if (emptyTableDiv.style.display === 'none') {
        emptyTableDiv.style.display = 'block';
        mainTableDiv.style.display = 'none'; // Masquer la table principale (si nécessaire)
    } else {
        emptyTableDiv.style.display = 'none';
        mainTableDiv.style.display = 'block'; // Réafficher la table principale (si nécessaire)
    }
}   