"use client";

import { useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";

import { baseURL, gsnVisitedSiteCookie, gsnDisclaimerChoice, gsnSignInCookie } from "@/app/lib/general_variables";

export default function CookieHandler() {
  useEffect(() => {
    if (!getCookie("gsnVisitedSiteCookie")) {
      setCookie("gsnVisitedSiteCookie", true);
    }

    if (!getCookie("gsnDisclaimerChoice")) {
      setCookie("gsnDisclaimerChoice", true);
    }

    if (!getCookie("gsnSignInCookie")) {
      setCookie("gsnSignInCookie", "sign-in-cookie");
    }
  }, []);

  return null;
}
