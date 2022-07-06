const singleAdmin =  {
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
    [
        {
            key: 1,
            userName: "Norma",
            usersNotes: [
                {
                    id: 1,
                    project: "Blah",
                    posted: "2-1-2022",
                    content: "This will always be note one"
                },
                {
                    id: 2,
                    project: "Blah",
                    posted: "7-5-2021",
                    content: "This will always be note two"
                },
                {
                    id: 3,
                    project: "Blah",
                    posted: "12-1-2020",
                    content: "This will always be note three"
                }
            ]
        }
    ],
    [
        {
            key: 2,
            userName: "Brohan",
            usersNotes: [
                {
                    id: 1,
                    project: "GREATNESS!!!!!",
                    posted: "2-1-2022",
                    content: "The first note"
                },
                {
                    id: 2,
                    project: "GREATNESS!!!!!",
                    posted: "7-5-2021",
                    content: "The second note"
                },
                {
                    id: 3,
                    project: "GREATNESS!!!!!",
                    posted: "12-1-2020",
                    content: "The third note"
                }
            ]
        }
    ],
    [
        {
            key: 3,
            userName: "Tyrel",
            usersNotes: [
                {
                    id: 1,
                    project: "Cool",
                    posted: "2-1-2022",
                    content: "One is the magic number"
                },
                {
                    id: 2,
                    project: "Cool",
                    posted: "7-5-2021",
                    content: "Two is the magic number"
                },
                {
                    id: 3,
                    project: "Cool",
                    posted: "12-1-2020",
                    content: "Three is the magic number"
                }
            ]
        }
    ]
];

const singleProject =  {
    project_name: "Prince's \"If I Was Your Girlfriend\"",
    file_name: "audio_surface.mp3",
    length: "2 minutes",
    totalNotes: 5,
    creation_datetime: "01-01-2020"
};

const allNotesForAllProjects = [
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
    ]
];

const allProjects = [
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
        }
    ],
    [
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
    ]
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
  "creation_datetime": "2022-03-23T21:37:22.000Z",
  "file_directory": "media/audio",
  "file_name": "t.mp3",
  "media_deleted_on": null,
  "media_desc": "The file t.mp3 is an audio track that is the current GSN theme song.",
  "media_id": 1,
  "media_last_retrieved": null,
  "media_type": "audio",
  "media_updated_on": null,
  "media_uploaded_on": "2022-06-10T19:11:53.000Z",
  "project_name": "t.mp3",
  "read_datetime": null,
  "thumb_rating": "up",
  "thumb_rating_id": 1,
  "totalNotesFromServer": [
    {
      "note_body": "The whole track is great. Thanks, Lance.",
      "note_id": 12,
      "note_is_deleted": "no",
      "note_last_retrieved": "2022-06-10T20:11:53.000Z",
      "note_last_updated": null,
      "note_timestamp": "14.25"
    }
  ],
  "update_datetime": null,
  "user_id": 1
};

export default dataForProd;

export {
    allProjects, 
    allUsers, 
    allNotesForAllProjects, 
    singleAdmin, 
    singleProject, 
    newSampleNote, 
    updatedSampleNote
};
