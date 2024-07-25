import Link from 'next/link';

import { GSNLogo } from '@/app/lib/general_variables';

export default function Footer() {
    return <footer>
        {/* brand bio/mission - subs box - IG feed? - social media - location -  secondary nav links */}
        <section>
            <Link
                href="/"
                rel="noopener noreferrer"
            >
                <span> Powered by <GSNLogo /> </span>
            </Link>
            <br />
            <p>Thanks for listening!</p><br />

            <small>
                Save notes, follow media in transition, and contribute to content quality. All in real time! <br />
            </small>
            <br />
            <Link
                href="/signin"
                rel="noopener noreferrer"
            >
                Sign In
            </Link><br />
            <br />
            <hr className="horizontalRule" />

            <Link
                href="https://www.mekesiabrown.com"
                rel="noopener noreferrer"
            >
                Developed by Meke
            </Link>

            <Link
                href="/about/gsn"
                rel="noopener noreferrer"
            >
                About GSN
            </Link> -

            <Link
                href="/about/gmp"
                rel="noopener noreferrer"
            >
                About GMP
            </Link> -

            <Link
                href="/blog"
                rel="noopener noreferrer"
            >
                Blog
            </Link> -

            <Link
                href="/contact"
                rel="noopener noreferrer"
            >
                Contact Us
            </Link> -

            <Link
                href="/faq"
                rel="noopener noreferrer"
            >
                FAQ
            </Link> -

            <Link
                href="/terms"
                rel="noopener noreferrer"
            >
                Terms
            </Link> -

            <Link
                href="/disclaimer"
                rel="noopener noreferrer"
            >
                Disclaimer
            </Link>
        </section>
    </footer>;
};
