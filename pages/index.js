import React, { useEffect, useState, useContext } from 'react';

import { ChatContext } from '../app/Context/ChatContext';
import { Filter, Forum } from "@/app/Components/index"

const Chat = () => {
    const {title} = useContext(ChatContext);
    return (
        <div>
            <Filter />
            <Forum />
        </div>
    )
};

export default Chat;