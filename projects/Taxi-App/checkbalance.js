<<<<<<< HEAD
// Import Web3
const Web3 = require('web3');

// Create a new instance of Web3 with a provider
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

// Example usage
web3.eth.getBlockNumber().then(console.log);



let myWallet = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352"; // Replace with your wallet address

let ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    }
];

async function getBalance() {
    let contractAddress = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352"; // Replace with actual contract address

    try {
        let contract = new web3.eth.Contract(ABI, contractAddress);
        let myBalance = await contract.methods.balanceOf(myWallet).call();
        let readableBalance = web3.utils.fromWei(myBalance, 'ether');
        console.log('My balance is:', readableBalance);
    } catch (error) {
        console.error('Error retrieving balance:', error);
    }
}

getBalance();
=======
// Import Web3
const Web3 = require('web3');

// Create a new instance of Web3 with a provider
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

// Example usage
web3.eth.getBlockNumber().then(console.log);



let myWallet = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352"; // Replace with your wallet address

let ABI = [
    {
        "constant": true,
        "inputs": [{"name": "_owner", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"name": "balance", "type": "uint256"}],
        "type": "function"
    }
];

async function getBalance() {
    let contractAddress = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352"; // Replace with actual contract address

    try {
        let contract = new web3.eth.Contract(ABI, contractAddress);
        let myBalance = await contract.methods.balanceOf(myWallet).call();
        let readableBalance = web3.utils.fromWei(myBalance, 'ether');
        console.log('My balance is:', readableBalance);
    } catch (error) {
        console.error('Error retrieving balance:', error);
    }
}

getBalance();
>>>>>>> 5c1529be39bb8c0dfac2f3824d6e2143bf62502f
