function Sum(data) {
    const body_table = document.querySelector('#table_sum');
  
    data.map((values)=> {
        let dataInitial = "";
        dataInitial += `<tr>
        <td>${values.total_mobile_money_payments}<span><p>Ar</p></span></td>
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
 