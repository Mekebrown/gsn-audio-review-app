import React, { useState } from "react";

const Hamburger = ({ role }) => {
    const [open, setOpen ] = useState(false);

    const Menu = () => {
        if (open) {
            return <div 
                className="hamburger bg-red-500" 
                onClick={() => setOpen(false)}
            >
                <p>{role} role</p>
                <div className="hamburger__line"
                onClick={() => setOpen(false)}>
                    one
                </div>
                <div className="hamburger__line"
                onClick={() => setOpen(false)}>
                    two
                </div>
                <div className="hamburger__line"
                onClick={() => setOpen(false)}>
                    three
                </div>
            </div>;
        } else {;
            return <button 
                type="button" 
                className="px-3 py-2 border rounded text-black border-black"
                onClick={() => setOpen(true)}
            >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>

                    <path 
                        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" 
                        onClick={() => setOpen(true)} 
                    />
                </svg>
            </button>;
        }
    };

    return <Menu />;
}

export default Hamburger;
