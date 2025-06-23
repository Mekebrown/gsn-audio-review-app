'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { gsnSignInCookie, userIdCookie } from "@/app/lib/general_variables";

const SignInOutBtn = ({username}) => {
    const [userNameInfo, setUserNameInfo] = useState(username);
    const router = useRouter();

    const handleSignOut = () => {
        [gsnSignInCookie, userIdCookie].forEach(deleteCookie);
        
        setUserNameInfo(undefined);
        
        router.refresh();
    };

    if (userNameInfo !== undefined) {
        return <span aria-label="User is signed in">
            Welcome,&nbsp;
            <Link href={"/account"} className="marginLeftSpacer">
                {userNameInfo}
            </Link>

            &nbsp;| &nbsp;
            {/* /signout - redirect to / */}
            <button
                type="button"
                title="Sign Out"
                onClick={handleSignOut}
                className="signInOutButton marginLeftSpacer"
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
    const [username, setUsername] = useState(userData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchUserData = async () => {
            try {
                if (isMounted) {
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
