import React, { useState, useEffect, useContext } from 'react'

import { UserCard } from '@/app/Components/index'
import Style from '@/app/Styles/alluser.module.css'
import { ChatContext } from '@/app/Context/ChatContext'


const alluser = () => {
    const {chatNames, addChat} = useContext(ChatContext)
    // console.log('Alluser')
    // console.log(chatNames)
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Find your Chats</h1>
            </div>
            <div className={Style.alluser}>
                {chatNames.map((chat, index) => (
                    <UserCard 
                        key={index}
                        i={index+1}
                        name={chat}
                        addChat={addChat}
                    />
                ))}
            </div>
        </div>
    )
}

export default alluser