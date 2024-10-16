import React from 'react';
import LenderDashboard from './LenderDashboard';

const LenderDashboardPage = ({ loans, updateLoanStatus, addMessage }) => {
    return (
        <div>
            <LenderDashboard loans={loans} updateLoanStatus={updateLoanStatus} addMessage={addMessage} />
        </div>
    );
};

export default LenderDashboardPage;