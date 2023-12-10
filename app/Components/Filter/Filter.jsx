import React, { useState, useContext } from "react";
import Image from "next/image";

import Style from "./Filter.module.css";
import { ChatContext } from "@/app/Context/ChatContext";
import { Model } from "../index";

const Filter = () => {

    const { account, addChat, createChat } = useContext(ChatContext);

    const [addChats, setAddChats] = useState(false);
    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        {/* <Image src={"/images/search.svg"} width={20} height={20} /> */}
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button>
                        {/* <Image src={"/images/clear.svg"} width={20} height={20} /> */}
                        CLEAR CHAT
                    </button>
                    <button onClick={() => setAddChats(true)}>
                        {/* <Image src={"/images/clear.svg"} width={20} height={20} /> */}
                        Add Chat
                    </button>
                </div>
            </div>

            {/* Model Component */}
            {addChats && (
                <div className={Style.Filter_model}>
                    <Model 
                    openBox={setAddChats}
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
};

export default Filter;