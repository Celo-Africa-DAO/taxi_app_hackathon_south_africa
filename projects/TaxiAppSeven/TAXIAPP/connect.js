// Connect to Metamask or Celo Wallet 
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable(); // Request access to the user's wallet
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log('No Ethereum wallet detected');
    }
});

// Get Wallet Address and Display it
document.getElementById('connectWallet').addEventListener('click', async () => {
    const accounts = await web3.eth.getAccounts();
    document.getElementById('walletAddress').innerText = `Wallet Address: ${accounts[0]}`;
});

// Smart Contract Address and ABI
const contractAddress = '0xA280f85081b1D6e07250dB0F3cAb491b8dA7839B';
const contractABI = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "applicant",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "loanAmount",
                    "type": "uint256"
                }
            ],
            "name": "LoanApplied",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "applications",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "applicant",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "loanAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isProcessed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "loanAmount",
                    "type": "uint256"
                }
            ],
            "name": "applyForLoan",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllApplications",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "applicant",
                            "type": "address"
                        },
                        {
                            "internalType": "string",
                            "name": "phoneNumber",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "loanAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bool",
                            "name": "isProcessed",
                            "type": "bool"
                        }
                    ],
                    "internalType": "struct TaxiMicroloan.LoanApplication[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "index",
                    "type": "uint256"
                }
            ],
            "name": "processLoan",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]];

// Payment Form Submission
document.getElementById('paymentForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const amount = document.getElementById('amount').value;

    const accounts = await web3.eth.getAccounts();
    const taxiAppContract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        await taxiAppContract.methods.payTaxi().send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether')
        });
        document.getElementById('paymentStatus').innerText = 'Payment successful!';
    } catch (error) {
        document.getElementById('paymentStatus').innerText = 'Payment failed!';
        console.error(error);
    }
});
