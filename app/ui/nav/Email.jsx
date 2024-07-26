export default function Email() {
    const user = {
        email: "kewl@fee.net"
    };

    return <span className="email">
        {user.email}
    </span>;
};
