import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckIfWalletIsConnected, connectWallet, conenctingWithContract} from '../../Utils/apiFeature';
import { ethers }  from "ethers";

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
            const connectAccount = await connectWallet();

            // Ensure connectAccount is a valid address
            if (connectAccount && ethers.utils.isAddress(connectAccount)) {
                setAccount(connectAccount);

                // Now we can safely use connectAccount to call getUsername
                const username = await contract.methods.getUsername(connectAccount).call();
                setUserName(username);
            } else {
                throw new Error('Invalid account address');
            }
            // get all users
            const allUsers = await contract.methods.getAllAppUsers().call();
            setAllUsers(allUsers);
            // get chat names
            const chatNames = await contract.methods.getAllChatNames().call();
            setChatNames(chatNames);
            console.log(userName)
        } catch (error) {
            console.log(error);
            setError("Please install and connect your wallet to continue");
        }
        
    };
    useEffect(() => {
        fetchData();
    } ,[userName, account]);

    // Read message
    const readMessage = async (chatName) => {
        try {
            const contract = await conenctingWithContract();
            const read = await contract.methods.readMessage(chatName).call();
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
            setLoading(true);
            const getCreatedUser = await contract.methods.createAccount(name).send({from: account});
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
            const addChat = await contract.methods.addChat(chatName).send({from: account});
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
            const createChat = await contract.methods.createChat(chatName).send({from: account});
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
            const addMessage = await contract.methods.sendMessage(chatName,msg).send({from: account});
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
        const usersName = await contract.methods.getUsername(userAddress).call();
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
        setUserName,
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