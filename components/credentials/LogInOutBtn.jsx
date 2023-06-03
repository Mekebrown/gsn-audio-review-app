import { useSession, signOut } from "next-auth/react";

export default function LogInOutBtn() {
    const { data: session } = useSession();

    const Login = () => {
        window.location.href = "/auth/login";
    };

    if (session) {
        return <>
            Signed in as {session.user.email} <br />
            <button 
                onClick={() => signOut()}
                type="button"
            >
                    Sign out
            </button>
        </>;
    } else {
        return <button 
            onClick={Login}
            type="button"
        >
            Sign in
        </button>;
    }
}
