/**
 * @returns {JSX.Element}
 */
export default function Page() {
    try {
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
                /account        [I:T][O:T,M] Client | displays the current user&apos;s account
                /search         [I:T][O:T,M] Client | TBD | retrieves response from request and queries
                /notifs         [I:N/A][O:T] Client | TBD | retrieves response from notification results;
                {/* {n - med: #, n-nts: #} or {n - med: #, n-nts: #, n-us: #, n-signins: #, n-views: #, n-plays: #} */}
                /settings       [I:T][O:T,M] TBD | retrieves response from changes in request body; Agreed to disclaimer/terms/privacy, dark mode, etc.
                ------------------------------------------------------
                /media/:id      [I:T][O:ALL] Client | If current user can access the track: displays specific track, with any notes saved for it
                /media/:id/new-note [I:N/A][O:T] Client | Add new note to a specific track accessible to the current user ------------------------------------------------------
                /account/:id    [I:T][O:T,M] Client | ADMIN-ONLY: displays that specific user&apos;s account info; Non-admins will be redirected to acct
                /account/all    [I:T][O:T,M] Client | ADMIN-ONLY; displays all users; Non-admins will be redirected to acct
                /account/new    [I:T,M][O:T] Client | ADMIN-ONLY: Send un/pw; displays that specific user&apos;s account info; Non-admins will be redirected to acct
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
            </p>
        </div>;
    } catch (error: any) {
        throw new Error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
    }
};
