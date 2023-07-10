import { signOut } from "next-auth/react";

export default function SignInOutBtn({data}) {
    const signInForm = () => {
        window.location.href = "/auth/signin";
        return null;
    };

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
            onClick={signInForm}
            type="button"
        >
            Sign in
        </button>;
    }
}
