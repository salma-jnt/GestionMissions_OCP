import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import CollaborateursPage from './pages/CollaborateursPage';
import MissionsPage from './pages/MissionsPage';
import CartePage from './pages/CartePage';


function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
                <Link className="navbar-brand" to="/">OCP Missions</Link>
                <div className="navbar-nav">
                    <Link className="nav-link" to="/collaborateurs">Collaborateurs</Link>
                    <Link className="nav-link" to="/missions">Missions</Link>
                    <Link className="nav-link" to="/carte">Carte</Link>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<CollaborateursPage />} />
                    <Route path="/collaborateurs" element={<CollaborateursPage />} />
                    <Route path="/missions" element={<MissionsPage />} />
                    <Route path="/carte" element={<CartePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
