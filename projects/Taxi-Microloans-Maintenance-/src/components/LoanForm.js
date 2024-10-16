import React, { useState } from 'react';

const LoanForm = ({ addLoan, account }) => {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [taxiDetails, setTaxiDetails] = useState('');
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [repaymentPlan, setRepaymentPlan] = useState('');
    const [interestRate, setInterestRate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (account) {
            await addLoan({
                name,
                contact,
                taxiDetails,
                amount: parseFloat(amount),
                purpose,
                repaymentPlan,
                interestRate: parseFloat(interestRate), // Ensure this is a number
            });

            // Reset form fields
            resetForm();
        } else {
            alert("Please connect to MetaMask first.");
        }
    };

    const resetForm = () => {
        setName('');
        setContact('');
        setTaxiDetails('');
        setAmount('');
        setPurpose('');
        setRepaymentPlan('');
        setInterestRate('');
    };

    return (
        <div className='applicant'>
            <h1 className='appliacent-title'>Loan Application Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Contact" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Taxi Details" 
                    value={taxiDetails} 
                    onChange={(e) => setTaxiDetails(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Loan Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Purpose" 
                    value={purpose} 
                    onChange={(e) => setPurpose(e.target.value)} 
                    required 
                />
                
                <select value={repaymentPlan} onChange={(e) => setRepaymentPlan(e.target.value)} required>
                    <option value="">Select Repayment Plan</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>

                <select value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required>
                    <option value="">Select Interest Rate</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                </select>

                <button type="submit">Request Loan</button>
            </form>
        </div>
    );
};

export default LoanForm;