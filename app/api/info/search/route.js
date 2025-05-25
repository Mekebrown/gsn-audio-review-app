import { NextResponse } from 'next/server';

import handleErrors from '@/app/lib/error_handler';

export async function GET(request) {
    const search_query = request.search_query;

    if (!search_query) {
        return NextResponse.json({ message: 'No search query provided' }, { status: 400 });
    }

    try {
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(formData, 500, error.message, "@/app/api/info/search/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
