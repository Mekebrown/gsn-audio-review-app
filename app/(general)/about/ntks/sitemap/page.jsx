export default function Page() {
    return <div>
        <h2>Sitemap</h2>

        <p>
            /               [I:N/A][O:ALL] Homepage
            /about          [I:N/A][O:T,M]
            /blog           [I:N/A][O:ALL]
            /disclaimer     [I:N/A][O:T]
            /faq            [I:N/A][O:T]
            /pricing        [I:N/A][O:T,M]
            /terms          [I:N/A][O:T]
            /terms/privacy  [I:N/A][O:T]
            /contact        [I:T][O:T,M] Client
            /signin         [I:T][O:T,M] Client
            ------------------------------------------------------
            From this point forward, it uses either useState or localStorage per session
            /media          [I:N/A][O:ALL] Client | all media the current user can see, linked to their account
            /notes          [I:N/A][O:T,M] Client | all notes the current user can see, linked to media
            /account        [I:T][O:T,M] Client | displays the current user's account
            /search         [I:T][O:T,M] Client | TBD | retrieves response from request and queries
            /notifs         [I:N/A][O:T] Client | TBD | retrieves response from notification results;
            {/* {n - med: #, n-nts: #} or {n - med: #, n-nts: #, n-us: #, n-logins: #, n-views: #, n-plays: #} */}
            /settings       [I:T][O:T,M] TBD | retrieves response from changes in request body; Agreed to disclaimer/terms/privacy, dark mode, etc.
            ------------------------------------------------------
            /media/:id      [I:T][O:ALL] Client | If current user can access the track: displays specific track, with any notes saved for it
            /media/:id/new-note [I:N/A][O:T] Client | Add new note to a specific track accessible to the current user ------------------------------------------------------
            /account/:id    [I:T][O:T,M] Client | ADMIN-ONLY: displays that specific user's account info; Non-admins will be redirected to acct
            /account/all    [I:T][O:T,M] Client | ADMIN-ONLY; displays all users; Non-admins will be redirected to acct
            /account/new    [I:T,M][O:T] Client | ADMIN-ONLY: Send un/pw; displays that specific user's account info; Non-admins will be redirected to acct
            /media/new      [I:ALL][O:T] Client | ADMIN-ONLY; Upload new track; Non-admins will be redirected to /media
            /notes/:id      [I:T][O:T,M] Client | ADMIN-ONLY; If current user can access the track: displays specific note, with a reference to the track;
            Non-admins will be redirected to /media/:id the note [:id] belongs to

            Key/Legend for any content in the main body of the page:
            I - Input
            O - Output
            N/A - None; Not-Applicable
            ALL - S/E
            M - Images
            T - Text
            A - Audio
            V - Video

            Examples:
            - [I:N/A][O:T] means [Input: None][Output:Text]

            {/* /** 
                Routes: 
                / - msg, media (project name/link, notes and the profiles, uploaded date, update link, delete link)
                /auth/signin - msg, form (email input, password input), submit button, cancel button
                /signout - redirect to /
                /send-pw* - close icon, msg, form (checkboxes of media, email input, generated pw and "copy" link), submit button, clear button, cancel link
                /delete-profile* - close icon, msg, confirm button, cancel link
                /upload* - close icon, msg, form (logo, project name, desc, user, audio, timestamps), submit button, clear button, cancel link
                /delete-upload* - close icon, msg, confirm button, cancel link
                /users - msg, users (link to each user and their profiles, preview of latest note(s), list of media, last sign in(s?), reset pw link, delete user link)
                /notes - msg, notes (note copy, media project name/link, created date)
                /users/:user - shows profile(s) with its email, role, lastSignIn, notes, media, created, reset pw link, and a delete user link. Deleting a user will delete all profiles for that user.
                /notes/:note* - note copy, media project name/link, created date
                /media/:media - msg, project name, description, form (textarea, submit button, cancel button), notes list
                /media/:media - msg (edit), project name (edit), description (edit), list of each note (reply to note link (form: textarea, submit button, cancel button)) 
            
                Admin types: 
                    Send PW* (SendPWIcon),
                    Upload* (UploadIcon), 
                    Search~ (SearchIcon), 
                    Media (MediaIcon), 
                    Notes (NotesIcon), 
                    Users (UsersIcon), 
                    Notifs*^ (NotifsIcon), 
                    Settings^ (SettingsIcon)
            
                User types: 
                    Media (MediaIcon), 
                    Notes (NotesIcon),
                    Contact (EmailIcon), 
                    Notifs*^ (NotifsIcon), 
                    Settings^ (SettingsIcon)
            
                ~ Top new section
                * Modal
                ^ Dropdown
            */}
        </p>
    </div>
};
