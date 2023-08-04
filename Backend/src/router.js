import { Router } from "express";
import { pool } from "./connectionToDatabase.js"; 
import AllBasic from "./Queries/AllBasic.js";

export const router = new Router();

router.post("/index", (req, res) => {
  const { Username, Email, Password, CPassword } = req.body;
  const { Emp_Email, Emp_Password } = req.body;
  
  if (Emp_Email && Emp_Password) {
    pool.query(AllBasic.getAllSignupStaff, [Emp_Email, Emp_Password], (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Erreur de serveur');
      }

      if (result.rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Identifiants invalides' });
      }

      res.json({ success: true, message: 'Connexion réussie' });
    });
  } else if (Username && Email && Password) {
    // Registration/Signup Logic
    if (Username === "" || Email === "" || Password === "") {
      return res.status(400).json({ success: false, message: "Remplissez correctement les champs" });
    }
    pool.query(AllBasic.getCheckEmail ,[Email] , (err , result ) =>{
      if (err){
        console.error(err.message) ;
        return res.status(500).send('Erreur de serveur') ;
      }

      if(result.rows.length > 0){
        return res.status(409).json({ success: false , message: 'Email déjà utilisé' });
      } else {
        const insertQuery = `
          INSERT INTO signup (Username, Email, Password)
          VALUES ($1, $2, $3)
        `;
  
        pool.query(insertQuery, [Username, Email, Password], (err) => {
          if (err) {
            console.error(err.message);
            return res.status(500).send('Erreur de serveur');
          }
  
          res.json({ success: true, message: 'Inscription réussie' });
        });
      }
    });
  } else {
     const { Email, Password } = req.body;

     pool.query(AllBasic.getAllSignupUser, [Email, Password], (err, result) => {
       if (err) {
         console.error(err.message);
         return res.status(500).send('Erreur de serveur');
       }
 
       if (result.rows.length === 0) {
         return res.status(401).json({ success: false, message: 'Invalid credentials' });
       }
 
     
       res.json({ success: true, message: 'Sign-in successful' });
     });
  }
});

router.post('/guestdetailsubmit', (req, res) => {
  const {
    date_arrived,
    leaving_date,
    number_of_person,
    id_client,
  } = req.body;

  if (date_arrived === '' || leaving_date === '' || id_client === '') {
    res.status(400).json({ message: 'Fill the proper details' });
  } else {

    const sql = `INSERT INTO roombook("Name","Email","Country","Phone","RoomType","Bed","NoofRoom","Meal","cin","cout") 
                 VALUES ('${Name}','${Email}','${Country}','${Phone}','${RoomType}','${Bed}','${NoofRoom}','${Meal}','${cin}','${cout}'`;

    pool.query(sql, (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        res.status(200).json({ message: 'Reservation successful' });
      }
    });
  }
});

// show all booking 
router.get("/roombook", (req, res) => {
 
  pool.query(AllBasic.getAllReservation, (err, data) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Erreur de serveur');
      }
      res.send(data.rows);
  });
});

// Supprimer une réservation par son ID
// Route pour supprimer une réservation
router.delete("/roombook/:id", (req, res) => {
  const reservationId = req.params.id;
  
  // Commencer une transaction
  pool.query("BEGIN", (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de serveur");
    }

    // Étape 1 : Supprimer les enregistrements liés dans la table "room"
    const deleteRoomQuery = "DELETE FROM room WHERE id_reservation = $1";
    pool.query(deleteRoomQuery, [reservationId], (err, result) => {
      if (err) {
        console.error(err.message);
        // Annuler la transaction en cas d'erreur
        pool.query("ROLLBACK", () => {
          res.status(500).send("Erreur de serveur lors de la suppression de la réservation");
        });
      } else {
        // Étape 2 : Supprimer les enregistrements liés dans la table "cancel"
        const deleteCancelQuery = "DELETE FROM cancel WHERE id_reservation = $1";
        pool.query(deleteCancelQuery, [reservationId], (err, result) => {
          if (err) {
            console.error(err.message);
            // Annuler la transaction en cas d'erreur
            pool.query("ROLLBACK", () => {
              res.status(500).send("Erreur de serveur lors de la suppression de la réservation");
            });
          } else {
            // Étape 3 : Supprimer la réservation dans la table "reservation"
            const deleteReservationQuery = "DELETE FROM reservation WHERE id_reservation = $1";
            pool.query(deleteReservationQuery, [reservationId], (err, result) => {
              if (err) {
                console.error(err.message);
                // Annuler la transaction en cas d'erreur
                pool.query("ROLLBACK", () => {
                  res.status(500).send("Erreur de serveur lors de la suppression de la réservation");
                });
              } else {
                // Valider la transaction si tout s'est bien déroulé
                pool.query("COMMIT", () => {
                  res.send("Réservation supprimée avec succès");
                });
              }
            });
          }
        });
      }
    });
  });
});


// Add staff

router.post("/staff", (req,res) =>{
  const {
    Name,LastName,Email,Phone,Country,Password,CPassword
  } = req.body;

  if (Name === '' || Email === '' || (Password === CPassword)) {
    res.status(400).json({ message: 'Fill the proper details' });
  }else{
    const sql = `INSERT INTO receptionist("first_name","last_name","password","email","work_contact","id_province") 
    VALUES ('${Name}','${LastName}','${Password}','${Email}',${Phone}, ${Country})`;

    pool.query(sql, (error, result) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Something went wrong' });
      } else {
        res.status(200).json({ message: 'Inserted successfully' });
      }
    });
  }
})

// show all staff 
router.get("/staff", (req, res) => {
  pool.query(AllBasic.getAllRecptionist, (err, data) => {
      if (err) {
          console.error(err.message);
          return res.status(500).send('Erreur de serveur');
      }
      res.send(data.rows);
  });
});

router.get("/payment", (req, res) => {
  pool.query(AllBasic.getAllpaymentByClient, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Erreur de serveur');
    }
    res.send(data.rows);
  });
});

router.get("/canceled", (req, res) => {
  pool.query(AllBasic.getCountClientCancelled, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Erreur de serveur');
    }
    res.send(data.rows);
  });
});

router.get("/Sum", (req, res) => {
  pool.query(AllBasic.getPaymentByMobileMoney, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(500).send('Erreur de serveur');
    }
    res.send(data.rows);
  });
});

router.get("/statusreserved",(req,res)=>{
  pool.query(AllBasic.getstatuscountreserved,(err,data) =>{
    if (err) {
      console.log(err.message);
      return res.status(500).send('Erreur de serveur');
    }
    res.send(data.rows)
  })
})