import AdminTopNavBar from './AdminTopNavBar';
import AllMediaProjects from "../General/AllMediaProjects/AllMediaProjects";
import { useAuth } from "../tools/user-context/UserGlobalContextProvider";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (<>
        <AdminTopNavBar />
        <AllMediaProjects />
    </>);
};

export default AdminDashboard;
