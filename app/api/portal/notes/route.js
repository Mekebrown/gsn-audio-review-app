import { NextResponse } from "next/server";

/**
 * Handles GET requests to retrieve notes.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
	try {
		const requestType = request.nextUrl.searchParams.get("request_type");

		if (!requestType) {
			return NextResponse.json(
				{ message: "No request type provided" },
				{ status: 400 }
			);
		}

		if (requestType === "single") {
			const noteId = request.nextUrl.searchParams.get("note_id");

			if (!noteId) {
				return NextResponse.json(
					{ message: "No note ID provided" },
					{ status: 400 }
				);
			}

			// Query to fetch single note info (replace with actual logic)
			return NextResponse.json({
				message: "Success",
				data: { msg: `Here is the note information for note ID: ${noteId}` },
			});
		} else if (requestType === "all") {
			// Query to fetch all notes info (replace with actual logic)
			return NextResponse.json({
				message: "Success",
				data: { msg: "Here are all the notes." },
			});
		} else {
			return NextResponse.json(
				{ message: "Invalid request type" },
				{ status: 400 }
			);
		}
	} catch (error) {
		console.error("Error processing GET request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles POST requests to create a new note.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request) {
	try {
		const formData = await request.formData();

		// Replace with actual logic to create a note
		return NextResponse.json({
			message: "Success",
			data: { msg: `Here is the new note information: ${formData}` },
		});
	} catch (error) {
		console.error("Error processing POST request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles PUT requests to update a note.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request) {
	try {
		const noteId = request.nextUrl.searchParams.get("note_id");

		if (!noteId) {
			return NextResponse.json(
				{ message: "No note ID provided" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to update a note
		return NextResponse.json({
			message: "Success",
			data: { msg: `Here is the updated note information for note ID: ${noteId}` },
		});
	} catch (error) {
		console.error("Error processing PUT request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles DELETE requests to delete (hide) a note.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request) {
	try {
		const noteId = request.nextUrl.searchParams.get("note_id");

		if (!noteId) {
			return NextResponse.json(
				{ message: "No note ID provided" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to delete a note
		return NextResponse.json({
			message: "Success",
			data: { msg: `Note ID ${noteId} was successfully deleted.` },
		});
	} catch (error) {
		console.error("Error processing DELETE request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
