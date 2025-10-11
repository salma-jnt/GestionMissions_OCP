import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CollaborateursPage from './pages/CollaborateursPage';
import MissionsPage from './pages/MissionsPage';
import CartePage from './pages/CartePage';
import AffectationsPage from './pages/AffectationsPage';
import AffecterMissionPage from './pages/AffecterMissionPage';
import VehiculesPage from './pages/VehiculesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import NavbarLanding from './components/NavbarLanding';
import DashboardPage from './pages/DashboardPage'; 
import Layout from './components/Layout'; // ✅ le vrai layout connecté
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout pour les routes publiques
function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavbarLanding />
            <main>{children}</main>
        </div>
    );
}

// Composant principal
function App() {
    return (
        <Router>
            <Routes>
                {/* Routes publiques */}
                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <LandingPage />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicLayout>
                            <LoginPage />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicLayout>
                            <RegisterPage />
                        </PublicLayout>
                    }
                />

                {/* Routes privées avec Layout (sidebar + header) */}
                <Route path="/collaborateurs" element={<Layout><CollaborateursPage /></Layout>} />
                <Route path="/missions" element={<Layout><MissionsPage /></Layout>} />
                <Route path="/carte" element={<Layout><CartePage /></Layout>} />
                <Route path="/vehicules" element={<Layout><VehiculesPage /></Layout>} />
                <Route path="/affectations" element={<Layout><AffectationsPage /></Layout>} />
                <Route path="/missions/:id/affecter" element={<Layout><AffecterMissionPage /></Layout>} />
                <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />

                {/* Route de fallback */}
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Router>
    );
}

export default App;
