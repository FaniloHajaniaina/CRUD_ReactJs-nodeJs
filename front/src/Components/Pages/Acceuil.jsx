import React from 'react';
import '../style/StyleHome.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate} from "react-router-dom";

const Acceuil = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="content">
                    <h1>BIENVENUE!</h1>
                    <h3>GESTION D'APPARTEMENT</h3>
                    <button className="get-started-btn" onClick={() => {navigate("/Liste");}}>Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Acceuil;
