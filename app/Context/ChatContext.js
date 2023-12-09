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
    const fetchData = async (chatName) => {
        try {
            const contract = await conenctingWithContract();
            // get account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            // get username
            const username = await contract.getUsername(account[0]);
            setUserName(username);
            // get all users
            const allUsers = await contract.getAllAppUsers();
            setAllUsers(allUsers);
            // get chat names
            const chatNames = await contract.getAllChatNames();
            setChatNames(chatNames);
        } catch (error) {
            // setError("Please install and connect your wallet to continue")
        }
        
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Read message
    const readMessage = async (chatName) => {
        try {
            const contract = await conenctingWithContract();
            const read = await contract.readMessage(chatName);
            setMessages(read);
        } catch (error) {
            setError("You have no messages")
        };
    };

    // Create account
    const createAccount = async ({name, accountAddress})=> {
        try {
            if (!name || !accountAddress) return setError("Please fill all fields")

            const contract = await conenctingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error while creating your account. Please reload the page")
        }
    };

    // Add chat to user
    const addChat = async (chatName) => {
        try {
            if (!chatName) return setError("Please fill all fields")
            const contract = await conenctingWithContract();
            const addChat = await contract.addChat(chatName);
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
            const createChat = await contract.createChat(chatName);
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
            const addMessage = await contract.sendMessage(chatName,msg);
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
        const usersName = await contract.getUsername(userAddress);
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