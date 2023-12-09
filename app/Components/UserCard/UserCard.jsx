import React from "react";
import Image from "next/image";

import Style from "./UserCard.module.css";

const UserCard = ({name, i, addChat}) => {
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>
                <div className={Style.UserCard_box_info}>
                    {/* <h3>{name}</h3> */}
                </div>
                {/* <Image 
                className{Style.UserCard_box_img} src="/images/chat.png" alt="chat" width={100} height={100} /> */}
                <div className={Style.UserCard_box_info}>
                    <h3>{name}</h3>
                    <button onClick={() => addChat(name)}>Add Chat</button>

                </div>
            </div>
            <small className={Style.number}>{i}</small>
        </div>

    )
};

export default UserCard;