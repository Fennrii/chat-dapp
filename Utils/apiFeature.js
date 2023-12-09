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
        // const web3modal = new Web3Modal();
        // console.log('web3modal');
        // console.log(web3modal);
        // const connection = await web3modal.connect();
        // console.log('connection');
        // console.log(connection);
        // const provider = new ethers.providers.Web3Provider(connection);
        // console.log('provider');
        // console.log(provider);
        // const network = await provider.getNetwork();
        // console.log('network');
        // console.log(network);
        // const signer = await provider.getSigner();
        // console.log('signer');
        // console.log(signer);
        // const contract = fetchContract(signer);
        const web3 = new Web3(window.ethereum);
        console.log('web3');
        console.log(web3);
        const contract = new web3.eth.Contract(chatABI,chatAddress);
        contract.setProvider(window.ethereum);
        // const signer = contract

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

