export default function SignInOutBtn() {
    const signOut = () => {
        console.log("out"); 
    };

    const signIn = () => {
        window.location.href = "/auth/signin";
    };

    const session = false;

    if (session) {
        return <>
            Signed in as {session.user.email} <br />
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
