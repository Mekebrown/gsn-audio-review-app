import Link from 'next/link';

import { GSNLogo } from '@/app/lib/general_variables';
import "@/styles/ui/footer.css";

export default function Footer() {
    return <footer>
        {/* brand bio/mission - subs box - IG feed? - social media - location -  secondary nav links */}
        <section className="footerTopSection">
            <div className="footerTopLeftCol">
                <Link href="/" rel="noopener noreferrer" >
                    <span><GSNLogo /></span>
                </Link>

                <p>Thanks for listening!</p>

                <small>
                    Save notes, follow media in transition, and contribute to content quality. All in real time! <br />
                </small>
            </div>

            <div className="footerTopRightCol">
                <Link href="/contact" rel="noopener noreferrer" className="footerContactUsBtn">
                    CONTACT US
                </Link>
                &nbsp;
                <Link href="/signin" rel="noopener noreferrer" className="footerSignInBtn">
                    SIGN IN
                </Link>
            </div>
        </section>

        <section className="footerBottomSection">
            <div className="footerBottomLeftCol">
                <Link
                    href="https://www.mekesiabrown.com"
                    rel="noopener noreferrer"
                >
                    <small>Developed by Gifted</small>
                </Link>
            </div>

            <div className="footerBottomRightCol">
                <Link
                    href="/about/gsn"
                    rel="noopener noreferrer"
                >
                    About GSN
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/about/gmp"
                    rel="noopener noreferrer"
                >
                    About GMP
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/blog"
                    rel="noopener noreferrer"
                >
                    Blog
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/contact"
                    rel="noopener noreferrer"
                >
                    Contact Us
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/about/ntks/faq"
                    rel="noopener noreferrer"
                >
                    FAQ
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/about/ntks/terms"
                    rel="noopener noreferrer"
                >
                    Terms
                </Link>
                &nbsp; - &nbsp;
                <Link
                    href="/about/ntks/disclaimer"
                    rel="noopener noreferrer"
                >
                    Disclaimer
                </Link>
            </div>
        </section>
    </footer>;
};
