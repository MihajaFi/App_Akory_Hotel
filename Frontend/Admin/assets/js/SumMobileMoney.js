function SumMobileMoney(data){
    const body_table = document.querySelector('#table_SumMobile');

    data.map((values)=>{
        let dataInitial = "";
        dataInitial += `<tr>
        <td>${values.total_payements}</td>
      </tr>`;
      body_table.innerHTML += dataInitial;
    })
}

function infoSumMoney(){
    fetch("http://localhost:5000/payment")
    .then((data) => {
        return data.json();
    })
    .then((data)=>{
        SumMobileMoney(data)
    })
    .catch(data =>alert(data))
}
infoSumMoney();