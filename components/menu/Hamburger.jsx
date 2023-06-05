import React from "react";

const Hamburger = ({ role, open, setOpen }) => {
    const Menu = () => {
        if (open) {
            return <div 
                className="hamburger bg-red-500" 
            >
                <p>{role} role</p>
                <div className="hamburger__line">
                    one
                </div>
                <div className="hamburger__line">
                    two
                </div>
                <div className="hamburger__line">
                    three
                </div>
            </div>;
        } else {;
            return <button 
                type="button" 
                className="px-3 py-2 border rounded text-black border-black"
                onClick={setOpen} 
            >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>

                    <path 
                        d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                    />
                </svg>
            </button>;
        }
    };

    return <Menu onClick={setOpen} />;
}

export default Hamburger;
