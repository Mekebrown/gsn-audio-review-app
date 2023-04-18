export default function Footer() {
    return <footer
        className="flex flex-col items-center justify-center w-full h-24"
    >
        <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
        >
            Powered by{' '}
            <img 
                src="/logo.svg" 
                alt="GSN Logo" 
                className="h-4 ml-2" 
            />
        </a>
    </footer>;
}
