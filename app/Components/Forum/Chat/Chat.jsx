import React, {useState, useEffect} from "react";
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
    

    useEffect(() => {
        const fetchData = async (currentChat) => {
            let temp = true; 
            let count = 0
            let messageArray = []; // Initialize messageArray as an empty array
            console.log("currentChat", currentChat);
            do {
              messageArray = await readMessage(currentChat);
              console.log("messageArrays", messageArray);
              
              if ( await messageArray === undefined) { // If messageArray is defined, we want to exit the loop
                console.log("messageArray", messageArray);
                temp = false; // Set temp to false to exit the loop
              } else {
                console.log("messageArray", messageArray);
                console.log("temp", true);
                temp = true; // If undefined, set temp to true to continue the loop
              }
            } while (temp); // This will continue while temp is true (meaning messageArray is undefined)
            setMessages(messageArray); // Once messageArray is defined, set it to messages state
          };
        fetchData(currentChat);
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
                        {
                           messages.map((item, index) => {
                                console.log("item", item);
                                console.log("index", index);
                                <div key={index + 1}>
                                    <div className={Style.Chat_box_left_title}>
                                        <span>{item.poster}</span>
                                        <small>Time: {convertTime(item.timestamp)}</small>
                                    </div>
                                    <p >{item.message}</p>
                                </div>
                            }
                        )}
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