import { NextResponse } from 'next/server';

export async function GET(request) {
    const recent_single_or_all_signing = request.request_type;
    const user_id = request.user_id;

    try {
        if (recent_single_or_all_signing === "recent") {
            // Query to grab that user's info
        } else if (recent_single_or_all_signing === "single") {
            // Query to grab all user info
        } else if (recent_single_or_all_signing === "all") {
            // Query to grab all user info
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};

// Hide signins for a "deleted" user
export async function DELETE(request) {
    try {
        const user_id = request.user_id;
        
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
