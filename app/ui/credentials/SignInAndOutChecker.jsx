'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

import { gsnSignInCookie, signInUsernameCookie, userIdCookie } from "@/app/lib/general_variables";

const SignInOutBtn = ({username}) => {
    const router = useRouter();

    const handleSignOut = () => {
        [gsnSignInCookie, signInUsernameCookie, userIdCookie].forEach(deleteCookie);

        router.refresh(); // or router.push('/signin');?
    };

    if (username !== undefined) {
        return <span aria-label="User is signed in">
            Welcome, 
            <Link href={"/account"} className="marginLeftSpacer">
                {username}
            </Link>

            &nbsp;| &nbsp;

            <button
                type="button"
                title="Sign Out"
                onClick={handleSignOut}
                className="marginLeftSpacer"
            >
                Sign Out
            </button>
        </span>;
    } else {
        return <button
            aria-label="User is not signed in"
            type="button"
            title="Sign In"
            onClick={() => router.push('/signin')}
            className="marginLeftSpacer"
        >
            Sign In
        </button>;
    }
};

export default function SignInAndOutChecker({userData}) {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            try {
                if (getCookie(gsnSignInCookie) !== String(userData?.user?.isLoggedIn)) {
                    setCookie(gsnSignInCookie, userData?.user?.isLoggedIn);
                }
                if (getCookie(signInUsernameCookie) !== userData?.user?.name) {
                    setCookie(signInUsernameCookie, userData?.user?.name);
                }
                if (getCookie(userIdCookie) !== userData?.user?.id) {
                    setCookie(userIdCookie, userData?.user?.id);
                }

                if (isMounted) {
                    setUsername(userData?.user?.name || null);
                    
                    setError(null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);

                if (isMounted) {
                    setUsername(null);
                    setError("Could not fetch user data.");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchUserData();

        return () => { isMounted = false; };
    }, []);

    if (loading) return <span aria-label="Loading user data">Loading...</span>;
    if (error) return <span aria-label="Error retrieving user data">{error}</span>;

    return <SignInOutBtn username={username}/>;
};
