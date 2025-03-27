import { NextResponse } from 'next/server';

import handleErrors from 'app/lib/error_handler';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const email = formData.get('email');
        const subject_cat = formData.get('subject_cat');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!formData || !name || !email || !subject_cat || !subject || !message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(formData, 500, error.message, "app/api/contact/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
