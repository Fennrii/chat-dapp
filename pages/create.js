import React, { useState, useEffect, useContext } from 'react'

import { UserCard } from '@/app/Components/index'
import Style from '@/app/Styles/alluser.module.css'
import { ChatContext } from '@/app/Context/ChatContext'


const create = () => {
    const {chatNames, createChat} = useContext(ChatContext)
    const [addChats, setCreateChats] = useState(false)
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
                        addChat={createChat}
                    />
                ))}
            </div>
            {/* Model Component */}
            {addChats && (
                <div className={Style.Filter_model}>
                    <Model 
                    openBox={setCreateChats}
                    title="WELCOME TO"
                    head="CHAT BUDDY"
                    info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolores. Inventore harum et ea laboriosam non facilis, suscipit iure quidem magni tenetur earum. Nulla ratione quod totam aliquid debitis aut!'
                    smallInfo="Kindly Select your chat name..."
                    functionName={createChat}
                    />
                </div>
            )}
        </div>
    )
}

export default create