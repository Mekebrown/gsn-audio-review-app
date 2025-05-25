import { NextResponse } from 'next/server';

import handleErrors from '@/app/lib/error_handler';

/**
 * Handles GET requests for user sign-ins.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const requestType = url.searchParams.get('request_type');
        const userId = url.searchParams.get('user_id');

        if (!requestType) {
            return NextResponse.json(
                { message: 'No request type provided' },
                { status: 400 }
            );
        }

        if (requestType === 'recent') {
            // Query to grab recent sign-in info for the user
        } else if (requestType === 'single') {
            // Query to grab single user info
        } else if (requestType === 'all') {
            // Query to grab all users' info
        } else {
            return NextResponse.json(
                { message: 'Invalid request type' },
                { status: 400 }
            );
        }

        return NextResponse.json({ message: 'Success', userId });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');

        console.error('Error processing GET request:', error);

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * Handles POST requests for user sign-ins.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');

        if (!userEmail || !userPassword) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Add logic to handle user sign-in (e.g., authentication)

        return NextResponse.json({ message: 'Success', userEmail });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');
        console.error('Error processing POST request:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * Handles DELETE requests to hide sign-ins for a "deleted" user.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get('user_id');

        if (!userId) {
            return NextResponse.json(
                { message: 'No user ID provided' },
                { status: 400 }
            );
        }

        // Add logic to handle hiding sign-ins for the user

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');
        console.error('Error processing DELETE request:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
