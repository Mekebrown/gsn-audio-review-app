export default function handler( req, res ) {
    const user_info = {
        username: "admin@gsn.net",
        email: "admin@gsn.net",
        role: "admin",
        image: "https://i.pravatar.cc/300",
        media: [
            {
                id: 1,
                user_ids: [1],
                note_ids: [1, 2, 3],
                type: "audio",
                project_name: "(string)",
                description: "(string)",
                logo: "(string) - image file",
                csv: "(string) - csv file",
                audio: "(string)? - audio file",
                s3_url: "(string)",
                created: "01-01-2021 00:00:00",
                updated: "01-01-2021 00:00:00",
            }
        ], 
        notes: [
            {
                id: 1,
                mediaId: 1,
                userId: 1,
                content: "(string)",
                created: "01-01-2021 00:00:00",
                updated: "01-01-2021 00:00:00",
                deleted: null,
            },
            {
                id: 2,
                mediaId: 1,
                userId: 2,
                content: "(string) (string)",
                created: "01-02-2021 00:00:00",
                updated: "01-02-2021 00:00:00",
                deleted: null,
            },
            {
                id: 3,
                mediaId: 1,
                userId: 3,
                content: "(string) (string) (string)",
                created: "01-03-2021 00:00:00",
                updated: "01-03-2021 00:00:00",
                deleted: null,
            },
        ], 
        users: [
            {
                id: 1,
                note_ids: [1, 2, 3],
                tag: "(string) - uuid",
                username: "user@name.org",
                lastLogin: "01-04-2021 00:00:00",
                notes: [],
                media: [1],
            },
        ],
        notifs: {
            users: 2,
            notes: 2,
            media: 1,
        }
    };

    console.log("user_info: ", user_info);
    
    res.status(200).json({ user: user_info });
}
