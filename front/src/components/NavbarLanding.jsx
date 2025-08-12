import { Link } from 'react-router-dom';
import ocpLogo from '../assets/ocp-logo.png'; // place ton logo ici

export default function NavbarLanding() {
    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo et Titre */}
                <div className="flex items-center gap-3">
                    <img src={ocpLogo} alt="OCP Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold text-green-800">Gestion Missions</span>
                </div>

                {/* Liens de navigation */}
                <div className="space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">
                        Dashboard
                    </Link>
                    <Link to="/login" className="text-gray-700 hover:text-green-600 font-medium">
                        Connexion
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        Inscription
                    </Link>
                </div>
            </div>
        </nav>
    );
}
