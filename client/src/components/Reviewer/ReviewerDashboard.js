import ReviewerTopNavBar from './ReviewerTopNavBar';
import AllMediaProjects from "../General/AllMediaProjects/AllMediaProjects";
import { useAuth } from "../tools/user-context/UserGlobalContextProvider";

const ReviewerDashboard = () => {
    const { user } = useAuth();

    return (<>
        <ReviewerTopNavBar />
        <AllMediaProjects />
    </>);
};

export default ReviewerDashboard;
