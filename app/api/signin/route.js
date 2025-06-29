import { NextResponse } from 'next/server';
import StrapiHandler from "@/app/lib/strapiclient_handler";

import handleErrors from '@/app/lib/error_handler';

const signInHandler = StrapiHandler.collection("sign-in-entries");
const userHandler = StrapiHandler.collection("users");

/**
 * Handles GET requests for user sign-ins.
 * 
 * @param {Request} request - The incoming request object.
 * 
 * @returns {NextResponse} - The response object.
 */
export async function GET(request) {
    try {
        const url = new URL(request.url);
        const requestType = url.searchParams.get('request_type');
        const userId = url.searchParams.get('user_id');

        if (!requestType) {
            return NextResponse.json(
                { message: 'No request type provided' },
                { status: 400 }
            );
        }

        if (requestType === 'recent') {
            const recentUsers = await signInHandler.find(
                {
                    createdAt: {
                        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
                    },
                },
                {
                    _limit: 5,
                    _sort: 'createdAt:DESC'
                }
            );

            if (!recentUsers || recentUsers.length === 0) {
                return NextResponse.json(
                    { message: 'No recent users found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                message: 'Success',
                data: recentUsers
            });
        } else if (requestType === 'single' && userId) {
            const user = await signInHandler.find(userId, {
                _sort: 'createdAt:DESC',
                _limit: 1
            });

            if (!user) {
                return NextResponse.json(
                    { message: 'User not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                message: 'Success',
                data: user
            });
        } else if (requestType === 'all') {
            const allSignins = await signInHandler.find();
            const allUsers = await userHandler.find();

            if (!allSignins || allSignins.length === 0 || !allUsers || allUsers.length === 0) {
                return NextResponse.json(
                    { message: 'No users found' },
                    { status: 404 }
                );
            }

            // If the user is not found in the sign-ins IDs, return a 200 but with a msg
            const allUsersWithSignins = allUsers.map(user => {
                const userSignin = allSignins.find(signin => signin.user_id === user.id);

                return {
                    ...user,
                    signin: userSignin ? userSignin : { message: 'No sign-in found for this user' }
                };
            });

            if (allUsersWithSignins.length === 0) {
                return NextResponse.json(
                    { message: 'No users found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                message: 'Success',
                data: allUsersWithSignins
            });
        } else {
            return NextResponse.json(
                { message: 'Invalid request type' },
                { status: 400 }
            );
        }
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');

        console.error('Error processing GET request:', error);

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * Handles POST requests for user sign-ins.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function POST(request) {
    try {
        const formData = await request.formData();
        const userEmail = formData.get('userEmail');
        const userPassword = formData.get('userPassword');

        if (!userEmail || !userPassword) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const existingUser = await signInHandler.findOne({ email: userEmail });

        if (!existingUser) {
            return NextResponse.json(
                { message: 'User doesn\'t exist' },
                { status: 409 }
            );
        }

        const newUser = await signInHandler.create({
            email: userEmail,
            password: userPassword
        });

        if (!newUser) {
            return NextResponse.json(
                { message: 'Failed to create user\'s sign in' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Success', userEmail });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');

        console.error('Error processing POST request:', error);

        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * @param {*} request 
 * 
 * @returns {NextResponse} - The response object.
 */
export async function PUT(request) {
    try {
        const formData = await request.formData();
        const userId = formData.get('userId'); // Assuming user_id is passed in form data
        const userEmail = formData.get('email');
        const userName = formData.get('username');
        const userPassword = formData.get('password');

        if (!userId || !userEmail || !userName || !userPassword) {
            return NextResponse.json(
                { message: 'User ID, email, username, and password are required' },
                { status: 400 }
            );
        }

        // Add logic to handle updating user information
        const updatedUser = await signInHandler.update(userId, {
            email: userEmail,
            username: userName,
            password: userPassword
        });

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'Failed to update user' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: 'Success',
        });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');
        console.error('Error processing PUT request:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

/**
 * Handles DELETE requests to hide sign-ins for a "deleted" user.
 * 
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response object.
 */
export async function DELETE(request) {
    try {
        const formData = await request.formData();
        const userId = formData.get('userId');

        if (!userId) {
            return NextResponse.json(
                { message: 'No user ID provided' },
                { status: 400 }
            );
        }

        // Add logic to handle hiding sign-ins for the user
        const deletedUser = await signInHandler.update(userId, {
            deleted: true
        });

        if (!deletedUser) {
            return NextResponse.json(
                { message: 'Failed to delete user' },
                { status: 500 }
            );
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        handleErrors(request, 500, error.message, '@/app/api/signin/route.js');
        console.error('Error processing DELETE request:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
