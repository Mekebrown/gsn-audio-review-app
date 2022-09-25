import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import { useAuth } from '../../tools/user-context/UserGlobalContextProvider';
import { indexPath } from '../../tools/vars';
import logo from "../../tools/logo.png";
import styles from "./Login.css";

const Login = () => {
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const [inputUN, setInputUN] = useState(null);
    const [inputPW, setInputPW] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    let isUserSet = user !== undefined;

    let cx = classNames.bind(styles);

    let loginFields = cx({ displayFlex: !isMobile });
    let unField = cx({ displayInline: !isMobile });
    let pwField = cx({ displayInline: !isMobile });
    let topBarMenu = cx({ loggedIn: isUserSet, loggedOut: !isUserSet });
    let topBarLogo = cx({ topBarSections: isUserSet });
    let imgMiddleAlign = cx({ imgMiddleAlign: true });
    let showAnimation = cx({ mobileInvisible: isMobile, sect: true, animation: true });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Not saved in state to add alert role when relevant
        let userMsg = document.getElementById("userMsg");
        userMsg.setAttribute("role", "alert");

        const formData = new FormData();

        formData.append("username", inputUN);
        formData.append("password", inputPW);

        await axios.post("/api/login", formData, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then((res) => {
                if (res.status !== 200) {
                    userMsg.textContent = "Unfortunately your information is not accepted. Please try again or contact the team";

                    // eslint-disable-next-line no-throw-literal
                    throw "Not logged in";
                } else {
                    userMsg.textContent = "Log in accepted. Loading review section...";

                    setUser(res.data.user);

                    navigate('/');
                }
            })
            .catch(() => userMsg.textContent = "Unfortunately your information is not accepted. Please try again or contact the team");
    };

    useEffect(() => {
        // setIsMobile(windowSize.width <= 900);

        // function handleResize() {
        //     setWindowSize({
        //       width: window.innerWidth,
        //       height: window.innerHeight,
        //     });
        // }

        // window.addEventListener("resize", handleResize);

        // handleResize();

        // return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (<>
        <header>
            <nav>
                <menu className={topBarMenu}>
                    <section className={topBarLogo}>
                        <Link to={indexPath} className={topBarLogo}>
                            <img src={logo} className={imgMiddleAlign} alt="Gifted Sounds Network logo" />
                            {' '}
                            <span>GIFTED SOUNDS</span>
                        </Link>
                    </section>
                </menu>
            </nav>
        </header>

        <main className="cont">
            <section className="sect" aria-labelledby="log-in">
                <p>
                    <span className="yellow">Gifted Sounds</span> gives you instant access to the audio, video, images, ANY media you create, from the moment it’s ready for your eyes and ears.
                </p>
                <small className="specialColoring">
                    Enter your given password to review your project...
                </small>

                <form id="log-in" onSubmit={handleSubmit}>
                    <p title="userMsg" id="userMsg"></p>
                    admin@email.enter aLotmosdef-behemoth-souls
                    <div className={loginFields}>
                        <input
                            type="text"
                            title="unField"
                            className={unField}
                            placeholder="&#xF007; &nbsp; Lance, gifted, etc."
                            onChange={(e) => setInputUN(e.target.value)}
                            minLength="3"
                            maxLength="50"
                            autoFocus
                            required
                            style={{ fontFamily: "Arial, 'Font Awesome 5 Free'", padding: "10px" }} />

                        {' '}

                        <input
                            className={pwField}
                            type="text"
                            title="pwField"
                            placeholder="&#xf044; &nbsp; Password"
                            onChange={(e) => setInputPW(e.target.value)}
                            minLength="8"
                            maxLength="50"
                            required
                            style={{ fontFamily: "Arial, 'Font Awesome 5 Free'", padding: "10px" }} />
                    </div>
                    <br />
                    <button title="submit" type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                        {' '}
                        Login
                    </button>
                </form>
            </section>

            {/* <section className={showAnimation}>
                <div className="largePurple"></div>
                <div className="largWhite"></div>
                <div className="purpleCircle"></div>
                <div className="purpleC2"></div>
                <div className="yellowCircle"></div>
                <div className="smallWhite"></div>
                <div className="tinyWhite"></div>

                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-play" className="svg-inline--fa fa-circle-play playCircle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#c98f27" d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"></path></svg>
            </section> */}
        </main>
    </>);
};

export default Login;
