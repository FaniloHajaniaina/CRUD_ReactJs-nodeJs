import React from 'react';
import Navbar from '../Navbar/Navbar';
import '../style/StyleForm.css';
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate} from "react-router-dom";

const Ajout = () => {
    const[numApp, setNumApp] = useState("");
    const[design, setDesign] = useState("");
    const[loyer, setLoyer] = useState("");
    const navigate = useNavigate();
    
    const handleNumAppChange = (event) => {
        setNumApp(event.target.value);
      };
      const handleDesignChange = (event) => {
        setDesign(event.target.value);
      };
      const handleLoyerChange = (event) => {
        setLoyer(event.target.value);
      };

      const createUser = (event) => {
        event.preventDefault();
    
        if (!numApp || !design || !loyer) {
          
        } else {
          axios
            .post("http://localhost:5000/ajout", { numApp, design, loyer })
            .then((res) => {
              console.log(res);
              navigate("/liste");
              Swal.fire(
                "Enregistrer!",
                "Votre Information a été bien Enregistrée",
                "success"
              );
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("Erreur!", "Votre Information est incomplète", "error");
            });
        }
      };

    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <form action="">
                    <h1>Nouveau Appartement</h1>
                    <div className="input-box">
                        <input Type="text" value={numApp} onChange={handleNumAppChange} placeholder="N° Appartement" />
                    </div>
                    <div className="input-box">
                        <input Type="text" value={design} onChange={handleDesignChange} placeholder="Design"  />
                    </div>
                    <div className="input-box">
                        <input Type="text" value={loyer} onChange={handleLoyerChange} placeholder="Loyer" />
                    </div>
                        <button type="submit" onClick={createUser} class="btn" id="submitBtn">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Ajout;