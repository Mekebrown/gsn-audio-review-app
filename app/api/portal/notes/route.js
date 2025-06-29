import { NextResponse } from "next/server";

import StrapiHandler from "@/app/lib/strapiclient_handler";
import handleErrors from "@/app/lib/error_handler";

const notesData = StrapiHandler.collection("notes");

/**
 * Handles GET requests to retrieve notes.
 *
 * @param {NextRequest} request - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
	try {
		const formData = await request.formData();
		const requestType = formData.get("request_type");

		if (!requestType) {
			return NextResponse.json(
				{ message: "No request type provided" },
				{ status: 400 }
			);
		}

		if (requestType === "single") {
			const noteId = formData.get("noteId");

			if (!noteId) {
				return NextResponse.json(
					{ message: "No note ID provided" },
					{ status: 400 }
				);
			}

			const note = await notesData.findOne(noteId);

			if (!note) {
				return NextResponse.json(
					{ message: "Note not found" },
					{ status: 404 }
				);
			}

			// Query to fetch single note info (replace with actual logic)
			return NextResponse.json(
				{
					message: "Success",
					data: note,
				},
				{ status: 200 }
			);
		} else if (requestType === "all") {
			const note = await notesData.find();

			if (!note || note.length === 0) {
				return NextResponse.json(
					{ message: "No notes found" },
					{ status: 404 }
				);
			}

			return NextResponse.json(
				{
					message: "Success",
					data: note
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ message: "Invalid request type" },
				{ status: 400 }
			);
		}
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/notes/route.js");

		console.error("Error processing GET request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles POST requests to create a new note.
 * Once the note is created, it returns the note id which is
 * sent on to the media document it's associated with.
 *
 * @param {NextRequest} request - The incoming request object
 * that has the media id, the user id, and the note data.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function POST(request) {
	try {
		const formData = await request.formData();

		// Logic that creates a note
		const mediaId = formData.get("mediaId");
		const mediaNotesArray = formData.get("mediaNotesArray");
		const userId = formData.get("userId");
		const noteContent = formData.get("noteContent");

		if (!mediaId || !userId || !noteContent) {
			return NextResponse.json(
				{ message: "Missing required fields: mediaId, userId, or noteContent" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to create a note
		// For example, you might call a Strapi API to create the note
		const newNote = await notesData.create({
			mediaId,
			userId,
			content: noteContent,
		});

		if (!newNote) {
			return NextResponse.json(
				{ message: "Failed to create note" },
				{ status: 500 }
			);
		}

		// Assuming newNote contains the created note information
		// You can return the note ID or any other relevant information
		// For example, if newNote has an id property:
		const noteId = newNote.id;

		if (!noteId) {
			return NextResponse.json(
				{ message: "Note ID not found in the created note" },
				{ status: 500 }
			);
		}

		// Adding to the media document's notes array the newly created note id
		const mediaNotes = JSON.parse(mediaNotesArray || "[]");

		mediaNotes.push(noteId);

		const result = await notesData.update(mediaId, { mediaNotesArray: mediaNotes });

		if (!result) {
			return NextResponse.json(
				{ message: "Failed to update media with new note ID" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			message: "Success",
			data: { msg: `Here is the new note id: ${noteId}` },
		});
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/notes/route.js");

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
 * 
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request) {
	try {
		// Use the Strapi SDK to update the note by its id
		const formData = await request.formData();
		const noteContent = formData.get("noteContent");
		const noteId = formData.get("noteId");

		if (!noteId) {
			return NextResponse.json(
				{ message: "No note ID provided" },
				{ status: 400 }
			);
		}

		if (!noteContent) {
			return NextResponse.json(
				{ message: "Content not received properly" },
				{ status: 400 }
			);
		}

		const updatedNote = await notesData.update({
			mediaId,
			userId,
			content: noteContent,
		});

		if (!updatedNote) {
			return NextResponse.json(
				{ message: "Failed to update note" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			message: "Success",
			data: { msg: `Here is the updated note information for note ID: ${noteId}` },
		});
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/notes/route.js");

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
 * 
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request) {
	try {
		const formData = await request.formData();
		const noteId = formData.get("noteId");

		if (!noteId) {
			return NextResponse.json(
				{ message: "No note ID provided" },
				{ status: 400 }
			);
		}

		// Logic to delete the note
		const deletedNote = await notesData.update(noteId, { deleted: true });

		if (!deletedNote) {
			return NextResponse.json(
				{ message: "Failed to delete note" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			message: "Success",
			data: { msg: `Note ID ${noteId} was successfully deleted.` },
		});
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/notes/route.js");

		console.error("Error processing DELETE request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
