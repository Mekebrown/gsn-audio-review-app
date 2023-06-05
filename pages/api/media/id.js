export default function handler( req, res ) {
    const media_info = {
        image: "https://i.pravatar.cc/300",
        id: 1,
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
    };
    
    res.status(200).json({ 
        route: "media/id", 
        media: media_info 
    });
};
