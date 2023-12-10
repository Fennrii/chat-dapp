import React, {useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Style from "@/app/Components/Forum/Chat/Chat.module.css";
import { convertTime } from "@/Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({functionName,
    readMessage,
    account,
    userName,
    loading,
    currentChat,
                                }) => {
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState({
        name: "",
        address: "",
    });
    const [messages, setMessages] = useState([]);
    console.log("currentChat", currentChat);
    let oldchat = '';
    
    useEffect(() => {
        let isSubscribed = true; // Flag to manage subscription state

        const fetchData = async () => {
            if (currentChat) {
                const messageArray = await readMessage(currentChat);
                if (isSubscribed && messageArray) {
                    setMessages(messageArray);
                }
            }
        };

        fetchData();

        // Cleanup function to set isSubscribed to false when component unmounts or chat changes
        return () => {
            isSubscribed = false;
        };
    }, [currentChat]);
    
    console.log("messages", messages);
    const router = useRouter();
    useEffect(() => {
        if(router.isReady) return;
        setChatData({
            name: router.query.name,
            address: router.query.address,
        });
    }, [router.isReady]);
    return (
        <div className={Style.Chat}>
            {currentChat ? (
                <div className={Style.Chat_info}>
                    <div className={Style.Chat_info_box}>
                        <h4>{currentChat}</h4>
                    </div>
                </div>
            ) : (
                ""
            )}
            <div className={Style.Chat_box_box}>
                <div className={Style.Chat_box}>
                    <div className={Style.Chat_box_left}>
                        {messages.map((item, index) => {
                            console.log("item", item);
                            console.log("index", index);
                            return (
                                <div key={index}>
                                    <div className={Style.Chat_box_left_title}>
                                        <span>{item.poster}</span>
                                        <small>Time: {convertTime(item.timestamp)}</small>
                                    </div>
                                    <p>{item.message}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {currentChat ? (
                    <div className={Style.Chat_box_send}>
                        <div className={Style.Chat_box_send_img}>
                            <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
                            {
                                loading ? (
                                    <Loader />
                                ) : (
                                    <button onClick={() => functionName({msg:message, chatName:currentChat})}>Send</button>
                                )
                            }
                        </div>
                    </div>
                ) : ""}
            </div>
        </div>
    )
};

export default Chat;