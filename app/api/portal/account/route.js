import { NextResponse } from "next/server";

import sql from "@/app/lib/db-related/db";
import handleErrors from "@/app/lib/error_handler";

/**
 * Handles GET requests to retrieve user information.
 *
 * @param {NextRequest} req - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("id");
		const requestType = searchParams.get("request_type");

		if (!requestType) {
			handleErrors(req, 400, "Request type is required", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "Request type is required" },
				{ status: 400 }
			);
		}

		let queryResult;

		if (requestType === "single") {
			if (!userId) {
				handleErrors(req, 400, "User ID is required for single user request", "@/app/api/portal/account/route.js");

				return NextResponse.json(
					{ error: "User ID is required for single user request" },
					{ status: 400 }
				);
			}

			queryResult = await sql`
        SELECT id, email, created_at, role
        FROM users
        WHERE id = ${parseInt(userId)}
      `;

			if (queryResult.length === 0) {
				handleErrors(queryResult, 404, "User not found", "@/app/api/portal/account/route.js");

				return NextResponse.json(
					{ error: "User not found" },
					{ status: 404 }
				);
			}
		} else if (requestType === "all") {
			queryResult = await sql`
        SELECT id, email, created_at, role
        FROM users
      `;

			if (queryResult.length === 0) {
				handleErrors(queryResult, 404, "No users found", "@/app/api/portal/account/route.js");

				return NextResponse.json(
					{ error: "No users found" },
					{ status: 404 }
				);
			}
		} else {
			handleErrors(req, 400, "Invalid request type", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "Invalid request type" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Success",
			data: queryResult,
		});
	} catch (error) {
		handleErrors(req, 500, error.message, "@/app/api/portal/account/route.js");

		console.error("Error processing GET request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles POST requests to create a new user.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(req) {
	try {
		const formData = await req.formData();
		const email = formData.get("email");
		const password = formData.get("pw");
		const clientName = formData.get("client_name");

		if (!email || !password || !clientName) {
			handleErrors(req, 400, "Email, password, and client name are required", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "Email, password, and client name are required" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to create a user
		return NextResponse.json({
			message: "User created successfully",
			data: { email, clientName },
		});
	} catch (error) {
		handleErrors(req, 500, error.message, "@/app/api/portal/account/route.js");

		console.error("Error processing POST request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles PUT requests to update user information.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function PUT(req) {
	try {
		const formData = await req.json();
		const userId = formData.user_id;
		const name = formData.name;
		const email = formData.email;

		if (!userId || !name || !email) {
			return NextResponse.json(
				{ error: "User ID, name, and email are required" },
				{ status: 400 }
			);
		}

		await sql`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE id = ${userId}
    `;

		return NextResponse.json({
			message: "User updated successfully",
			data: { userId },
		});
	} catch (error) {
		handleErrors(req, 500, error.message, "@/app/api/portal/account/route.js");

		console.error("Error processing PUT request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles DELETE requests to delete (hide) a user.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(req) {
	try {
		const formData = await req.formData();
		const userId = formData.get("user_id");

		if (!userId) {
			handleErrors(req, 400, "User ID is required", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to delete a user
		return NextResponse.json({
			message: "User deleted successfully",
			data: { userId },
		});
	} catch (error) {
		handleErrors(req, 500, error.message, "@/app/api/portal/account/route.js");

		console.error("Error processing DELETE request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
