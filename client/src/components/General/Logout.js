import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../tools/user-context/UserGlobalContextProvider';

const Logout = () => {
    const { setUser } = useAuth();

    const navigate = useNavigate();

    axios.get("/api/logout")
        .then((res) => {
            if (res.status === 200) {
                setUser({});

                navigate('/login');
            } else {
                throw new Error();
            }
        })
        .catch((error) => { console.error(`Couldn't log out: ${error}`); });
};

export default Logout;
