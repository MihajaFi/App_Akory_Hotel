import express from "express";
import { router } from "./router.js";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session"; // Correction de la faute de frappe ici

const app = express();

// Configure le moteur de rendu EJS
app.use(cors());
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'dfsdfkmqsdlkfjeismdknqsdfkjze',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, 
    sameSite: 'none',
  }
}));



app.listen(5000, () => {
  console.log("Serveur démarré (http://localhost:5000/) !");
});
