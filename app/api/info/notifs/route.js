import { NextResponse } from 'next/server';

import handleErrors from 'app/lib/error_handler';

export async function GET(request) {
    const user_id = request.nextUrl.searchParams.get("user_id");

    if (!user_id) {
        return NextResponse.json({ message: 'No user ID provided' }, { status: 400 });
    }

    try {
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(formData, 500, error.message, "app/api/info/notifs/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
