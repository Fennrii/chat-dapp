import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Style from './NavBar.module.css';
import { ChatContext } from '@/app/Context/ChatContext';
import { Model, Error } from '@/app/Components/index';

const NavBar = () => {
    const menuItems = [
            {
            menu: 'All Users',
            link: 'alluser',
        },
        {
            menu: 'CHAT',
            link: '/',
        },
        {
            menu: 'CONTACT',
            link: '/',
        },
        {
            menu: 'SETTING',
            link: '/',
        },
        {
            menu: 'FAQS',
            link: '/',
        },
        {
            menu: 'TOS',
            link: '/',
        },
    ]

    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    const { account, userName, connectWallet, createAccount, error } = useContext(ChatContext);
    return (
        <div className={Style.NavBar}>
            <div className={Style.Navbar_box}>
                <div className={Style.NavBar_box_left}>
                    {/* <Image src="/images/logo.png" alt="Logo" width={50} height={50} /> */}
                </div>
                <div className={Style.NavBar_box_right}>
                    {/* No mobile integration */}
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((item, index) => (
                                <div onClick={() => setActive(index + 1)} key={index + 1} className={`${Style.NavBar_right_box_menu_items} ${active == index + 1 ? Style.active_btn : ""}`}>
                                    <Link className={Style.NavBar_right_box_menu_items_link} href={item.link}>
                                        {item.menu}
                                    </Link>
                                </div>
                            ))}
                    </div>
                    {/* Connect to Wallet */}
                    <div className={Style.NavBar_box_right_connect}>
                        {account == "" ? (
                            <button onClick={() => connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <button onClick={() => setOpenModel(true)}>
                                {""}
                                <small>{userName || "Create Account"}</small>
                            </button>
                        )}
                    </div>
                    {/* Menu */}
                    <div className={Style.NavBar_box_right_open} onClick={() => setOpen(true)}>
                            {/* <Image src="/images/dropdown.png" alt="Account Image" */}
                            {/* width={20} height={20} /> */}
                    </div>
                </div>

            </div>
            {/* Model component */}
            {openModel && (
                <div className={Style.modelBox}>
                    <Model openBox={setOpenModel}
                        title="WELCOME TO"
                        head="CHAT BODY"
                        info='Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolores. Inventore harum et ea laboriosam non facilis, suscipit iure quidem magni tenetur earum. Nulla ratione quod totam aliquid debitis aut!'
                        smallInfo='Kindly select your name...'
                        functionName={createAccount}
                        address={account}
                    />
                </div>
            )}
            {error == "" ? "" : <Error error={error} />}
        </div>
    )
};

export default NavBar;