import Link from 'next/link';
import Image from 'next/image';

import Disclaimer from './Disclaimer';

export default function Footer() {
    const logo = "/logo192.png";

    return <footer
        className="flex flex-col items-center justify-center w-full h-24"
    >
        <Link
            href="/"
            rel="noopener noreferrer"
        >
            <span>
                Powered by 
                <Image 
                    src={logo} 
                    alt="GSN Logo" 
                    width={35}
                    height={35} 
                    className="inline ml-3"
                />
            </span>
        </Link>

        <Disclaimer />

        <Link
            href="/"
            rel="noopener noreferrer"
        >
            Privacy Policy
        </Link>

        <Link
            href="/"
            rel="noopener noreferrer"
        >
            Terms of Service
        </Link>
    </footer>;
}
