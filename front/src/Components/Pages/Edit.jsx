import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import '../style/StyleForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Edit = () => {   
    const [numApp, setNumApp] = useState('');
    const [design, setDesign] = useState('');
    const [loyer, setLoyer] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Récupérer les anciennes valeurs de l'appartement à partir de la base de données
        axios.get(`http://localhost:5000/edit/${id}`)
          .then(res => {
            if (res.data.Status === "success") {
              const apparte = res.data.apparte; 
              setNumApp(apparte.numApp);
              setDesign(apparte.design);
              setLoyer(apparte.loyer);
            } else {
              alert("Erreur lors de la récupération des données de l'appartement");
            }
          })
          .catch(err => console.log(err));
      }, [id]);
    

    const editUser = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/modifier/${id}`, {
                numApp,
                design,
                loyer,
            });
            console.log(response);
            navigate("/liste");
            Swal.fire(
                "Modifier!",
                "Votre Information a été bien Modifier",
                "success"
            );
        } catch (err) {
            console.error(err);
            Swal.fire("Erreur!", "Votre Information est incomplète", "error");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <form action="">
                    <h1>Modifier Appartement</h1>
                    <div className="input-box">
                        <input type="text" value={numApp} onChange={e => setNumApp(e.target.value)} placeholder="N° Appartement" />
                    </div>
                    <div className="input-box">
                        <input type="text" value={design} onChange={e => setDesign(e.target.value)} placeholder="Design" />
                    </div>
                    <div className="input-box">
                        <input type="text" value={loyer} onChange={e => setLoyer(e.target.value)} placeholder="Loyer" />
                    </div>
                    <button type="button" onClick={editUser} className="btn" id="submitBtn">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
