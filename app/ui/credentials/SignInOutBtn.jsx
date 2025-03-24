'use client';

import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
// import { useSession } from 'next-auth/react';

export default function SignInOutBtn() {
    const { data } = { data: "user", status: "authenticated" }; //Temporary
    const router = useRouter();

    const handleSignOut = () => {
        deleteCookie("gsn-sign-in-cookie");
    };

    if (data && data.user !== undefined) {
        return <>
            <p>Signed in as {data.user}</p>

            <button
                type="button"
                onclick={handleSignOut}
            >
                Sign Out
            </button>
        </>;
    } else {
        return <button
            onClick={() => router.push('/signin')}
            type="button"
        >
            Sign In
        </button>;
    }
};
