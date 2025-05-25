"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';

import { baseURL, GSNLogo, tempImage, gsnSignInCookie, userId } from "@/app/lib/general_variables";

import "@/styles/navigation/topnav.css";

export default function Home() {
  try {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [userName, setUserName] = useState("Meke");//useState("");

    // try {
    //   useEffect(() => {
    //     const token = getCookie(gsnSignInCookie);
    //     const userIdentifier = getCookie(userId) ? getCookie(userId) : "1";
    //     const fetchUserData = async () => {
    //       try {
    //         const response = await axios.get(`/api/signin?user_id=${userIdentifier}&request_type=single`, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           }
    //         });
    //         const data = response.data;

    //         setIsLoggedIn(data?.user?.isLoggedIn);
    //         setUserName(data?.user?.name);
    //       } catch (error) {
    //         console.error("Error fetching user data:", error);
    //       }
    //     }
    //     fetchUserData();
    //   }, []);
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // }

    return (<>
        <header>
          <nav>
            <menu className="topNav">
              <div className="topNavSection">
                <Link href={baseURL}>
                  <GSNLogo />
                  <span className="topNavLeftGSNText">Gifted Sounds Network</span>
                </Link>
              </div>

              <div className="topNavSection"></div>

              <div className="topNavSection rightLinks">
                <Link href={baseURL + "/about"}>About</Link> &nbsp;
                <Link href={baseURL + "/about/ntks/pricing"}>Pricing</Link> &nbsp;
                <Link href={baseURL + "/contact"}>Contact</Link> &nbsp;| &nbsp;

                {isLoggedIn ? (
                  <>
                    <span className="userName">Welcome, "userName"</span> &nbsp;| &nbsp;
                    <Link href={baseURL + "/dashboard"} className="marginLeftSpacer">
                      Dashboard
                    </Link>
                    &nbsp;| &nbsp;
                    <Link href={baseURL + "/logout"} className="marginLeftSpacer">
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link href={baseURL + "/signin"} className="marginLeftSpacer">
                    Sign In
                  </Link>
                )}
              </div>
            </menu>
          </nav>
        </header>

        <section>
          <div className="twoCols">
            <section style={{ paddingTop: "10%", flex: "1", textAlign: "left" }}>
              <h1>Entertaining Others the Way YOU Want</h1>
              <p style={{ width: "50%", marginTop: "5%", marginBottom: "5%" }}>
                The Gifted Sounds Network&lsquo;s Audio Review App is a straightforward audio player and notes taker that lets you give real-time feedback on your recordings. <br />
                <br />
                Since you&lsquo;re the primary visionary, we do as you say.
              </p>
            </section>

            <section style={{ flex: "1" }}>
              <Image src={tempImage} alt="Right-hand image" width="400" height="400" />
            </section>
          </div>
        </section>
      </>);
    } catch (error: any) {
      throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
    }
};
