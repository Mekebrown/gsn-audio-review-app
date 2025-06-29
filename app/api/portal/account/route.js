import { NextResponse } from "next/server";

import StrapiHandler from "@/app/lib/strapiclient_handler";
import handleErrors from "@/app/lib/error_handler";

const usersData = StrapiHandler.collection("users");

/**
 * Handles GET requests to retrieve either
 * all users or a single user.
 *
 * @param {NextRequest} req - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("user_id");

		if (!userId || isNaN(userId)) {
			handleErrors(req, 400, "No query parameters provided", "@/app/api/portal/account/route.js");
			return NextResponse.json(
				{ error: "No query parameters provided" },
				{ status: 400 }
			);
		}

		const users = await usersData.find(userId);

		if (!users || users.length === 0) {
			handleErrors(req, 404, "User not found", "@/app/api/portal/account/route.js");
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "User(s) retrieved successfully",
			data: users,
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
 * 
 * @returns {NextResponse} - The response object.
 */
export async function POST(req) {
	try {
		const formData = await req.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		const clientName = formData.get("client_name");

		if (!email || !password || !clientName) {
			handleErrors(req, 400, "Email, password, and client name are required", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "Email, password, and client name are required" },
				{ status: 400 }
			);
		}

		const existingUser = await usersData.findOne({ email });

		if (existingUser) {
			handleErrors(req, 409, "User already exists", "@/app/api/portal/account/route.js");
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 409 }
			);
		}

		const newUser = await usersData.create({
			email,
			password,
			client_name: clientName,
			// Add other necessary fields here
		});

		if (!newUser) {
			handleErrors(req, 500, "Failed to create user", "@/app/api/portal/account/route.js");
			return NextResponse.json(
				{ error: "Failed to create user" },
				{ status: 500 }
			);
		}

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

		const user = await usersData.findOne(userId);

		if (!user) {
			handleErrors(req, 404, "User not found", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

		const updatedUser = await usersData.update(userId, {
			name,
			email,
			// Add other fields to update as necessary
		});

		if (!updatedUser) {
			handleErrors(req, 500, "Failed to update user", "@/app/api/portal/account/route.js");
			return NextResponse.json(
				{ error: "Failed to update user" },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: "User updated successfully" },
			{ status: 200 }
		);
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

		if (!userId || isNaN(userId)) {
			handleErrors(req, 400, "User ID is required", "@/app/api/portal/account/route.js");

			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const deleteResult = await usersData.update(userId, {
			deleted: true,
		});

		if (!deleteResult) {
			handleErrors(req, 404, "User not found");

			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 }
			);
		}

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
