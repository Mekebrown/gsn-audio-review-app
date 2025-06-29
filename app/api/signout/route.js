import { NextResponse } from 'next/server';

import handleErrors from '@/app/lib/error_handler';

// Next JS API? Strapi SDK? Or REST API?

/**
 * Handles the GET request for user signout.
 * 
 * @param {Request} request - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const user_id = url.searchParams.get('user_id');

        if (!user_id) {
            return NextResponse.json(
                { message: 'No user ID provided' },
                { status: 400 }
            );
        }

        const response = NextResponse.json({ message: 'Signed out' });

        response.cookies.set(
            'token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/'
        }
        );

        return response;
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signout/route.js');

        console.error('Error processing request:', error);

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
