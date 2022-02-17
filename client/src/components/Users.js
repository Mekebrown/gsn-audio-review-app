import React, {useState, useEffect} from "react";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users/').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonRes => {
            setUsers(jsonRes.usersList);
        });
    }, [setUsers]);

    return (
        <div>
            {users.map(user => <li key={user}>{user}</li>)}
        </div>
    )
}; 

export default Users;
