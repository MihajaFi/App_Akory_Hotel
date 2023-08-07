function showAllClientNopay(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.id_client}</td>
      <td>${values.first_name}</td>
      <td>${values.email}</td>
      <td>${values.total_amount_status}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}

function infoClientNoPay(){
    fetch("http://localhost:5000/totalAmountStatus")
.then((data) => {
    return data.json();
})
.then((data)=>{
    showAllClientNopay(data)
})
.catch(data =>alert(data))
}
infoClientNoPay();

const toggleButton = document.getElementById('toggleButton');
  const overlay = document.getElementById('overlay');
  const miniTableContainer = document.getElementById('miniTableContainer');
  const closeButton = document.getElementById('closeButton');

  toggleButton.addEventListener('click', () => {
    overlay.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  const toggle = document.getElementById('ButtonList');
  const over = document.getElementById('overlayy');
  const mini = document.getElementById('miniTableReceptionist');
  const closeBtn = document.getElementById('closeBtn');

  toggle.addEventListener('click', () => {
    over.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    over.style.display = 'none';
  });


  //search bar logic using js
  const searchFun = () => {
    let filter = document.getElementById('search_bar').value.trim().toUpperCase(); // Utiliser trim() pour supprimer les espaces au début et à la fin
    let myTable = document.getElementById("table-data");
    let tr = myTable.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        let tdStatus = tr[i].getElementsByTagName('td')[3];

        if (td) {
            let textValue = td.textContent || td.innerHTML;
            let statusValue = tdStatus.textContent || tdStatus.innerHTML;

            if (filter === "FALSE") { // Vérifier si le filtre est égal à "FALSE" spécifiquement
                if (statusValue.toUpperCase() === "FALSE") {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            } else { // Si le filtre n'est pas "FALSE", effectuer la recherche normale
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
}
