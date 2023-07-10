import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NavBar = () => {
    const [open, setOpen] = useState(false);

    const { data: session, status } = useSession();
    const userRole = "client";
    const weGotAnEmail = session && session.user && session.user.email;
    
    const Hamburger = () => {
        return <>
            {open ? (
                <div 
                    className="hamburger bg-red-500" 
                >
                    <p>{userRole} role</p>
                    <div className="hamburger__line">
                        one
                    </div>
                    <div className="hamburger__line">
                        two
                    </div>
                    <div className="hamburger__line">
                        three
                    </div>
                </div>
                ):
            (!open && <button 
                type="button" 
                className="px-3 py-2 border rounded text-black border-black"
                onClick={() => setOpen(prev => !prev)} 
            >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>
    
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>)}
        </>;
    };

    return <header className="box-sizing: border-box; margin: 0 auto 3em;">
        <nav
        className="bg-white p-6"
        >
            {status !== "unauthenticated" && (
                <menu className="flex items-center justify-between flex-wrap bg-white p-6">
                    <section className=" text-black">
                        <Link href="/" >
                            <span className="font-semibold text-xl tracking-tight">
                                <img 
                                    src="/logo192.png" 
                                    alt="GSN Logo" 
                                    className="h-8 mr-2 inline" 
                                />
                                {
                                    weGotAnEmail && <span>{session.user.email}</span>
                                }
                            </span>
                        </Link>
                    </section>

                    <section className="text-gray">
                        <Hamburger />
                    </section>
                </menu>
            )}
            {status === "unauthenticated" && (
                <menu className="flex items-center justify-between flex-wrap bg-white p-6">
                    <Link 
                        href="/"
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
                </menu>
            )}
        </nav>
    </header>;
}

export default NavBar;
