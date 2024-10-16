<<<<<<< HEAD
const { Web3 } = require('web3');
const rpcURL = "https://alfajores-forno.celo-testnet.org"; 
const web3 = new Web3(rpcURL);
let pvtKey = ""; //enter your private key
let accountFrom = ""; //enter your address
let addressTo = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352";// enter address of wallet to send  t

async function send() {
    const gasPrice = await web3.eth.getGasPrice();
    
    const nonce = await web3.eth.getTransactionCount(accountFrom);

    const tx = {
        gas: 21000,
        to: addressTo,
        value: web3.utils.toWei('1', 'ether'),
        gasPrice: gasPrice,
        nonce: nonce,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, pvtKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    console.log('Transaction receipt:', receipt);
}

=======
const { Web3 } = require('web3');
const rpcURL = "https://alfajores-forno.celo-testnet.org"; 
const web3 = new Web3(rpcURL);
let pvtKey = ""; //enter your private key
let accountFrom = ""; //enter your address
let addressTo = "0x28F5E9b542d71e81Db5eCBDC3823D313524eA352";// enter address of wallet to send  t

async function send() {
    const gasPrice = await web3.eth.getGasPrice();
    
    const nonce = await web3.eth.getTransactionCount(accountFrom);

    const tx = {
        gas: 21000,
        to: addressTo,
        value: web3.utils.toWei('1', 'ether'),
        gasPrice: gasPrice,
        nonce: nonce,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, pvtKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
    console.log('Transaction receipt:', receipt);
}

>>>>>>> 5c1529be39bb8c0dfac2f3824d6e2143bf62502f
send();