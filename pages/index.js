import React, { useEffect, useState, useContext } from 'react';

import { ChatContext } from '../app/Context/ChatContext';

const Chat = () => {
    const {title} = useContext(ChatContext);
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
};

export default Chat;