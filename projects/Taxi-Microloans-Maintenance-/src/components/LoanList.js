import React from 'react';

const LoanList = ({ loans }) => {
    return (
        <div className="loan-list">
            <h3>Loan Details</h3>
            <ul>
                {loans.map((loan, index) => (
                    <li key={index} className="loan-item">
                        <p><strong>Name:</strong> {loan.name}</p>
                        <p><strong>Amount:</strong> ${loan.amount}</p>
                        <p><strong>Status:</strong> {loan.status}</p>
                        <p><strong>Repaid:</strong> {loan.repaid ? "Yes" : "No"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanList;