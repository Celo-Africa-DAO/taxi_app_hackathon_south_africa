import React, { useState } from 'react';

const LenderDashboard = ({ loans, updateLoanStatus, addMessage }) => {
    const [currentMessage, setCurrentMessage] = useState('');

    const handleStatusChange = async (loanId, newStatus) => {
        // Call the smart contract function to update loan status
        await updateLoanStatus(loanId, newStatus);
    };

    const handleSendMessage = async (loanId) => {
        if (currentMessage.trim()) {
            // Call the smart contract function to add a message
            await addMessage(loanId, currentMessage);
            setCurrentMessage(''); // Reset message input after sending
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Lender Dashboard</h2>

            <div className="loan-list">
                {loans.map(loan => (
                    <div key={loan.id} className="loan-item">
                        <h4>Applicant: {loan.name}</h4>
                        <p>Amount: ${loan.amount}</p>
                        <p>Status: {loan.status}</p>

                        {/* Messages Section */}
                        <div>
                            <h5>Messages:</h5>
                            <ul>
                                {(loan.messages || []).map((msg, index) => (
                                    <li key={index}><strong>{msg.sender}:</strong> {msg.text}</li>
                                ))}
                            </ul>

                            {/* Message Input */}
                            <input
                                type="text"
                                placeholder="Send a message..."
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                            />
                            <button onClick={() => handleSendMessage(loan.id)}>Send</button>
                        </div>

                        {/* Status Actions */}
                        {loan.status === "pending" && (
                            <div className="status-actions">
                                <button onClick={() => handleStatusChange(loan.id, "approved")}>Approve</button>
                                <button onClick={() => handleStatusChange(loan.id, "rejected")}>Reject</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LenderDashboard;