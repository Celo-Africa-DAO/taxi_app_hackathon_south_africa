import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Web3 from 'web3';
import LoanApplicationABI from './LoanApplicationABI.json';
import MetaMaskConnect from './components/MetaMaskConnect';
import LoanFormPage from './components/LoanFormPage'; // Ensure this path is correct
import LenderDashboardPage from './components/LenderDashboardPage'; // Ensure this path is correct
import SelectRole from './components/SelectRole'; // Import the SelectRole component
import './App.css'; // Import CSS for styling

const App = () => {
    const [account, setAccount] = useState(null);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initialize Web3 instance
    const web3 = useMemo(() => new Web3(window.ethereum), []);
    const contractAddress = "0x5CB488bCad2979CbCeF687f3A4a619A17603Ff18"; // Replace with your actual contract address
    const contract = useMemo(() => new web3.eth.Contract(LoanApplicationABI, contractAddress), [web3]);

    // Load loans from the blockchain
    const loadLoans = useCallback(async () => {
        if (!account) return;

        setLoading(true);
        try {
            const totalLoans = await contract.methods.loanCount().call();
            let loanData = [];

            for (let i = 1; i <= totalLoans; i++) {
                const loan = await contract.methods.getLoan(i).call();
                loanData.push(loan);
            }

            setLoans(loanData);
        } catch (error) {
            console.error("Error loading loans:", error);
        } finally {
            setLoading(false);
        }
    }, [account, contract]);

    useEffect(() => {
        loadLoans();
    }, [loadLoans]);

    // Connect to MetaMask wallet
    const connectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAccount(accounts[0]);
        } catch (error) {
            console.error("Error connecting wallet:", error);
        }
    };

    // Add a new loan to the blockchain
    const addLoan = async (newLoan) => {
        try {
            await contract.methods.requestLoan(
                newLoan.name,
                newLoan.contact,
                newLoan.taxiDetails,
                newLoan.amount,
                newLoan.purpose,
                newLoan.repaymentPlan,
                newLoan.interestRate
            ).send({ from: account });

            loadLoans(); // Reload loans after adding a new one
        } catch (error) {
            console.error("Error adding loan:", error);
        }
    };

    // Update loan status on the blockchain
    const updateLoanStatus = async (loanId, newStatus) => {
        try {
            await contract.methods.updateLoanStatus(loanId, newStatus).send({ from: account });
            loadLoans(); // Reload loans after updating status
        } catch (error) {
            console.error("Error updating loan status:", error);
        }
    };

    // Add a message to a specific loan
    const addMessage = async (loanId, message) => {
        try {
            await contract.methods.addMessage(loanId, message).send({ from: account });
            loadLoans(); // Reload loans after adding a message
        } catch (error) {
            console.error("Error adding message:", error);
        }
    };

    return (
        <Router>
            <div>
                {!account ? (
                    <div className="app-container">
                        <h1>Welcome to Micro-loans for Taxi Maintenance</h1>
                        <MetaMaskConnect connect={connectWallet} />
                    </div>
                ) : (
                    <Routes>
                        <Route path="/" element={<SelectRole />} /> {/* Add the SelectRole route */}
                        <Route path="/loan-form" element={<LoanFormPage addLoan={addLoan} account={account} />} />
                        <Route path="/lender-dashboard" element={
                            loading ? (
                                <p>Loading loans...</p>
                            ) : (
                                <LenderDashboardPage 
                                    loans={loans} 
                                    updateLoanStatus={updateLoanStatus} 
                                    addMessage={addMessage} 
                                />
                            )
                        } />
                    </Routes>
                )}
            </div>
        </Router>
    );
};

export default App;