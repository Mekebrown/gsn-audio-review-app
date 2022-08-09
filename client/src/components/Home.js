import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./tools/helper_functions";

const Home = () => {
    const [inputUN, setInputUN] = useState(null);
    const [inputPW, setInputPW] = useState(null);
    const [userMsg, setUserMsg] = useState(null);

    const {userId, setUserId} = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputUN !== undefined && inputPW !== undefined
            && inputUN !== 0 && inputPW !== 0 
            && inputUN !== null && inputPW !== null
            && inputUN !== "" && inputPW !== "") {
            const regEx = /[<>\s;:.,\]+$*()#|\\%!@^{}?&"'[/()]/g;
            const isInputValid = !inputUN.match(regEx) && !inputPW.match(regEx);

            const formData = new FormData();

            formData.append("username", inputUN);
            formData.append("password", inputPW);

            if (isInputValid) {
                axios.post("/api/home", formData)
                .then((res) => {
                    if (res.status === 200) {
                        const forwardLocation = res.data.loc;

                        setUserId(res.data.user_id);

                        setUserMsg("Log in accepted. Loading review section...");

                        let showMsg = setTimeout(() => {
                            setUserMsg(null);
                            window.location.href = forwardLocation;
                        }, 4000);

                        clearTimeout(showMsg);
                    } else {
                        setUserMsg("Unfortunately your information is not accepted. Please try again or contact the team")
                    }
                })
                .catch(() => setUserMsg("Unfortunately your information is not accepted. Please try again or contact the team"));
            } else {
                setUserMsg("Please enter your information again.");
            }
        } else {
            setUserMsg("Please enter your information again.");
        }

        console.log(userId);
        console.log('===================================');
    };

    return (<>
        {!userId ?  
            <main>
                <section>
                    <p>
                        <span>Gifted Sounds</span> gives you instant access to the audio, video, images, ANY media you create, from the moment it’s ready for your eyes and ears. 
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        {userMsg}
                        <br />
                        <label>
                            Your First Name: <input type="text" placeholder="Lance, gifted, etc." onChange={(e) => setInputUN(e.target.value)} minLength="8" maxLength="50" autoFocus required />
                        </label>

                        <br />

                        <label>
                            Given Passcode: <input type="text" placeholder="Secret" onChange={(e) => setInputPW(e.target.value)} minLength="8" maxLength="50" required />
                        </label>
                        <br /> 
                        <button type="submit">Enter</button>
                    </form>
                </section>

                <section>
                    <div>Animation goes here</div>
                </section>
            </main>
            : 
            <button onClick={() => setUserId(null)}>Log Out</button>}
        </>
    );
};

export default Home;