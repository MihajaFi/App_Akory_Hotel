async function getTotalBookedRoom() {
    try {
      const response = await fetch('http://localhost:5000/dashboard');
      const totalBookedRoom = await response.text();
      document.getElementById('text_one').textContent = totalBookedRoom + " / 50";
    } catch (error) {
      console.error('Error fetching total booked room:', error);
    }
  }

  getTotalBookedRoom();
