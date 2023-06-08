import { useSession, signOut } from "next-auth/react";

export default function SignInOutBtn() {
    const signIn = () => {
        window.location.href = "/auth/signin";
    };

    const { data } = useSession();

    if (data) {
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
            onClick={signIn}
            type="button"
        >
            Sign in
        </button>;
    }
}
