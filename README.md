# Audio Review App for the Gifted Sounds Network - In development

Made with Create React App (React JS), Node JS, PostgreSQL
Deployed on Heroku currently

Known security error issue with react-scripts: https://github.com/facebook/create-react-app/issues/12132

## Tests

Jest. KIM: Arrange/Act/Assert

## Database info

- Tables: digest, media, ratings, users, notes
- A digest entry stands alone
- A media project can have one user (the uploading admin), multiple notes, and multiple ratings
- A rating can have only one user and one media project
- A user can have multiple notes and multiple ratings
- A note can have only one user (the author) and (refer to) one media project

## Third-party tools to note

[Font Awesome Cheatsheet](https://fontawesome.com/v5/cheatsheet)

## Notes on my reasoning for specific choices made

I found a [nifty, tiny player interface](https://codepen.io/websitebeaver/pen/vKdWxW?editors=0010), in CodePen, where an admin can play an audio track in their feed on the home page.

There is an alert message used for the log in form. Instead of the status message being saved in state I grab it through the DOM and add an alert role attribute once the form is submitted because [in MDN it says the following](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/alert_role#description): "Warning: Because of its intrusive nature, the alert role must be used sparingly and only in situations where the user's immediate attention is required." and "The alert role is added to the node containing an alert message, not the element causing the alert to be triggered." GTK.
