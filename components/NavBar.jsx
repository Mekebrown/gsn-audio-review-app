import React, { useState } from "react";
import Link from "next/link";
import Hamburger from "./menu/Hamburger";

const VisitorNavBar = ({href = "/login"}) => {
    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <Link 
            href={href} 
            className="flex items-center flex-shrink-0 text-black mr-6">
            <span className="font-semibold text-xl tracking-tight">
                <img 
                    src="/logo192.png" 
                    alt="GSN Logo" 
                    className="h-8 mr-2" 
                />
                GSN Audio Review App
            </span>
        </Link>
    </menu>;
};

const AdminNavBar = ({ href = "/", open, setOpen }) => {
    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <section className=" text-black">
            <Link 
                href={href}
            >
                <span className="font-semibold text-xl tracking-tight">
                    <img 
                        src="/logo192.png" 
                        alt="GSN Logo" 
                        className="h-8 mr-2 inline" 
                    />
                    Admin View
                </span>
            </Link>
        </section>

        <section className="text-gray">
            <Hamburger role="admin" />
        </section>
    </menu>;
};

const UserNavBar = ({href = "/", open, setOpen}) => {
    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <section className="text-black">
            <Link
                href={href}
            >
                <span className="font-semibold text-xl tracking-tight">
                    <img 
                        src="/logo192.png" 
                        alt="GSN Logo" 
                        className="h-8 mr-2 inline" 
                    />
                    User View
                </span>
            </Link>
        </section>

        <section className="text-gray">
            <Hamburger role="user" />
        </section>
    </menu>;
};

const NavBar = () => {
    const [loggedIn, setLoggedIn] = useState("admin");

    const ShowNavBar = () => {
        if (loggedIn === "admin") {
            return <AdminNavBar />;
        } else if (loggedIn === "user") {
            return <UserNavBar />;
        } else {
            return <VisitorNavBar />;
        }
    };

    return <header className="box-sizing: border-box; margin: 0 auto 3em;">
        <nav
        className="bg-white p-6"
        >
            <ShowNavBar />
        </nav>
    </header>;
}

export default NavBar;
