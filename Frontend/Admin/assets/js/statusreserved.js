function showAllreserved(data) {
    const body_table = document.querySelector('#table_body');

    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
      <td>${values.first_name}</td>
      <td>${values.last_name}</td>
      <td>${values.reservation_count}</td>
    </tr>`;
    body_table.innerHTML += dataInitial;
    });
}

function sumreserved(){
    fetch("http://localhost:5000/statusreserved")
.then((data) => {
    return data.json();
})
.then((data)=>{
    showAllreserved(data)
})
.catch(data =>alert(data))
}
sumreserved();