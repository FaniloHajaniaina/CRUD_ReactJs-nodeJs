import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Acceuil from './Components/Pages/Acceuil';
import Liste from './Components/Pages/Liste';
import Diagramme from './Components/Pages/Diagramme';
import Ajout from './Components/Pages/Ajout';
import Edit from './Components/Pages/Edit';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} />
          <Route path="/liste" element={<Liste />} />
          <Route path="/diagramme" element={<Diagramme />} />
          <Route path="/ajout" element={<Ajout />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
