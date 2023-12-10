import React, {useState, useContext } from "react";
import Image from "next/image";

import Style from "./Forum.module.css";
import  Card  from "./Card/Card";
import Chat from "./Chat/Chat";

import { ChatContext } from "@/app/Context/ChatContext";


const Forum = () => {
    // const array = [1,2,3,4,5,6,7,8,9,10];
    const { sendMessage, account, userChats, readMessage, userName, loading, readUser, currentChat, setCurrentChat,updateUserChats } = useContext(ChatContext);
    // console.log("userChats", userChats);
    updateUserChats();
    // console.log("userChats", userChats);
    return (
            <div className={Style.Forum}>
                <div className={Style.Forum_box}>
                    <div className={Style.Forum_box_left}>
                        {userChats.map((chatName, index) => {
                            return (
                                <Card 
                                key={index}
                                name={chatName}
                                i={index}
                                readMessage={readMessage}
                                readUser={readUser}
                                setCurrentChat={setCurrentChat}
                                />
                            )

                        })}
                    </div>
                    <div className={Style.Forum_box_right}>
                        <Chat 
                            functionName={sendMessage} 
                            readMessage={readMessage}
                            account={account}
                            userName={userName}
                            loading={loading}
                            currentChat={currentChat}
                            
                        />
                    </div>
                </div>
            </div>
        );
    };
export default Forum;