import { NextResponse } from "next/server";
import { baseURL, gsnSignInCookie } from "@/app/lib/general_variables";

/**
 * TODO: Revisit
 *
 * Have to find the regex for the gsnSignInCookie cookie value
 */
export const config = {
	matcher: [
		{
			source: "['/_next', '/api/*']",
			has: [
				{ type: "header", key: "Authorization", value: "Bearer Token" },
			],
			missing: [{ type: "cookie", key: gsnSignInCookie, value: null }],
		},
	],
};

export default function middleware(request) {
	const pathname = request.nextUrl.pathname;

	if (["/manifest.json", "/favicon.ico"].includes(pathname)) return;

	return NextResponse.redirect(new URL("/", baseURL));
}
