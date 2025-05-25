# GSN Audio Review App - In development

A React/Node/PostgreSQL media reviewing web application to be used by producers and their clients.

List of main technologies required: [Next JS](https://nextjs.org/) has ALL the goods of [Node JS](https://nodejs.org) and [React JS](https://reactjs.org/), [PostgreSQL](https://www.postgresql.org/), [Amazon S3](https://aws.amazon.com/s3/) for storing uploaded media, [Axios](https://axios-http.com/docs/intro) for the frontend's HTTP requests, [Jest](https://jestjs.io/) for testing React components, and a few packages for [Font Awesome](https://cdnjs.com/libraries/font-awesome) icons.

## Installation

-   Clone the repo
-   Run in the CLI `npm install`
-   Set the following environment variables either in a .env file or set in your machine's configuration:
    ---[PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE](https://www.postgresql.org/docs/current/libpq-envars.html). When retrieving PostgreSQL data remotely you will need a variable to store a formatted connection url string such as "postgres://[PGUSER]:[PGPASSWORD]@[PGHOST]:[PGPORT]/[PGDATABASE]"
    ---[AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_BUCKET_NAME](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-environment.html). When retrieving S3 data remotely you will need a variable to store a formatted connection url string such as "s3://[AWS_ACCESS_KEY_ID]:[AWS_SECRET_ACCESS_KEY]@[AWS_DEFAULT_REGION]/[AWS_BUCKET_NAME]"
    ---NEXTAUTH_API_URL, S/E, for the NextAuth.js package
    ---[NEXTAUTH_URL](https://next-auth.js.org/getting-started/example) for the NextAuth.js package
    ---[NEXTAUTH_SECRET](https://next-auth.js.org/getting-started/example) for the NextAuth.js package
    ---[NEXTAUTH_DATABASE_URL](https://next-auth.js.org/getting-started/example) for the NextAuth.js package. The PostgreSQL connection url would be this constant's value.

## Usage Tips

-   Grab any audio you'd like for the player used in AdminUploadMedia. For example, I find a url from an audio file from archive.org that has both an mp3 and an ogg version: "https://ia800407.us.archive.org/34/items/RTFM-Harp-940531" or "https://ia801404.us.archive.org/6/items/maurice-level-_-la-mysterieuse-lady-dunmoore". At the end of this url will be added these two extensions inside of UserSingleProject.js.
-   Make sure to review the NPM packages to see if the latest versions are being used. Some will set off warnings (especially in this app's client) so (re)move any packages to dev-dependencies as needed. I unfortunately am still learning how to recognize these specifications.

## Database Info

-   Tables: media, users, notes, signins
-   A user can have multiple notes
-   A note can have only one user (the author)

## Testing

`npm run tests`, optionally appending here the relative path to any individual test files you want to focus on

## Concerns

Known security error issue with react-scripts: https://github.com/facebook/create-react-app/issues/12132

## Recommendations

Using [VS Code](https://code.visualstudio.com/) has been very convenient for running the app and using extensions (such as [PostgreSQL](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres) for viewing data quickly, [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), and [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), running its [Run and Debug](https://code.visualstudio.com/docs/editor/debugging#_run-and-debug-view) tool, using its [Source Control](https://code.visualstudio.com/docs/editor/versioncontrol#_scm-providers) tool, and using its [Split Terminal](https://code.visualstudio.com/docs/terminal/basics#_grouping) to see more than one instance running together in the CLI.

You may have to set additional environment variables for your chosen web host, along with the ones I listed above. For example, for [Heroku credentials pertaining to PostgreSQL a DATABASE_URL will be needed](https://devcenter.heroku.com/articles/heroku-postgresql).

## Future Work

Additional Features will be added such as a Digest of projects from the producer, and features that widen the communication options between the clients and the producer. I also want to add a thumbs up/down rating for each media work.

I also need to add some kind of form validation, on suggestion of my mentor Mark Nyon in [Issue #2](https://github.com/Githubbubber/gsn-audio-review-app/issues/2). I'm thinking of using [Joi](https://joi.dev/api/?v=17.4.0) for this.

I am thinking of using the [Pino](https://www.npmjs.com/package/pino) logging package.

## External References Used

-   A [helpful dev.to post](https://dev.to/i5han3/git-commit-message-convention-that-you-can-follow-1709) about adding clarity by formatting commit messages
-   README.md suggestions pulled from [Make a README](https://readthedocs.org/) and other sites by suggestion of Mark Nyon in [Issue #4](https://github.com/Githubbubber/gsn-audio-review-app/issues/4)
-   I found a [nifty, tiny player interface](https://codepen.io/websitebeaver/pen/vKdWxW?editors=0010), in CodePen, where an admin can play an audio track in their feed on the home page.
-   There is an alert message used for the sign in form. Instead of the status message being saved in state I grab it through the DOM and add an alert role attribute once the form is submitted because [in MDN it says the following](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role#description): "Warning: Because of its intrusive nature, the alert role must be used sparingly and only in situations where the user's immediate attention is required." and "The alert role is added to the node containing an alert message, not the element causing the alert to be triggered." GTK.
-   [Font Awesome Cheatsheet](https://fontawesome.com/v5/cheatsheet)
-   [Helpful pull request thread](https://github.com/aws/aws-sdk-js/issues/2961) with suggestions on how to handle S3 file upload issues with larg binary
-   This blog helped me out with some difficulties with a signed-in user context on the client-side. [Implement Node/Express Sessions With Postgres](https://justacoding.blog/implement-node-express-sessions-with-postgres/) Thx [@justa{coding}blog!](https://twitter.com/justacodingblog)

## Code Style

I chose to create frontend variable names in camelcase and backend variables in snake case. So you'll see that a lot. Also, for the frontend I used ES6 modules (import/export syntax) and for the backend I may have used commonjs.

I also chose to use the same variable names for the frontend and backend to make it easier to keep track of what is being passed around. I did my best to be consistent in that.

I always capitalize SQL keywords, too.

## Contributing

To contribute to this project, please create a fork of the main branch and make changes there. Once you are done, create a pull request. A member of the development team will review the changes as soon as possible and will integrate it if it is accepted.

## Support and Feedback

Please feel free to open an Issue with any questions, suggestions, or concerns.

## Acknowledgements

Lance John, Mark Nyon
