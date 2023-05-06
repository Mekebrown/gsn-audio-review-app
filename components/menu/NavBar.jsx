import React, { useContext, useState } from "react";
import Link from "next/link";

import Hamburger from "./Hamburger";
import { AuthContext } from "../../lib/context/AuthContext";

const VisitorNavBar = () => {
    const href = "/";
    const logoImg = "/logo192.png";

    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <Link 
            href={href} 
            className="flex items-center flex-shrink-0 text-black mr-6">
            <span className="font-semibold text-xl tracking-tight">
                <img 
                    src={logoImg} 
                    alt="GSN Logo" 
                    className="h-8 mr-2" 
                />
                GSN Audio Review App
            </span>
        </Link>
    </menu>;
};

const AdminNavBar = ({ open, setOpen }) => {
    const href = "/";
    const logoImg = "/logo192.png";
    
    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <section className=" text-black">
            <Link 
                href={href}
            >
                <span className="font-semibold text-xl tracking-tight">
                    <img 
                        src={logoImg} 
                        alt="GSN Logo" 
                        className="h-8 mr-2 inline" 
                    />
                    Admin View
                </span>
            </Link>
        </section>

        <section className="text-gray">
            <Hamburger open={open} setOpen={setOpen} onClick={setOpen} />
        </section>
    </menu>;
};

const UserNavBar = ({ open, setOpen }) => {
    const href = "/";
    const logoImg = "/logo192.png";

    return <menu className="flex items-center justify-between flex-wrap bg-white p-6">
        <section className="text-black">
            <Link
                href={href}
            >
                <span className="font-semibold text-xl tracking-tight">
                    <img 
                        src={logoImg} 
                        alt="GSN Logo" 
                        className="h-8 mr-2 inline" 
                    />
                    {user.username}
                </span>
            </Link>
        </section>

        <section className="text-gray">
            <Hamburger open={open} setOpen={setOpen} onClick={setOpen} />
        </section>
    </menu>;
};

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const data = useContext(AuthContext);

    const user = {
        role: "admin",
    };

    const ShowNavBar = () => {
        if (user.role === "admin") {
            return <AdminNavBar open={open} setOpen={() => setOpen(!open)} />;
        } else if (user.role === "user") {
            return <UserNavBar open={open} setOpen={() => setOpen(!open)} />;
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
