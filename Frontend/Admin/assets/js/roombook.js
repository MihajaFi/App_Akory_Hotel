var detailpanel = document.getElementById("guestdetailpanel");

adduseropen = () => {
    detailpanel.style.display = "flex";
}
adduserclose = () => {
    detailpanel.style.display = "none";
}

//search bar logic using js
const searchFun = () => {
    let filter = document.getElementById('search_bar').value.toUpperCase();
    let myTable = document.getElementById("table-data");
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let tdId = tr[i].getElementsByTagName('td')[0]; // Première colonne (ID de réservation)
        let tdName = tr[i].getElementsByTagName('td')[1]; // Deuxième colonne (Nom)

        if (tdId || tdName) {
            let textId = tdId.textContent || tdId.innerHTML;
            let textName = tdName.textContent || tdName.innerHTML;

            // Recherche dans l'ID de réservation OU le nom
            if (textId.toUpperCase().indexOf(filter) > -1 || textName.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

