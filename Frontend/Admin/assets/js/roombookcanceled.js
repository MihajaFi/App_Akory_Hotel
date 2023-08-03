function showAllCanceledBooking(data) {
  const body_table = document.querySelector("#table_body");

  data.map((values) => {
    let dataInitial = "";
    dataInitial += `<tr>
        <td>${values.id_client}</td>
        <td>${values.name}</td>
        <td>${values.nombre_annulations}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
  });
}

function addAllinformation() {
  fetch("http://localhost:5000/canceled")
    .then((data) => {
      return data.json(); //convert to object
    })
    .then((data) => {
      showAllCanceledBooking(data);
    })
    .catch((data) => alert(data));
}
addAllinformation();
