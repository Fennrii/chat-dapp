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
    const [userChats, setUserChats] = useState([]);
    const [chatNames, setChatNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [currentChat, setCurrentChat] = useState('');

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
            const allUser = await contract.methods.getAllAppUsers().call();
            const allUserArray = allUser.map(user => user.username);
            setAllUsers(allUserArray);
            console.log(allUsers)
            // get chat names
            const chatNames = await contract.methods.getAllChatNames().call();
            setChatNames(chatNames);
            console.log(chatNames)
            // get user chats
            const allUserChats = await contract.methods.getUserChats(account).call();
            const chatNamesArray = allUserChats.map(chat => chat.chatName);
            console.log('allUserChats')
            console.log(chatNamesArray)
            setUserChats(chatNamesArray);
            setMessages(readMessage(chatNamesArray[0]));

        } catch (error) {
            console.log(error);
            setError("Please install and connect your wallet to continue");
        }
        
    };
    useEffect(() => {
        fetchData();
    } ,[account]);

    // Read message
    const readMessage = async (chatName) => {
        try {
            const contract = await conenctingWithContract();
            const read = await contract.methods.readMessage(chatName).call();
            console.log(read)

            setMessages(read);
            return read;
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

    const updateUserChats = async () => {
        try {
            const contract = await conenctingWithContract();
            const allUserChats = await contract.methods.getUserChats().call();
            setUserChats(allUserChats);
        } catch (error) {
            setError("Something went wrong. Please try again")
        }
    };

    // Add chat to user
    const addChat = async (chatName) => {
        try {
            if (!chatName) return setError("Please fill all fields")
            const contract = await conenctingWithContract();
            setLoading(true);
            console.log(account)
            const addChat = await contract.methods.addChat(chatName).send({from: account});
            console.log('addChat')
            console.log(addChat)
            const allUserChats = await contract.methods.getUserChats().call();
            console.log('allUserChats')
            console.log(allUserChats)
            setUserChats(allUserChats);
            setLoading(false);
            router.push('/');
            window.location.reload();
            
        } catch (error) {
            setError("Something went wrong. Please try again")
        }
    };

    // Create chat
    const createChat = async (chatName) => {
        try {
            if(!chatName) return setError("Please fill all fields")
            setLoading(true);
            const contract = await conenctingWithContract();
            if (typeof chatName.name !== 'string') {
                console.log("chatName", chatName)
                throw new Error('chatName must be a string');
            }
            const createChat = await contract.methods.createChat(chatName.name).send({from: account});
            
            // await createChat.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setLoading(false);
            console.log(error)
            // addError("Something went wrong. Please try again")
        }
    };

    // Send message
    const sendMessage = async ({msg,chatName}) => {
        try {
            // if (!msg || !chatName) return setError("Please fill all fields")
            setLoading(true);

            const contract = await conenctingWithContract();
            const addMessage = await contract.methods.sendMessage(chatName,msg).send({from: account});
            // await addMessage.wait();
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
        return usersName;
    };



    return (
        <ChatContext.Provider value={{
            updateUserChats,
        readMessage, 
        createAccount, 
        sendMessage, 
        readUser, 
        addChat, 
        createChat, 
        connectWallet,
        CheckIfWalletIsConnected,
        setUserName,
        setCurrentChat,
        currentChat,
        account, 
        userName,
        messages,
        allUsers,
        chatNames,
        userChats,
        loading, 
        error}}>
            {children}
        </ChatContext.Provider>
    )
};