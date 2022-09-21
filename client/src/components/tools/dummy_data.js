const projectsList = [
    {
        key: 1,
        mediaId: 1,
        userId: 111,
        mediaFile: "https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        projectName: "Vox Machina",
        projectDesc: "Vox Machina - This will have a description eventually",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 12,
                userId: 100,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 1,
                userId: 200,
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 1,
                userId: 300,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            },
            {
                noteId: 111,
                userId: 300,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    },
    {
        key: 2,
        mediaId: 2,
        userId: 111,
        mediaFile: "https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        projectName: "SHOWTIME!",
        projectDesc: "It's, well you know.",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 1,
                userId: 100,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 1,
                userId: 200,
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 1,
                userId: 300,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    },
    {
        key: 3,
        mediaId: 3,
        userId: 111,
        mediaFile: "https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        projectName: "Rap Shit",
        projectDesc: "Rap Shit. Yup. Great stuff.",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 1,
                userId: 100,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            }
        ]
    },
    {
        key: 4,
        mediaId: 4,
        userId: 111,
        mediaFile: "https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        projectName: "The Sandman",
        projectDesc: "The Sandman - The Sandman! The Sandman? The Sandman. The SandmanThe Sandman!",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 1,
                userId: 100,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 1,
                userId: 300,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    }
];

const singleAdmin = {
    user_name: "Admin Admin",
    last_login: "01-02-2020",
    recent_activity: [
        {
            recent_notes: [
                "One note here",
                "A note from the sounds of the forest"
            ],
            recent_users: "Moose"
        }
    ],
    projects: [
        {
            key: 1, name: "Prince's \"If I Was Your Girlfriend\""
        },
        {
            key: 2, name: "The 4400"
        },
        {
            key: 3, name: "TikTok Vybes"
        },
        {
            key: 4, name: "Vox Machina"
        }
    ]
};

const allUsers = [
    {
        key: 1,
        userName: "Norma",
        usersNotes: [
            {
                id: 11,
                project: "Blah",
                posted: "2-1-2022",
                content: "This will always be note one"
            },
            {
                id: 12,
                project: "Blah",
                posted: "7-5-2021",
                content: "This will always be note two"
            },
            {
                id: 13,
                project: "Blah",
                posted: "12-1-2020",
                content: "This will always be note three"
            }
        ]
    },
    {
        key: 2,
        userName: "Brohan",
        usersNotes: [
            {
                id: 21,
                project: "GREATNESS!!!!!",
                posted: "2-1-2022",
                content: "The first note"
            },
            {
                id: 22,
                project: "GREATNESS!!!!!",
                posted: "7-5-2021",
                content: "The second note"
            },
            {
                id: 23,
                project: "GREATNESS!!!!!",
                posted: "12-1-2020",
                content: "The third note"
            }
        ]
    },
    {
        key: 3,
        userName: "Tyrel",
        usersNotes: [
            {
                id: 31,
                project: "Cool",
                posted: "2-1-2022",
                content: "One is the magic number"
            },
            {
                id: 32,
                project: "Cool",
                posted: "7-5-2021",
                content: "Two is the magic number"
            },
            {
                id: 33,
                project: "Cool",
                posted: "12-1-2020",
                content: "Three is the magic number"
            }
        ]
    }
];

const singleProjectNotes = [
    {
        noteId: 12,
        userId: 100,
        createdAt: "2-1-2022",
        updatedAt: "2-1-2022",
        noteBody: "This will always be note one",
        noteTimestamp: "0.03"
    },
    {
        noteId: 1,
        userId: 200,
        createdAt: "7-5-2021",
        updatedAt: "7-5-2021",
        noteBody: "The second note",
        noteTimestamp: "1.03"
    },
    {
        noteId: 41,
        userId: 300,
        createdAt: "12-1-2020",
        updatedAt: "12-1-2020",
        noteBody: "Three is the magic number",
        noteTimestamp: "2.43"
    },
    {
        noteId: 111,
        userId: 300,
        createdAt: "12-1-2020",
        updatedAt: "12-1-2020",
        noteBody: "Three is the magic number",
        noteTimestamp: "2.43"
    }
];

const singleProject = [{
    key: 1,
    project_name: "Prince's \"If I Was Your Girlfriend\"",
    file_name: "audio_surface.mp3",
    length: "2 minutes",
    totalNotes: singleProjectNotes,
    creation_datetime: "01-01-2020"
}];

const allNotesForAllProjects = [
    {
        key: 1,
        name: "Vox Machina",
        notes: [
            {
                id: 1,
                user: "Norma",
                posted: "2-1-2022",
                content: "This will always be note one"
            },
            {
                id: 2,
                user: "Brohan",
                posted: "7-5-2021",
                content: "The second note"
            },
            {
                id: 3,
                user: "Tyrel",
                posted: "12-1-2020",
                content: "Three is the magic number"
            }
        ]
    },
    {
        key: 2,
        name: "TikTok Vybes",
        notes: [
            {
                id: 1,
                user: "Norma",
                posted: "2-1-2022",
                content: "This will always be note one"
            },
            {
                id: 2,
                user: "Brohan",
                posted: "7-5-2021",
                content: "The second note"
            },
            {
                id: 3,
                user: "Tyrel",
                posted: "12-1-2020",
                content: "Three is the magic number"
            }
        ]
    },
    {
        key: 3,
        name: "The 4400",
        notes: [
            {
                id: 1,
                user: "Norma",
                posted: "2-1-2022",
                content: "This will always be note one"
            },
            {
                id: 2,
                user: "Brohan",
                posted: "7-5-2021",
                content: "The second note"
            },
            {
                id: 3,
                user: "Tyrel",
                posted: "12-1-2020",
                content: "Three is the magic number"
            }
        ]
    },
    {
        key: 4,
        name: "Prince's \"If I Was Your Girlfriend\"",
        notes: [
            {
                id: 1,
                user: "Norma",
                posted: "2-1-2022",
                content: "This will always be note one"
            },
            {
                id: 2,
                user: "Brohan",
                posted: "7-5-2021",
                content: "The second note"
            },
            {
                id: 3,
                user: "Tyrel",
                posted: "12-1-2020",
                content: "Three is the magic number"
            }
        ]
    }
];

const currDateTime = new Date();

const newSampleNote = {
    media_id: 1,
    user_id: 1001,
    note_id: 11111,
    note_created_on: currDateTime,
    note_last_retrieved: currDateTime,
    note_timestamp: currDateTime,
};

const updatedSampleNote = {
    media_id: 1,
    user_id: 1001,
    note_timestamp: currDateTime,
    note_last_retrieved: currDateTime,
};

const dataForProd = {
    "file_name": "t3.mp3",
    "file_directory": "C: \\Code Projects\\Non-GH Repos\\gsn-app_heroku/files/",
    "project_name": "t3",
    "media_desc": "t3",
    "totalNotesFromServer": [
        {
            "id": 2,
            "note_body": "aNOTHER",
            "note_timestamp": "0.00"
        },
        {
            "id": 1,
            "note_body": "DZ",
            "note_timestamp": "0.00"
        }
    ]
};

const allMediaToReview = [
    {
        key: 1,
        userName: "Lance",
        usersNotes: [
            {
                id: 11,
                project: "Proj1",
                posted: "2-1-2022",
                content: "Oh cool. Lemme get back to you."
            },
            {
                id: 12,
                project: "Proj2",
                posted: "2-1-2022",
                content: "Oh cool. Lemme get back to you."
            }
        ]
    },
    {
        key: 2,
        userName: "Meke",
        usersNotes: [
            {
                id: 22,
                project: "Proj2",
                posted: "2-1-2022",
                content: "I'm glad this was made!"
            },
            {
                id: 23,
                project: "Proj2",
                posted: "2-1-2022",
                content: "Short. But sweet"
            },
            {
                id: 24,
                project: "Proj2",
                posted: "2-1-2022",
                content: "Very cool work my friend"
            }
        ]
    }
];

export default dataForProd;

export {
    allMediaToReview,
    allUsers,
    allNotesForAllProjects,
    projectsList,
    singleAdmin,
    singleProject,
    newSampleNote,
    updatedSampleNote
};
