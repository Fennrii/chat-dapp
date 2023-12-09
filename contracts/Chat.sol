// SPDX-License-Identifier: MIT
pragma solidity >=0.7.14 <0.9.0;
// pragma solidity >=0.4.22 <0.9.0;

// TODO:
// Struct to save the post
    // timestamp, posts, poster
// Function to post
    // Takes string for post
    // Gets timestamp from block
    // msg.sender = poster

contract Chat{
    struct message{
        address poster;
        uint256 timestamp;
        string message;
    }

    struct user{
        string username;
        Chats[] chatList;
    }

    struct Chats{
        string chatName;
        uint chatId;
    }

    struct AllUsers{
        string username;
        address accountAddress;
    }

    AllUsers[] getAllUsers;
    string[] allChatNames;
    Chats[] allChats;
    uint numChats;

    mapping(string => uint) chats;

    mapping(address => user) userList;

    mapping(uint => message[] ) allMessages;

    constructor(){
        // Create admin account
        userList[msg.sender].username = "Admin";
        getAllUsers.push(AllUsers("Admin", msg.sender));

        // Create default chat
        numChats = 1;
        chats["All"] = numChats;
        allChatNames.push("All");

        // Create second default chat
        numChats++;
        chats["General"] = numChats;
        allChatNames.push("General");

    }

    // Check if user exists
    function checkUserExists(address key) public view returns(bool){
        return keccak256(abi.encodePacked(userList[key].username)) != keccak256(abi.encodePacked(""));
    }

    // Create a account
    function createAccount(string calldata username) external {
        require(checkUserExists(msg.sender) == false, "User exists");
        require(bytes(username).length>0,"Username cannot be empty");

        userList[msg.sender].username = username;

        getAllUsers.push(AllUsers(username, msg.sender));
    }

    // Get username from address
    function getUsername(address key) external view returns (string memory){
        if(checkUserExists(key)){
            return userList[key].username;
        }
        else{
            return "User does not exist";
        }
    }
    
    // Sends message
    function sendMessage(string calldata chat, string calldata _msg) external {
        require(chats[chat] != 0, "Chat does not exist");
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chats[chat]].push(newMsg);
    }

    // Read message
    function readMessage(string calldata chat) external view returns(message[] memory){
        require(chats[chat] != 0, "Chat does not exist");
        return allMessages[chats[chat]];
    }
    // Get all users
    function getAllAppUsers() public view returns(AllUsers[] memory){
        return getAllUsers;
    }
    // Create chat
    function createChat(string calldata chat) external {
        require(chats[chat] == 0, "Chat already exists");
        numChats++;
        chats[chat] = numChats;
        allChatNames.push(chat);
    }
    // Get chat id
    function getChatId(string calldata chat) external view returns(uint){
        return chats[chat];
    }
    // add chat to user
    function addChat(string calldata chat) external {
        require(chats[chat] != 0, "Chat does not exist");
        require(checkUserExists(msg.sender), "User does not exist");
        for (uint i = 0; i < userList[msg.sender].chatList.length; i++) {
            if(keccak256(abi.encodePacked(userList[msg.sender].chatList[i].chatName)) == keccak256(abi.encodePacked(chat))){
                revert("Chat already added");
            }
        }
        
        userList[msg.sender].chatList.push(Chats(chat, chats[chat]));
    }
    // get chat names
    function getAllChatNames() external view returns(string[] memory){
        return allChatNames;
    }

}