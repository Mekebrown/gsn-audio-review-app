import { NextRequest, NextResponse } from "next/server";
import sql from "@/app/lib/db-related/db";

/**
 * Get a single track or all media
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function GET(request) {
	try {
		const all_or_single_media =
			request.nextUrl.searchParams.get("request_type");
		let select_all_media_query;

		if (all_or_single_media === "single") {
			// Query to grab that media's info
			const single_media = request.nextUrl.searchParams.get("media_id");

			select_all_media_query = await sql`
                SELECT 
                    med.id, med.media_file_name, 
                    med.media_file_ext,
                    med.media_description, 
                    med.thumb_url, med.created_at,
                    n.user_id, n.note_body, n.note_timestamp,
                    n.created_at
                FROM 
                    media med
                JOIN
                    notes n
                ON
                    n.media_id = med.id
                AND 
                    med.id = ${parseInt(single_media)}
            `;

			// Get a track's' notes
		} else if (all_or_single_media === "all") {
			// Get all tracks (with a count of each track's notes)
			select_all_media_query = await sql`
                SELECT 
                    med.id, med.media_file_name, 
                    med.media_file_ext,
                    med.media_description, 
                    med.thumb_url, med.created_at,
                    n.user_id, n.note_body, n.note_timestamp,
                    n.created_at
                FROM 
                    media med
                JOIN
                    notes n
                ON
                    n.media_id = med.id
            `;
		}

		if (select_all_media_query.ok) {
			// Using .values will return rows as an array of values for each column, instead of objects.
			return NextResponse.json({
				message: "Success",
				data: {
					media_info: select_all_media_query, // .values()
				},
			});
		} else {
			return NextResponse.json({
				message: "Request did not work",
				status: 403,
			});
		}
	} catch (error) {
		console.error("Error processing:", error);

		return NextResponse.json(
			{
				message: "Internal Server Error",
				media: null,
			},
			{ status: 500 }
		);
	}
}

/**
 * Create a track (upload)
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function POST(request) {
	try {
		const formData = await request.formData();

		if (formData) {
			const title = formData.get("title");
			const file_upload = formData.get("file_upload");
			const file_name = formData.get("file_name");
			const media_type = formData.get("media_type");
			const media_desc = formData.get("media_desc");
			const thumb_url = formData.get("thumb_url");
			const thumb_upload = formData.get("thumb_upload");
			const has_media_markers = formData.get("has_media_markers");

			return NextResponse.json({
				message: "Success",
				data: {
					title,
					file_upload,
					file_name,
					media_type,
					media_desc,
					thumb_url,
					thumb_upload,
					has_media_markers,
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
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Change/update a track
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function PUT(request) {
	try {
		const formData = await request.formData();

		if (formData) {
			const title = formData.get("title");
			const file_upload = formData.get("file_upload");
			const file_name = formData.get("file_name");
			const media_type = formData.get("media_type");
			const media_desc = formData.get("media_desc");
			const thumb_url = formData.get("thumb_url");
			const thumb_upload = formData.get("thumb_upload");
			const has_media_markers = formData.get("has_media_markers");

			return NextResponse.json({
				message: "Success",
				data: {
					title,
					file_upload,
					file_name,
					media_type,
					media_desc,
					thumb_url,
					thumb_upload,
					has_media_markers,
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
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

/**
 * Delete (hide) a track
 *
 * @param {NextRequest} request
 *
 * @returns {NextResponse}
 */
export async function DELETE(request) {
	try {
		const media_id = request.nextUrl.searchParams.get("media_id");

		return NextResponse.json({
			message: "Success",
			data: "The media id that will be deleted is " + media_id,
		});
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
