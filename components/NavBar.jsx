export default function NavBar() {
    return <nav
        className="flex items-center justify-between flex-wrap bg-white p-6"
        >
            <div className="flex items-center flex-shrink-0 text-black mr-6">
                <img 
                    src="/logo192.png" 
                    alt="GSN Logo" 
                    className="h-8 mr-2" 
                />

                <span className="font-semibold text-xl tracking-tight">
                    GSN Audio Review App
                </span>
            </div>
        </nav>;
}
