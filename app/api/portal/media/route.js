import { NextResponse } from "next/server";

import StrapiHandler from "@/app/lib/strapiclient_handler";
import handleErrors from "@/app/lib/error_handler";

const mediaData = StrapiHandler.collection("media");

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
		const description = formData.get("description");
		const thumbnail_url = formData.get("thumbnail_url");
		const thumbnail_file = formData.get("thumbnail_file");
		const hasMediaMarkers = formData.get("has_media_markers");
		const mediaId = formData.get("media_id");
		let result;

		if (!title || !fileUpload || !fileName || !mediaType) {
			return NextResponse.json(
				{ message: "Missing required fields" },
				{ status: 400 }
			);
		} else if (action === "update" && mediaId === null) {
			return NextResponse.json(
				{ message: "Media ID is required for update" },
				{ status: 400 }
			);
		}

		const mediaDataObj = {
			title,
			file_upload: fileUpload,
			file_name: fileName,
			media_type: mediaType,
			description,
			thumbnail_file,
			thumbnail_url,
			has_media_markers: hasMediaMarkers === "true",
		};

		if (action === "create") {
			result = await mediaData.create(mediaDataObj);
		} else if (action === "update") {
			result = await mediaData.update(mediaId, mediaDataObj);
		} else {
			return NextResponse.json(
				{ message: "Invalid action" },
				{ status: 400 }
			);
		}

		if (!result) {
			return NextResponse.json(
				{ message: `Failed to ${action} media` },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ message: `Media ${action}d successfully` },
			{ status: 200 }
		);
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/media/route.js");

		console.error(`Error processing ${action} request:`, error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Handles GET requests to retrieve either
 * all media entries or a single media entry.
 * 
 * @param {NextRequest} request - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const mediaId = searchParams.get("media_id");
		const mediaType = searchParams.get("media_type");
		const query = {};

		if (mediaId) {
			if (isNaN(mediaId)) {
				handleErrors(request, 400, "Invalid media ID", "@/app/api/portal/media/route.js");
				return NextResponse.json(
					{ error: "Invalid media ID" },
					{ status: 400 }
				);
			}
			query.id = mediaId;
		} else if (mediaType) {
			query.media_type = mediaType;
		}

		const mediaEntries = await mediaData.find(query);

		if (!mediaEntries || mediaEntries.length === 0) {
			handleErrors(request, 404, "Media not found", "@/app/api/portal/media/route.js");
			return NextResponse.json(
				{ error: "Media not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "Media entries retrieved successfully",
			data: mediaEntries,
		});
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/media/route.js");
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

		const deleteResult = await mediaData.update(mediaId, {
			deleted: true,
		});

		if (!deleteResult) {
			return NextResponse.json(
				{ message: "Media not found or already deleted" },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{ message: "Media is deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		handleErrors(request, 500, error.message, "@/app/api/portal/media/route.js");

		console.error("Error processing DELETE request:", error);

		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
