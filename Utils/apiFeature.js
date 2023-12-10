// Place for general functions
import Web3Modal from "web3modal";
import { ethers }  from "ethers";
import { chatAddress, chatABI } from "../app/Context/constants";
import { Web3 } from "web3";
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
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(chatABI,chatAddress);
        contract.setProvider(window.ethereum);
        web3.currentProvider.setMaxListeners(200);
        // const signer = contract

        return contract;
    }
    catch(err){
        console.log(err);
    }
};

export const convertTime = (time) => {
    let timestamp = typeof time === 'bigint' ? Number(time) : time;

    const newTime = new Date(timestamp);

    const realTime = newTime.getHours() + ':' 
    + newTime.getMinutes() + ':' + newTime.getSeconds() 
    + ' ' + newTime.getDate() + '/' + (newTime.getMonth() +1 )
    + '/' + newTime.getFullYear();
    return realTime;
};

