import { NextResponse } from 'next/server';

/**
 * Handles the GET request for user signout.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
    try {
        // Extract user_id from the request (assuming it's passed in headers or query params)
        const url = new URL(request.url);
        const user_id = url.searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json(
                { message: 'No user ID provided' },
                { status: 400 }
            );
        }

        // Return success response
        return NextResponse.json({ message: 'Success', user_id });
    } catch (error) {
        console.error('Error processing request:', error);

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
