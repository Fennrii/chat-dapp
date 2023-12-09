import React from "react";
import Image from "next/image";

import Style from "./UserCard.module.css";

const UserCard = ({chat, index, addChat}) => {
    // console.log(chat);
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>
                <div className={Style.UserCard_box_info}>
                    <h3>{chat.chatName}</h3>
                </div>
                {/* <Image src="/images/chat.png" alt="chat" width={100} height={100} /> */}
                <div className={Style.UserCard_box_info}>
                    <h3>{chat.chatName}</h3>

                </div>
            </div>
        </div>

    )
};

export default UserCard;