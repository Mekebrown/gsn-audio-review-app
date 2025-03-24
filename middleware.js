import { NextResponse } from "next/server";
import { baseURL } from "@/app/lib/general_variables";

/**
 * TODO: Revisit
 *
 * Have to find the regex for the gsnSignInCookie cookie value
 */
export const config = {
	matcher: ['/((?!_next|api/auth|favicon.ico).*)'],
};

export default function middleware(request) {
	// const gsnCookieValue = request.cookies.get('gsn-sign-in-cookie')?.value;
	const pathname = request.nextUrl.pathname;

	if (["/manifest.json", "/favicon.ico"].includes(pathname)) return;

	return NextResponse.redirect(new URL("/", baseURL));
}