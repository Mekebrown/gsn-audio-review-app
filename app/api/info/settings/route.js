import { NextResponse } from 'next/server';

// Get user's settings
export async function GET(request) {
    try {
        const user_id = request.user_id;

        if (!user_id) {
            return NextResponse.json({ message: 'No user ID provided' }, { status: 400 });
        }

        // Query to grab that user's settings

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

// Create a user's settings during their first sign in. They have to agree to disclaimer (again) and terms
export async function POST(request) {
    try {
        const formData = await request.formData();

        if (!formData) {
            return NextResponse.json({ message: 'No form data found' }, { status: 403 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

// Change/update a user's settings; Can't change disclaimer or terms setting
export async function PUT(request) {
    try {
        const user_id = await request.user_id;

        if (!user_id) {
            return NextResponse.json({ message: 'No user ID provided' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
