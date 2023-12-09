import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckIfWalletIsConnected, connectWallet, conenctingWithContract} from '../../Utils/apiFeature';

export const ChatContext = React.createContext();

export const ChatProvider = ({ children }) => {
    // state variables
    const [account, setAccount] = useState('');
    const [userName, setUserName] = useState('');
    const [messages, setMessages] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    // const [chatName, setChatName] = useState('');
    const [chatNames, setChatNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');

    const router = useRouter();

    // fetch data at load
    const fetchData = async () => {
        try {
            const contract = await conenctingWithContract();
            // get account
            console.log('contract');
            console.log(contract);
            const connectAccount = await connectWallet();
            console.log('connectAccount');
            console.log(connectAccount);
            // setAccount(connectAccount);
            // setAccount(connectAccount);
            setAccount(connectAccount);
            // get username
            console.log('account');
            console.log(account);
            const username = await contract.methods.getUsername(account);
            setUserName(username[0]);
            console.log('username');
            console.log(username)
            console.log(userName)
            // get all users
            const allUsers = await contract.methods.getAllAppUsers();
            console.log('allUsers');
            console.log(allUsers);
            setAllUsers(allUsers);
            // console.log('allUsers');
            // console.log(allUsers);
            // get chat names
            const chatNames = await contract.methods.getAllChatNames();
            console.log('chatNames');
            console.log(chatNames);
            setChatNames(chatNames);
        } catch (error) {
            console.log(error);
            setError("Please install and connect your wallet to continue");
        }
        
    };
    useEffect(() => {
        console.log('useEffect')
        fetchData();
    } ,[]);

    // Read message
    const readMessage = async (chatName) => {
        try {
            const contract = await conenctingWithContract();
            const read = await contract.methods.readMessage(chatName);
            setMessages(read);
        } catch (error) {
            setError("You have no messages")
        };
    };

    // Create account
    const createAccount = async ({name})=> {
        try {
            if (!name) return setError("Please fill all fields")

            const contract = await conenctingWithContract();
            const getCreatedUser = await contract.methods.createAccount(name);
            setLoading(true);
            // await getCreatedUser.wait();
            console.log('getCreatedUser')
            console.log(getCreatedUser)
            setLoading(false);
            
            window.location.reload();
        } catch (error) {
            // setError(error)
            console.log(error)
            setError("Error while creating your account. Please reload the page")
        }
    };

    // Add chat to user
    const addChat = async (chatName) => {
        try {
            if (!chatName) return setError("Please fill all fields")
            const contract = await conenctingWithContract();
            const addChat = await contract.methods.addChat(chatName);
            setLoading(true);
            await addChat.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
            
        } catch (error) {
            setError("Something went wrong. Please try again")
        }
    }

    // Create chat
    const createChat = async (chatName) => {
        try {
            if(!chatName) return setError("Please fill all fields")
            const contract = await conenctingWithContract();
            const createChat = await contract.methods.createChat(chatName);
            setLoading(true);
            await createChat.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            addError("Something went wrong. Please try again")
        }
    };

    // Send message
    const sendMessage = async ({chatName,msg}) => {
        try {
            if (!msg || !chatName) return setError("Please fill all fields")
           
            const contract = await conenctingWithContract();
            const addMessage = await contract.methods.sendMessage(chatName,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Something went wrong. Please try again")
        }
    };
    
    // Read info
    const readUser = async (userAddress) => {
        const contract = await conenctingWithContract();
        const usersName = await contract.methods.getUsername(userAddress);
        setCurrentUserName(usersName);
        setCurrentUserAddress(userAddress);
    };


    return (
        <ChatContext.Provider value={{readMessage, 
        createAccount, 
        sendMessage, 
        readUser, 
        addChat, 
        createChat, 
        connectWallet,
        CheckIfWalletIsConnected,
        account, 
        userName,
        messages,
        allUsers,
        currentUserName,
        currentUserAddress,
        chatNames,
        loading, 
        error}}>
            {children}
        </ChatContext.Provider>
    )
};