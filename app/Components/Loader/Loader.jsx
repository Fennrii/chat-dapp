import React from "react";
import Image from "next/image";

import Style from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <div className={Style.Loader_box_left}>
                    {/* <Image src="/images/loader.svg" alt="loader" width={100} height={100} /> */}
                </div>
                <div className={Style.Loader_box_right}>
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    )
};

export default Loader;