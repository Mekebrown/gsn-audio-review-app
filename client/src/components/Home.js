import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./tools/helper_functions";
import UserSingleProject from "./User/UserSingleProject";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "./Home.css";
import classNames from "classnames/bind";

const Home = () => {
    const [inputUN, setInputUN] = useState(null);
    const [inputPW, setInputPW] = useState(null);
    const [userMsg, setUserMsg] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const {userId, setUserId} = useContext(UserContext);

    let cx = classNames.bind(styles);

    let loginFields = cx({ displayFlex: !isMobile });
    let unField = cx({ displayInline: !isMobile });
    let pwField = cx({ displayInline: !isMobile });
    let showAnimation = cx({mobileInvisible: isMobile, sect: true, animation: true});

    const isInputPresent = inputUN !== undefined && inputPW !== undefined
                            && inputUN !== 0 && inputPW !== 0 
                            && inputUN !== null && inputPW !== null
                            && inputUN !== "" && inputPW !== "";
    
    const regEx = /[<>\s;:.,\]+$*()#|\\%!@^{}?&"'[/()]/g;
    const isInputValid = !(inputUN?.match(regEx)) && !(inputPW?.match(regEx));

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isInputPresent && isInputValid) {
            const formData = new FormData();

            formData.append("username", inputUN);
            formData.append("password", inputPW);

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
                    setUserMsg("Unfortunately your information is not accepted. Please try again or contact the team");
                }
            })
            .catch(() => setUserMsg("Unfortunately your information is not accepted. Please try again or contact the team"));
        } else {
            setUserMsg("Please enter your information again.");
        }
    };

    useEffect(() => {
        setIsMobile(windowSize.width <= 900);
        
        function handleResize() {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    console.log(`${windowSize.width} and ${isMobile}`);

    return (<>
        {!userId ?  
            <main className="cont">
                <section className="sect">
                    <p>
                        <span className="yellow">Gifted Sounds</span> gives you instant access to the audio, video, images, ANY media you create, from the moment it’s ready for your eyes and ears. 
                    </p>
                    <small className="specialColoring">
                        Enter your given password to review your project...
                    </small>

                    <form onSubmit={handleSubmit}>
                        <p title="userMsg">{userMsg}</p>
                        <div className={loginFields}>
                            <input type="text" title="unField" className={unField} placeholder="&#xF007; &nbsp; Lance, gifted, etc." onChange={(e) => setInputUN(e.target.value)} minLength="3" maxLength="50" autoFocus required style={{fontFamily: "Arial, 'Font Awesome 5 Free'", padding: "10px"}} />

                            {' '} 

                            <input className={pwField} type="text" title="pwField" placeholder="&#xf044; &nbsp; Password" onChange={(e) => setInputPW(e.target.value)} minLength="8" maxLength="50" required style={{fontFamily: "Arial, 'Font Awesome 5 Free'", padding: "10px"}} />
                        </div>
                        <br /> 
                        <button title="submit" type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} />
                             {' '} 
                            Login
                        </button>
                    </form>
                </section>

                <section className={showAnimation}>
                    <div className="largePurple"></div>
                    <div className="largWhite"></div>
                    <div className="purpleCircle"></div>                   
                    <div className="purpleC2"></div>
                    <div className="yellowCircle"></div>                   
                    <div className="smallWhite"></div>
                    <div className="tinyWhite"></div>
                    
                    <svg className="playCircle" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" className="svg-inline--fa fa-circle-play playCircle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#c98f27" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path></svg>
                </section>
            </main>
            : 
            <UserSingleProject mediaId={1} />}
        </>
    );
};

export default Home;