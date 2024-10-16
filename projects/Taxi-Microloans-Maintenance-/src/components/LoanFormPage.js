import React from 'react';
import LoanForm from './LoanForm';

const LoanFormPage = ({ addLoan, account }) => {
    return (
        <div>
            <LoanForm addLoan={addLoan} account={account} />
        </div>
    );
};

export default LoanFormPage;