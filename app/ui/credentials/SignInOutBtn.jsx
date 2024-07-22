'use client';

import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

export default function SignInOutBtn() {
    const { data, status } = { data: "user", status: "authenticated" }; 
    const router = useRouter();

    if (data && data.user !== undefined) {
        return <>
            <p>Signed in as {data.user}</p>

            <button
                type="button"
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
