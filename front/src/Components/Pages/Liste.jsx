import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import '../style/StyleTab.css';
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Ajout from './Ajout';
import { useNavigate } from "react-router-dom";

const Liste = () => {
    const [user, setUser] = useState([]);
    const [maxLoyer, setMaxLoyer] = useState("");
    const [minLoyer, setMinLoyer] = useState("");
    const [totalLoyer, setTotalLoyer] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/");
                setUser(response.data);
                const responseMaxLoyer = await axios.get("http://localhost:5000/max-loyer");
                const responseMinLoyer = await axios.get("http://localhost:5000/min-loyer");
                const responseTotalLoyer = await axios.get("http://localhost:5000/total-loyer");
                setUser(response.data);
                setMaxLoyer(responseMaxLoyer.data);
                setMinLoyer(responseMinLoyer.data);
                setTotalLoyer(responseTotalLoyer.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const editUser = (id) => {
        navigate(`/edit/${id}`);
    };
    

    const handleDelete = (id) => {
        Swal.fire({
            title: "Confirmation",
            text: "Êtes-vous sûr de vouloir supprimer cet appartement ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, supprimer !",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:5000/delete/${id}`)
                    .then(() => {
                        setUser(user.filter(data => data.id !== id));
                        Swal.fire("Supprimé !", "L'Appartement a été supprimé.", "success");
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire(
                            "Erreur",
                            "Une erreur s'est produite lors de la suppression.",
                            "error"
                        );
                    });
            }
        });
    };

    const determineObservationLevel = (loyer) => {
        if (loyer < 1000) {
            return "Bas";
        } else if (loyer >= 1000 && loyer <= 5000) {
            return "Moyen";
        } else {
            return "Élevé";
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <main className="table">
                    <section className="table_header">
                        <div>
                            <a onClick={() => { navigate("/ajout"); }}>Ajouter</a>
                        </div>
                    </section>
                    <section className="table_body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">N° Appartement</th>
                                    <th scope="col">Design</th>
                                    <th scope="col">Loyer</th>
                                    <th scope="col">OBS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.map((data) => (
                                    <tr key={data.id}>
                                        <td>{data.id}</td>
                                        <td>{data.numApp}</td>
                                        <td>{data.design}</td>
                                        <td>{data.loyer}</td>
                                        <td>{determineObservationLevel(data.loyer)}</td>
                                        <td></td>
                                        <td>
                                            <FontAwesomeIcon
                                                icon={faEdit}
                                                style={{
                                                    fontSize: "20px",
                                                    color: "green",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    editUser(
                                                        data.id,
                                                        data.numApp,
                                                        data.design,
                                                        data.loyer
                                                    )
                                                } />
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                style={{
                                                    fontSize: "20px",
                                                    color: "darkred",
                                                    cursor: "pointer",
                                                    marginLeft: "2rem",
                                                }}
                                                onClick={(e) => handleDelete(data.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
                <label>Loyer maximal : {maxLoyer}</label>
                <label>Loyer minimal : {minLoyer}</label>
                <label>Total des loyers : {totalLoyer}</label>
            </div>
        </div>
    );
};

export default Liste;
