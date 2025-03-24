import { NextResponse } from "next/server";
import sql from "@/app/lib/db-related/db";

/**
 * Handles GET requests to retrieve media information.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
	try {
		const requestType = request.nextUrl.searchParams.get("request_type");
		const mediaId = request.nextUrl.searchParams.get("media_id");

		if (!requestType) {
			return NextResponse.json(
				{ message: "No request type provided" },
				{ status: 400 }
			);
		}

		let queryResult;

		if (requestType === "single") {
			if (!mediaId) {
				return NextResponse.json(
					{ message: "No media ID provided" },
					{ status: 400 }
				);
			}

			// Query to fetch single media info
			queryResult = await sql`
        SELECT 
          med.id, med.media_file_name, med.media_file_ext,
          med.media_description, med.thumb_url, med.created_at,
          n.user_id, n.note_body, n.note_datetime, n.created_at
        FROM 
          media med
        JOIN
          notes n
        ON
          n.media_id = med.id
        WHERE 
          med.id = ${parseInt(mediaId)}
      `;
		} else if (requestType === "all") {
			// Query to fetch all media info
			queryResult = await sql`
        SELECT 
          med.id, med.media_file_name, med.media_file_ext,
          med.media_description, med.thumb_url, med.created_at,
          n.user_id, n.note_body, n.note_datetime, n.created_at
        FROM 
          media med
        JOIN
          notes n
        ON
          n.media_id = med.id
      `;
		} else {
			return NextResponse.json(
				{ message: "Invalid request type" },
				{ status: 400 }
			);
		}

		return NextResponse.json({
			message: "Success",
			data: queryResult,
		});
	} catch (error) {
		console.error("Error processing GET request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles POST requests to create a new media entry.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request) {
	return handleFormRequest(request, "create");
}

/**
 * Handles PUT requests to update an existing media entry.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request) {
	return handleFormRequest(request, "update");
}

/**
 * Handles DELETE requests to delete (hide) a media entry.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request) {
	try {
		const mediaId = request.nextUrl.searchParams.get("media_id");

		if (!mediaId) {
			return NextResponse.json(
				{ message: "No media ID provided" },
				{ status: 400 }
			);
		}

		// Replace with actual logic to delete media
		return NextResponse.json({
			message: "Success",
			data: `The media ID ${mediaId} was successfully deleted.`,
		});
	} catch (error) {
		console.error("Error processing DELETE request:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles form-based requests for creating or updating media entries.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {string} action - The action to perform ("create" or "update").
 * @returns {NextResponse} - The response object.
 */
async function handleFormRequest(request, action) {
	try {
		const formData = await request.formData();

		if (!formData) {
			return NextResponse.json(
				{ message: "No form data found" },
				{ status: 400 }
			);
		}

		const title = formData.get("title");
		const fileUpload = formData.get("file_upload");
		const fileName = formData.get("file_name");
		const mediaType = formData.get("media_type");
		const mediaDesc = formData.get("media_desc");
		const thumbUrl = formData.get("thumb_url");
		const thumbUpload = formData.get("thumb_upload");
		const hasMediaMarkers = formData.get("has_media_markers");

		// Replace with actual logic to create or update media
		return NextResponse.json({
			message: `Media ${action}d successfully`,
			data: {
				title,
				fileUpload,
				fileName,
				mediaType,
				mediaDesc,
				thumbUrl,
				thumbUpload,
				hasMediaMarkers,
			},
		});
	} catch (error) {
		console.error(`Error processing ${action} request:`, error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
