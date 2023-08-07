// Votre JavaScript pour récupérer les valeurs depuis le serveur
async function getDashboardData() {
    try {
      const response = await fetch('http://localhost:5000/dashboard');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      // Mettre à jour les valeurs dans la page HTML
      document.getElementById('text_one').textContent = data.totalBookedRoom + " / 50";
      document.getElementById('text_too').textContent = data.totalStaffs + " / 6";
      document.getElementById('text_free').textContent = data.totalProfit;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }
  
  getDashboardData();
  