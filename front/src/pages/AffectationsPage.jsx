import React from 'react';
import AffectationList from '../components/AffectationList';

function AffectationsPage() {
    return (
        <div className="container">
            <h2 className="mt-4">Affectations des missions</h2>
            <AffectationList />
        </div>
    );
}

export default AffectationsPage;
