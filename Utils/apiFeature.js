// Place for general functions
import Web3Modal from "web3modal";
import { ethers }  from "ethers";
import { chatAddress, chatABI } from "../app/Context/constants";
// const ethers = require('ethers');

// const web3 = new Web3(window.ethereum);
// const chat = new web3.eth.Contract(chatABI, chatAddress);
// chat.setProvider(window.ethereum);

export const CheckIfWalletIsConnected = async () => {
    try {
        if(!window.ethereum) return console.log('Install Metamask');
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const firstAccount = accounts[0];
        return firstAccount;
    }
    catch(err){
        console.log(err);
    }
};

export const connectWallet = async () => {
    try {
        if(!window.ethereum) return console.log('Install Metamask');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const firstAccount = accounts[0];
        return firstAccount;
    }
    catch(err){
        console.log(err);
    }
};

const fetchContract = (signerOrProvider) => 
    new ethers.Contract(chatAddress, chatABI, signerOrProvider);

export const conenctingWithContract = async() => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    }
    catch(err){
        console.log(err);
    }
};

export const convertTime = (time) => {
    const newTime = new Date(time);

    const realTime = newTime.getHours() + ':' 
    + newTime.getMinutes() + ':' + newTime.getSeconds() 
    + ' ' + newTime.getDate() + '/' + (newTime.getMonth() +1 )
    + '/' + newTime.getFullYear();
    return realTime;
};

