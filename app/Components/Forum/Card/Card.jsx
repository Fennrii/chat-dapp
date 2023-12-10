import React, { useEffect } from "react";
import Image from "next/image";
import Link  from "next/link";

import Style from "@/app/Components/Forum/Card/Card.module.css";
const Card = ({ 
                name,
                i,
                readMessage,
                readUser,
                setCurrentChat}) => {
    return (
        <Link href={{pathname: "/", query: `${name}`}}>
            <div className={Style.Card} onClick={() => (readMessage(name), setCurrentChat(name))}>
                <div className={Style.Card_box}>
                    <div className={Style.Card_box_left}>
                        {/* <Image src={`/images/${name}.png`} alt="chat" width={100} height={100} /> */}
                    </div>
                    <div className={Style.Card_box_right}>
                        <div className={Style.Card_box_right_middle}>
                            <h4>{name}</h4>

                        </div>
                        <div className={Style.Card_box_right_end}>
                            <small>{i + 1}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default Card;