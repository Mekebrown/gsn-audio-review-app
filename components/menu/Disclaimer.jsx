/* 
    BG colors made from logo colors; Waves like an ocean; Animated?
*/
import { useState } from 'react';
import Link from 'next/link';

export default function Disclaimer() {
    const [disclaimerOpen, setDisclaimerOpen] = useState(true);

    if (!disclaimerOpen) return null;

    return <div
        className="flex flex-col items-center justify-center w-full h-[20%] p-3 fixed z-50 bottom-0 left-0 rounded-t-[60%] backdrop-brightness-50 bg-gradient-to-r from-[#ccc] to-[#f5f5f5]"
        >
        <span>
            <Link
            href="/"
            rel="noopener noreferrer"
        >
                Disclaimer
            </Link> &nbsp; | &nbsp; 

            <button type="button">
                [Reject All]
            </button> 

            <button type="button">
                [Accept All]
            </button>
        </span>
    </div>;
}