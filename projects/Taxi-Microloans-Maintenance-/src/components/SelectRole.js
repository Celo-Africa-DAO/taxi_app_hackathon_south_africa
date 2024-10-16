import React from 'react';
import { Link } from 'react-router-dom';

const SelectRole = () => {
    return (
        <div className="select-role-container">
            <h1>Select Your Role</h1>
            <div className="role-options">
                <Link to="/loan-form">
                    <button className="role-button">Loan Applicant</button>
                </Link>
                <Link to="/lender-dashboard">
                    <button className="role-button">Lender Dashboard</button>
                </Link>
            </div>
        </div>
    );
};

export default SelectRole;