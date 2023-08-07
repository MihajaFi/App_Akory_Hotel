function deleteRoom(roomId) {
  fetch(`http://localhost:5000/room/${roomId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        alert('Room deleted successfully');
          window.location.href = './room.html';
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
