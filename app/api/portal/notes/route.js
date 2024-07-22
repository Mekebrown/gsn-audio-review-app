import { NextRequest, NextResponse } from "next/server";
import sql from "@/app/lib/db-related/db";

/**
 * Get a note
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function GET(request) {
	try {
		const all_or_single_note =
			request.nextUrl.searchParams.get("request_type");

		if (all_or_single_note === "single") {
			const single_note = request.nextUrl.searchParams.get("note_id");

			// Query to grab that note's info
		} else if (all_or_single_note === "all") {
			// Query to grab all note info
		}

		return NextResponse.json({
			message: "Success",
			data: {
				msg:
					"Here are the notes for request type " + all_or_single_note,
			},
		});
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Create a note
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function POST(request) {
	try {
		const formData = await request.formData();

		return NextResponse.json({
			message: "Success",
			data: {
				msg: "Here is the new note information: " + formData,
			},
		});
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Change/update a note
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function PUT(request) {
	try {
		const note_id = request.nextUrl.searchParams.get("note_id");

		return NextResponse.json({
			message: "Success",
			data: {
				msg:
					"Here is the updated note information for note id: " +
					note_id,
			},
		});
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Delete (hide) a note
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function DELETE(request) {
	try {
		const note_id = request.nextUrl.searchParams.get("note_id");

		return NextResponse.json({
			message: "Success",
			data: {
				msg: "Note id " + note_id + " was successfully deleted",
			},
		});
	} catch (error) {
		console.error("Error processing form:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
