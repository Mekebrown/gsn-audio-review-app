import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./tools/helper_functions";
import styles from "./Home.css";
import classNames from 'classnames/bind';

const Home = () => {
    const [inputUN, setInputUN] = useState(null);
    const [inputPW, setInputPW] = useState(null);
    const [userMsg, setUserMsg] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const {userId, setUserId} = useContext(UserContext);

    let cx = classNames.bind(styles);

    let unField = cx({ 
      displayInline: !isMobile
    });

    let pwField = cx({ 
        displayInline: !isMobile 
    });

    let loginFieldDivs = cx({ 
        displayFlex: !isMobile 
    });

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
            <main className="cont">
                <section className="sect">
                    <p>
                        <span>Gifted Sounds</span> gives you instant access to the audio, video, images, ANY media you create, from the moment it’s ready for your eyes and ears. 
                    </p>
                    <small>
                        Enter your given password to review your project...
                    </small>

                    <form onSubmit={handleSubmit}>
                        {userMsg}
                        <br />
                        <div className={loginFieldDivs}>
                            <label className={unField}>
                                Your First Name: 
                                <br />
                                <input type="text" placeholder="Lance, gifted, etc." onChange={(e) => setInputUN(e.target.value)} minLength="8" maxLength="50" autoFocus required />
                            </label>

                            <label className={pwField}>
                                Given Password: 
                                <br />
                                <input type="text" placeholder="Password" onChange={(e) => setInputPW(e.target.value)} minLength="8" maxLength="50" required />
                            </label>
                        </div>
                        <br /> 
                        <button type="submit">Login</button>
                    </form>
                </section>

                <section className="sect animation">
                    <div>Animation goes here</div>
                </section>
            </main>
            : 
            <button onClick={() => setUserId(null)}>Log Out</button>}
        </>
    );
};

export default Home;