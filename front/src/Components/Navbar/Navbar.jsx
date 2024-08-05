import './Navbar.css';
import { useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        window.close();
    };

    return (
        <div>
            <div className='nav'>
                <div className='nav-logo'><em>G-</em>Apparte</div>
                <ul className='nav-menu'>
                    <li onClick={() => {navigate("/");}}>Acceuil</li>
                    <li onClick={() => {navigate("/Liste");}}>Liste</li>
                    <li onClick={() => {navigate("/Diagramme");}}>Diagramme</li>
                    <li className='nav-logout' onClick={handleLogout}>Se Déconnecter</li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;