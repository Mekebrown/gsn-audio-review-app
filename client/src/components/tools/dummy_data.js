const currDateTime = new Date();

const allProjectsList = [
    {
        key: 5,
        mediaId: 5,
        fileName: "maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        fileDirectory: "https://ia801404.us.archive.org/6/items/",
        projectName: "Vox Machina",
        mediaDesc: "Vox Machina - This will have a description eventually",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 7,
                userId: 2,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 8,
                userId: 2,
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 9,
                userId: 2,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            },
            {
                noteId: 10,
                userId: 2,
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
        fileName: "maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        fileDirectory: "https://ia801404.us.archive.org/6/items/",
        projectName: "SHOWTIME!",
        mediaDesc: "It's, well you know.",
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
        fileName: "maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        fileDirectory: "https://ia801404.us.archive.org/6/items/",
        projectName: "Rap Shit",
        mediaDesc: "Rap Shit. Yup. Great stuff.",
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
        fileName: "maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        fileDirectory: "https://ia801404.us.archive.org/6/items/",
        projectName: "The Sandman",
        mediaDesc: "The Sandman - The Sandman! The Sandman? The Sandman. The SandmanThe Sandman!",
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

const allUsers = [
    {
        key: 1,
        userName: "noorma@something.net",
        lastLogin: "2-1-2022",
        usersNotes: [
            {
                noteId: 7,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 8,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 9,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            },
            {
                noteId: 10,
                mediaId: 2,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    },
    {
        key: 2,
        userName: "noorma@something.net",
        lastLogin: "2-1-2022",
        usersNotes: [
            {
                noteId: 7,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 8,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 9,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            },
            {
                noteId: 10,
                mediaId: 2,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    },
    {
        key: 3,
        userName: "noorma@something.net",
        lastLogin: "2-1-2022",
        usersNotes: [
            {
                noteId: 7,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 8,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "7-5-2021",
                updatedAt: "7-5-2021",
                noteBody: "The second note",
                noteTimestamp: "1.03"
            },
            {
                noteId: 9,
                mediaId: 22,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            },
            {
                noteId: 10,
                mediaId: 2,
                projectName: "GREATNESS!!!!!",
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
            }
        ]
    }
];

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

const userOneMediaProject = [
    {
        key: 1,
        mediaId: 1,
        fileName: "maurice-level-_-la-mysterieuse-lady-dunmoore/Maurice_level_-_La_Mysterieuse_Lady_Dunmoore.mp3",
        fileDirectory: "https://ia801404.us.archive.org/6/items/",
        projectName: "Vox Machina",
        mediaDesc: "Vox Machina - This will have a description eventually",
        projectThumb: "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png",
        notes: [
            {
                noteId: 1,
                createdAt: "2-1-2022",
                updatedAt: "2-1-2022",
                noteBody: "This will always be note one",
                noteTimestamp: "0.03"
            },
            {
                noteId: 2,
                createdAt: "12-1-2020",
                updatedAt: "12-1-2020",
                noteBody: "Three is the magic number",
                noteTimestamp: "2.43"
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

const singleNote = {
    media_id: 1,
    user_id: 1001,
    note_id: 11111,
    note_created_on: currDateTime,
    note_last_retrieved: currDateTime,
    note_timestamp: currDateTime,
};

const singleUser = [
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
    }
];

const updatedSampleNote = {
    media_id: 1,
    user_id: 1001,
    note_timestamp: currDateTime,
    note_last_retrieved: currDateTime,
};

export default allUsers;

export {
    allUsers,
    allNotesForAllProjects,
    allProjectsList,
    singleProject,
    singleNote,
    singleUser,
    updatedSampleNote,
    userOneMediaProject
};
