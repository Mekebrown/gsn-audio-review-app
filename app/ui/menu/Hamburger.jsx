const Hamburger = () => {
    return <>
        {isHamburgerOpen ? (
            <div
                className="hamburger bg-red-500"
            >
                <p>The role</p>
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
        ) :
            (!isHamburgerOpen && <button
                type="button"
                className="px-3 py-2 border rounded text-black border-black"
                onClick={() => setIsHamburgerOpen(prev => !prev)}
            >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Menu</title>

                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </button>)}
    </>;
};

export default Hamburger;
