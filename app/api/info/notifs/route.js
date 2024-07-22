import { NextResponse } from 'next/server';

export async function GET(request) {
    const user_id = request.nextUrl.searchParams.get("user_id");

    try {
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
