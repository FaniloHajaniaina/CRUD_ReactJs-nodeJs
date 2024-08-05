const express = require('express');
const app = express();
const dontenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql');
app.use(express.json());
app.use(cors());

//Connexion BD
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"",
    database: "gestappartement"
});

//Donnée table appartement
app.get ('/', (req, res)=>{
    const sql = "SELECT * FROM appartement";
    db.query(sql, (err, data) => {
        if(err) return res.json("Erreur donnée appartement");
        return res.json(data);
    })
});

//Ajout nouveau appartement
app.post ('/ajout', (req, res)=>{
    const sql = "INSERT INTO appartement (numApp, design, loyer) VALUES (?,?,?)";
    const values = [
        req.body.numApp,
        req.body.design,
        req.body.loyer,
    ]
    db.query(sql, values, (err, data) => {
        if(err) return res.status(500).json("Erreur ajout");
        return res.status(200).json(data);
    })
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM appartement WHERE id=?";
    
    db.query(sql, [id], (err, data) => {
        if(err) return res.json({ Status: "error", message: "Erreur récupération données appartement" });
        if(data.length === 0) return res.json({ Status: "error", message: "Appartement non trouvé" });
        
        return res.json({ Status: "success", apparte: data[0] });
    })
});



//modification appartement
app.put('/modifier/:id', (req, res) => {
    const sql = "UPDATE appartement SET numApp = ? , design = ? , loyer = ? WHERE id = ?;";
    const values = [
        req.body.numApp,
        req.body.design,
        req.body.loyer,
        req.params.id 
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Erreur modifier");
        return res.json(data);
    });
});

//Supprimer appartement
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM appartement WHERE id=?";
    const id = req.params.id; 

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Erreur suppression");
        return res.json(data);
    });
});

// Récupérer le loyer maximal
app.get('/max-loyer', (req, res) => {
    const sql = "SELECT MAX(loyer) AS maxLoyer FROM appartement";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json("Erreur récupération loyer maximal");
        return res.status(200).json(data[0].maxLoyer);
    });
});

// Récupérer le loyer minimal
app.get('/min-loyer', (req, res) => {
    const sql = "SELECT MIN(loyer) AS minLoyer FROM appartement";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json("Erreur récupération loyer minimal");
        return res.status(200).json(data[0].minLoyer);
    });
});

// Récupérer le total des loyers
app.get('/total-loyer', (req, res) => {
    const sql = "SELECT SUM(loyer) AS totalLoyer FROM appartement";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json("Erreur récupération total des loyers");
        return res.status(200).json(data[0].totalLoyer);
    });
});


//Port utiliser par le backend
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend utilise le port ${PORT}`);
});