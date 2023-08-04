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

// delete staff

router.delete("/staff/:id", (req, res) => {
  const employeeId = req.params.id;
  
  // Commencer une transaction
  pool.query("BEGIN", (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Erreur de serveur");
    }

    // Étape 1 : Supprimer les enregistrements liés dans la table "client"
    const deleteClientQuery = "DELETE FROM client WHERE id_employee = $1";
    pool.query(deleteClientQuery, [employeeId], (err, result) => {
      if (err) {
        console.error(err.message);
        // Annuler la transaction en cas d'erreur
        pool.query("ROLLBACK", () => {
          res.status(500).send("Erreur de serveur lors de la suppression de l'employée");
        });
      } else {
        // Étape 2 : Supprimer les enregistrements liés dans la table "payment"
        const deleteCancelQuery = "DELETE FROM payment WHERE id_employee = $1";
        pool.query(deleteCancelQuery, [employeeId], (err, result) => {
          if (err) {
            console.error(err.message);
            // Annuler la transaction en cas d'erreur
            pool.query("ROLLBACK", () => {
              res.status(500).send("Erreur de serveur lors de la suppression de l'employée");
            });
          } else {
            // Étape 3 : Supprimer l'employée dans la table "receptionist"
            const deleteReservationQuery = "DELETE FROM receptionist WHERE id_employee = $1";
            pool.query(deleteReservationQuery, [employeeId], (err, result) => {
              if (err) {
                console.error(err.message);
                // Annuler la transaction en cas d'erreur
                pool.query("ROLLBACK", () => {
                  res.status(500).send("Erreur de serveur lors de la suppression de l'employée");
                });
              } else {
                // Valider la transaction si tout s'est bien déroulé
                pool.query("COMMIT", () => {
                  res.send("Employée supprimée avec succès");
                });
              }
            });
          }
        });
      }
    });
  });
});

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
  pool.query(AllBasic.getClientNotPaid, (err, data) => {
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


// dropdown
router.get("/addroombook", (req, res) => {
  const sql = `SELECT id_client, first_name, last_name FROM client;`;
  pool.query(sql, (err, result) => {
      if (err) {
          console.error("Error executing query:", err);
          res.status(500).json({ error: "Error fetching data from the database" });
      } else {
          res.json(result.rows);
      }
  });
});

// insert roombook

router.post("/roombook", (req,res) =>{
  const {
    DArrived,DLeaved,number_of_person,id_client
  } = req.body;

  if (number_of_person === '') {
    res.status(400).json({ message: 'Fill the proper details' });
  }else{
    const sql = `INSERT INTO reservation ("date_arrived", "leaving_date", "number_of_person", "id_client")
    VALUES ('${DArrived}','${DLeaved}',${number_of_person},${id_client});`;

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