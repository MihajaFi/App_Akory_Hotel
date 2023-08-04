function fetchAvailableHotels(startDate, endDate) {
    const data = {
      dateArrived: startDate,
      dateLeaving: endDate
    };
  
    $.get("http://localhost:5000/hotel", data, function (data) {
      const hotelList = $("#hotelList");
  
      // Videz la liste actuelle avant d'ajouter les nouveaux éléments
      hotelList.empty();
  
      // Ajoutez chaque hôtel à la liste
      data.forEach(function (hotel) {
        const hotelItem = $("<li></li>").text(hotel.hotel_name);
        hotelList.append(hotelItem);
      });
    }).fail(function (err) {
      console.error(err.responseText);
      alert("Une erreur est survenue lors de la récupération des hôtels disponibles.");
    });
  }

  $(document).ready(function () {
    $("#searchForm").on("submit", function (event) {
      event.preventDefault();
      const startDate = $("#dateArrived").val();
      const endDate = $("#dateLeaving").val();
      fetchAvailableHotels(startDate, endDate);
    });
  });
  