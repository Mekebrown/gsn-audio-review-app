import { NextResponse } from 'next/server';
import StrapiHandler from "@/app/lib/strapiclient_handler";

import handleErrors from '@/app/lib/error_handler';

const notesData = StrapiHandler.collection("notes");
const mediaData = StrapiHandler.collection("media");
const usersData = StrapiHandler.collection("users");
const today = new Date().toISOString().split('T')[0];

// Next JS API? Strapi SDK? Or REST API?

const getNewNotes = (clientId) => {
    if (clientId) {
        return notesData.find({
            filters: {
                createdAt: {
                    $gt: today
                },
                id: {
                    $eq: clientId
                }
            }
        });
    } else {
        return notesData.find({
            filters: {
                createdAt: {
                    $gt: today
                }
            }
        });
    }
};

const getNewMedia = () => {
    const currentUserId = 3;

    return mediaData.find({
        filters: {
            createdAt: {
                $gt: today,
            },
            currentUserId: {
                $in: userIdArray
            }
        }
    });
};

const getNewUserLogins = () => {
    return usersData.find({
        filters: {
            lastLogin: {
                $gt: today
            }
        }
    });
};

export async function GET(request) {
    try {
        const formData = await request.formData();
        const role = formData.get("role");

        if (!role) {
            return NextResponse.json({ message: 'No request type provided' }, { status: 400 });
        }

        if (role !== 'admin' || role !== 'client') {
            return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
        }

        if (role === 'admin') {
            const notes = await getNewNotes();
            const newUserLogins = await getNewUserLogins();

            return NextResponse.json({
                message: 'Success',
                notifications: {
                    notes: notes.length,
                    userLogins: newUserLogins.length
                }
            });
        } else if (role === 'client') {
            const media = await getNewMedia();

            return NextResponse.json({
                message: 'Success',
                notifications: {
                    media: media.length
                }
            });
        }
    } catch (error) {
        handleErrors(request, 500, error.message, "@/app/api/info/notifs/route.js");

        console.error('Error processing GET request:', error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
