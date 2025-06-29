import { NextResponse } from 'next/server';

import handleErrors from '@/app/lib/error_handler';
import StrapiHandler from '@/app/lib/strapiclient_handler';

const contactFormHandler = StrapiHandler.collection('contact-form');

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('NoSigninUserName');
        const email = formData.get('userEmail');
        const subject_cat = formData.get('subjectDropdown');
        const subject = formData.get('subject');
        const message = formData.get('message');

        if (!formData || !name || !email || !subject_cat || !subject || !message) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const data = {
            name,
            email,
            subject_cat,
            subject,
            message,
        };
        const response = await contactFormHandler.create(data);

        if (!response || response.error) {
            handleErrors(formData, 500, response.error || 'Failed to create contact form entry', "@/app/api/contact/route.js");
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(formData, 500, error.message, "@/app/api/contact/route.js");

        console.error('Error processing form:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
