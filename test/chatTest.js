const Chat = artifacts.require("Chat");
const truffleAssert = require('truffle-assertions');

contract("Chat", (accounts) => {
    let chatInstance;

    before(async () => {
        chatInstance = await Chat.deployed();
    });

    // Test for constructor
    it("should set the initial values correctly", async () => {
        const adminUsername = await chatInstance.getUsername(accounts[0]);
        assert.equal(adminUsername, "Admin", "Admin username is not set correctly");

        const allChatNames = await chatInstance.getAllChatNames();
        assert.include(allChatNames, "All", "Default chat 'All' was not created");
    });

    // Test for checkUserExists
    it("should correctly identify if a user exists", async () => {
        // Assuming accounts[0] is the admin created in constructor
        const exists = await chatInstance.checkUserExists(accounts[0]);
        assert.isTrue(exists, "Admin account should exist");

        const notExists = await chatInstance.checkUserExists(accounts[1]);
        assert.isFalse(notExists, "Non-existing account should not exist");
    });

    // Test for createAccount
    it("should create a new account", async () => {
        await chatInstance.createAccount("User1", { from: accounts[1] });
        const newUser = await chatInstance.getUsername(accounts[1]);
        assert.equal(newUser, "User1", "New user was not created correctly");
    });

    // Test for sendMessage and readMessage
    it("should send and read a message", async () => {
        const message = "Hello, world!";
        await chatInstance.sendMessage("All", message, { from: accounts[1] });
        const messages = await chatInstance.readMessage("All");
        assert.equal(messages[0].message, message, "Message content is not correct");
    });

    // Test for getAllAppUsers
    it("should return all registered users", async () => {
        const users = await chatInstance.getAllAppUsers();
        assert.equal(users.length, 2, "Number of registered users should be 2");
        assert.equal(users[1].username, "User1", "Second registered user should be 'User1'");
    });

    // Test for createChat
    it("should create a new chat", async () => {
        await chatInstance.createChat("NewChat", { from: accounts[1] });
        const chatId = await chatInstance.getChatId("NewChat");
        assert.notEqual(chatId.toNumber(), 0, "New chat should have a valid ID");
    });

    // Test for getChatId
    it("should return the correct chat ID", async () => {
        const chatId = await chatInstance.getChatId("All");
        assert.equal(chatId.toNumber(), 1, "Chat ID for 'All' should be 1");
    });

    // Test for addChat
    it("should allow a user to add a chat", async () => {
        await chatInstance.addChat("NewChat", { from: accounts[1] });
        // Retrieving the user's chat list would be needed here
        // Assuming such a function exists
    });

    // Test for getAllChatNames
    it("should return all chat names", async () => {
        const chatNames = await chatInstance.getAllChatNames();
        assert.include(chatNames, "All", "'All' chat should be present");
        assert.include(chatNames, "NewChat", "'NewChat' should be present");
    });

    // Example: Attempt to create a chat that already exists
    it("should not allow creating an existing chat", async () => {
        await truffleAssert.reverts(
            chatInstance.createChat("All", { from: accounts[1] }),
            "Chat already exists"
        );
    });

    // Example: Send message to non-existent chat
    it("should not allow sending messages to a non-existent chat", async () => {
        await truffleAssert.reverts(
            chatInstance.sendMessage("NonExistentChat", "test message", { from: accounts[1] }),
            "Chat does not exist"
        );
    });
        
    
    // Test for reading messages from a non-existing chat
    it("should not allow reading messages from a non-existing chat", async () => {
        await truffleAssert.reverts(
            chatInstance.readMessage("RandomChat"),
            "Chat does not exist"
        );
    });

    // Test for adding a non-existing chat to a user
    it("should not allow adding a non-existing chat to a user", async () => {
        await truffleAssert.reverts(
            chatInstance.addChat("RandomChat", { from: accounts[1] }),
            "Chat does not exist"
        );
    });

    // Test for adding an already existing chat to a user
    it("should not allow adding an already existing chat to a user", async () => {
        await chatInstance.createChat("NewChat1", { from: accounts[1] });
        await chatInstance.addChat("NewChat1", { from: accounts[1] }); 
        await truffleAssert.reverts(
            chatInstance.addChat("NewChat1", { from: accounts[1] }),
            "Chat already added"
        );
    });

    // Test for adding a chat to a non-existing user
    it("should not allow adding a chat to a non-existing user", async () => {
        await truffleAssert.reverts(
            chatInstance.addChat("NewChat", { from: accounts[2] }),
            "User does not exist"
        );
    });

    // Test for creating an account with an existing address
    it("should not allow creating an account with an existing address", async () => {
        await truffleAssert.reverts(
            chatInstance.createAccount("AnotherUser", { from: accounts[1] }),
            "User exists"
        );
    });

    // Test for creating an account with an empty username
    it("should not allow creating an account with an empty username", async () => {
        await truffleAssert.reverts(
            chatInstance.createAccount("", { from: accounts[2] }),
            "Username cannot be empty"
        );
    });

});

