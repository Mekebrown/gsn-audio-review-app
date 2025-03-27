import { NextRequest, NextResponse } from 'next/server';

import handleErrors from 'app/lib/error_handler';

/**
 * Get user's settings
 * 
 * @param {NextRequest} request 
 * 
 * @returns {NextResponse}
 */
export async function GET(request) {
    try {
        const user_id = request.user_id;

        if (!user_id) {
            return NextResponse.json({ message: 'No user ID provided' }, { status: 400 });
        }

        // Query to grab that user's settings

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(request, 500, error.message, "app/api/info/settings/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

/**
 * Create a user's settings during their first sign in. They have to agree to disclaimer (again) and terms
 * 
 * @param {NextRequest} request 
 * 
 * @returns {NextResponse}
 */
export async function POST(request) {
    try {
        const formData = await request.formData();

        if (!formData) {
            return NextResponse.json({ message: 'No form data found' }, { status: 403 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(request, 500, error.message, "app/api/info/settings/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

/**
 * Change/update a user's settings; Can't change disclaimer or terms setting
 * 
 * @param {NextRequest} request 
 * 
 * @returns {NextResponse}
 */
export async function PUT(request) {
    try {
        const user_id = await request.user_id;

        if (!user_id) {
            return NextResponse.json({ message: 'No user ID provided' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(request, 500, error.message, "app/api/info/settings/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
