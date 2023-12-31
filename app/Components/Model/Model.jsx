import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Model.module.css";
import { ChatContext } from "@/app/Context/ChatContext";
import { Loader } from "@/app/Components/index";

const Model = ({ openBox,
    title,
    head,
    info,
    smallInfo,
    functionName,
    address, 
    }) => {

    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    const {loading} = useContext(ChatContext);
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}></div>
                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    {loading == true ? (
                    <Loader /> 
                    ) : (
                        <div className={Style.Model_box_right_name}>
                        <div className={Style.Model_box_right_name_info}>
                            <input type="text" 
                            placeholder="Name" 
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {/* <div className={Style.Model_box_right_name_info}>
                            <input type="text" 
                            placeholder={address || "Enter address"}
                            // disabled={true}
                            
                            />
                        </div> */}
                        <div className={Style.Model_box_right_name_btn}>
                            <button onClick={() => functionName({name})}>
                            
                                {""}
                                Submit
                                {""}
                            </button>
                            <button onClick={() => openBox(false)}>
                                {""}
                                Cancel
                                {""}
                            </button>
                        </div>
                    </div>

                    )}


                </div>
            </div>

        </div>
    )
};

export default Model;