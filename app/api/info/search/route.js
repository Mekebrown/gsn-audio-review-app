import { NextResponse } from 'next/server';

export async function GET(request) {
    const search_query = request.search_query;

    if (!search_query) {
        return NextResponse.json({ message: 'No search query provided' }, { status: 400 });
    }

    try {
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
