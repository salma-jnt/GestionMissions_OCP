import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import CollaborateursPage from './pages/CollaborateursPage';
import MissionsPage from './pages/MissionsPage';
import CartePage from './pages/CartePage';
import { ToastContainer } from 'react-toastify';
import AffectationsPage from './pages/AffectationsPage';
import AffecterMissionPage from './pages/AffecterMissionPage';
import VehiculesPage from './pages/VehiculesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<CollaborateursPage />} />
                    <Route path="/collaborateurs" element={<CollaborateursPage />} />
                    <Route path="/missions" element={<MissionsPage />} />
                    <Route path="/carte" element={<CartePage />} />
                    <Route path="/affectations" element={<AffectationsPage />} />
                    <Route path="/missions/:id/affecter" element={<AffecterMissionPage />} />
                    <Route path="/vehicules" element={<VehiculesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Router>
    );
}

export default App;
