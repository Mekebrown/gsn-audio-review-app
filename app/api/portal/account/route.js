import { NextRequest, NextResponse } from "next/server";
import sql from "@/app/lib/db-related/db";

/**
 * Get a user
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function GET(request) {
	try {
		const all_or_single_user =
			request.nextUrl.searchParams.get("request_type");
		let select_all_user_query;

		if (all_or_single_user === "single") {
			// Query to grab that user's info
			const single_user = request.nextUrl.searchParams.get("user_id");

			select_all_user_query = await sql`
                SELECT 
                    id, email, created_at, role
                FROM 
                    users
                WHERE
                    id = ${parseInt(single_user)}
            `;
		} else if (all_or_single_user === "all") {
			// Query to grab all user info
			select_all_user_query = await sql`
                SELECT 
                    id, email, created_at, role
                FROM 
                    users
            `;
		}

		if (select_all_user_query.ok) {
			return NextResponse.json({
				message: "Success",
				data: {
					all_or_single_user,
					select_all_user_query,
				},
			});
		} else {
			return NextResponse.json({
				message: "Request did not work",
				status: 403,
			});
		}
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}

/**
 * Create a user by sending a UN/PW
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function POST(request) {
	try {
		const formData = await request.formData();

		if (formData) {
			const pw = formData.get("pw");
			const email = formData.get("email");
			const media = formData.get("media");
			const client_name = formData.get("client_name");

			return NextResponse.json({
				message: "Success",
				data: {
					pw,
					email,
					media,
					client_name,
				},
			});
		} else {
			return NextResponse.json(
				{
					message: "No form data found",
				},
				{ status: 403 }
			);
		}
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}

/**
 * Change/update a user
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function PUT(request) {
	try {
		const formData = await request.formData();

		if (formData) {
			const user_id = formData.get("user_id");

			return NextResponse.json({
				message: "Success",
				data: { user_id },
			});
		} else {
			return NextResponse.json(
				{
					message: "No form data found",
				},
				{ status: 403 }
			);
		}
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}

/**
 * Delete (hide) a user
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function DELETE(request) {
	try {
		const formData = await request.formData();

		if (formData) {
			const user_id = formData.get("user_id");

			return NextResponse.json({
				message: "Success",
				data: { user_id },
			});
		} else {
			return NextResponse.json(
				{
					message: "No form data found",
				},
				{ status: 403 }
			);
		}
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{
				message: "Internal Server Error",
			},
			{ status: 500 }
		);
	}
}
