import { signOut } from "next-auth/react";
import Router from "next/router";

export default function SignInOutBtn({ data }) {
    if (data && data.user) {
        return <>
            Signed in as {data.user.email} <br />
            <button 
                onClick={signOut}
                type="button"
            >
                    Sign out
            </button>
        </>;
    } else {
        return <button 
            onClick={() => { Router.push("/auth/signin"); }}
            type="button"
        >
            Sign in
        </button>;
    }
}
