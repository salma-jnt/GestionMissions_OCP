import { Link } from 'react-router-dom';
import { HiMap, HiUserGroup, HiClipboardList, HiShieldCheck, HiClock, HiUsers } from 'react-icons/hi';

export default function LandingPage() {
    return (
        <div className="bg-white text-gray-800">
            {/* Hero section */}
            <section className="text-center px-6 py-20 bg-green-50 border-b border-green-100">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                    Système de Gestion <br />
                    <span className="text-green-700">des Missions OCP</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Solution complète pour la gestion des missions, le suivi des véhicules et la surveillance GPS des collaborateurs OCP Safi.
                </p>
                <div className="flex justify-center gap-4 mt-8 flex-wrap">
                    <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold no-underline"
                    style={{ textDecoration: 'none' }}>
                        Commencer Maintenant →
                    </Link>
                    <a href="#features" className="flex items-center gap-2 border border-gray-300 hover:border-green-600 hover:text-green-600 px-6 py-3 rounded-lg font-semibold">
                        ▶ Voir la Démo
                    </a>
                </div>
            </section>

            {/* Statistiques */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-12 text-center bg-white">
                <StatItem value="500+" label="Missions par mois" />
                <StatItem value="50+" label="Véhicules suivis" />
                <StatItem value="100+" label="Collaborateurs" />
                <StatItem value="99.9%" label="Disponibilité" />
            </section>

            {/* Fonctionnalités principales */}
            <section id="features" className="bg-gray-50 px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-2">Fonctionnalités Principales</h2>
                <p className="text-gray-600 mb-12">Une solution complète pour optimiser la gestion de vos missions et véhicules</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard icon={<HiMap />} title="Gestion des Missions" desc="Créez, assignez et suivez toutes les missions" />
                    <FeatureCard icon={<HiClipboardList />} title="Suivi des Véhicules" desc="Surveillez la flotte de véhicules avec GPS" />
                    <FeatureCard icon={<HiUserGroup />} title="Rapports Détaillés" desc="Générez des rapports complets sur les missions" />
                </div>
            </section>

            {/* Fonctionnalités secondaires */}
            <section className="bg-white px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FeatureCard icon={<HiShieldCheck />} title="Justificatifs d'Absence" desc="Les missions servent automatiquement de justificatifs pour le pointage" />
                    <FeatureCard icon={<HiClock />} title="Suivi Temps Réel" desc="Visualisez les missions actives sur une carte interactive en direct" />
                    <FeatureCard icon={<HiUsers />} title="Gestion d'Équipe" desc="Gérez efficacement vos collaborateurs et leurs affectations" />
                </div>
            </section>

            {/* Pourquoi choisir ? */}
            <section className="bg-gray-50 px-6 py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir Notre Solution ?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    Développée spécifiquement pour répondre aux besoins de l'OCP Safi, notre solution offre une gestion complète et sécurisée de vos missions.
                </p>
                <ul className="text-left max-w-3xl mx-auto text-green-700 font-medium space-y-2">
                    <li>✔ Suivi GPS en temps réel pour éviter l’usage personnel</li>
                    <li>✔ Génération automatique des justificatifs d’absence</li>
                    <li>✔ Vue complète sur les collaborateurs et véhicules OCP</li>
                </ul>
            </section>

            {/* Call to action final */}
            <section className="bg-green-600 text-white text-center px-6 py-20">
                <h2 className="text-3xl font-bold mb-2">Prêt à Optimiser Vos Missions ?</h2>
                <p className="mb-6">Rejoignez les équipes OCP qui font déjà confiance à notre solution</p>
                <Link to="/login" className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
                    style={{ textDecoration: 'none' }}
                >
                    Accéder au Système →
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white px-6 py-12 grid md:grid-cols-3 gap-6">
                <div>
                    <h3 className="font-bold text-lg mb-2">OCP Safi</h3>
                    <p className="text-sm text-gray-300">Solution de gestion des missions pour l'Office Chérifien des Phosphates - Site de Safi</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2">Contact</h3>
                    <p className="text-sm text-gray-300">OCP Safi, Maroc<br />+212 524 XXX XXX<br />contact@ocp-safi.ma</p>
                </div>
                <div>
                    <h3 className="font-bold text-lg mb-2">Support</h3>
                    <p className="text-sm text-gray-300">Documentation<br />Support Technique<br />Formation</p>
                </div>
            </footer>
        </div>
    );
}

function StatItem({ value, label }) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-green-600">{value}</h3>
            <p className="text-sm text-gray-600">{label}</p>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 text-left hover:shadow-md transition">
            <div className="text-green-600 text-3xl mb-4">{icon}</div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{desc}</p>
        </div>
    );
}
