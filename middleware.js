import { NextResponse } from "next/server";
import { baseURL } from "@/app/lib/general_variables";

/**
 * TODO: Revisit
 *
 * Have to find the regex for the gsnSignInCookie cookie value
 */
export const config = {
	matcher: [
		{
			source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
			has: [
				{ type: "header", key: "Authorization", value: "Bearer Token" },
			],
			missing: [{ type: "cookie", key: "gsn-sign-in-cookie", value: undefined }],
		},
	],
};

export default function middleware(request) {
	const gsnCookieValue = request.cookies.get('gsn-sign-in-cookie')?.value;
	const pathname = request.nextUrl.pathname;

	if (["/manifest.json", "/favicon.ico"].includes(pathname)) return;

	return NextResponse.redirect(new URL("/", baseURL));
}