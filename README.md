# gsn-audio-review-app

Known security error issue with react-scripts: https://github.com/facebook/create-react-app/issues/12132

Known security error issue with trim-newlines: https://github.com/storybookjs/storybook/issues/14603

Currently I am writing unit tests using Jest. KIM: Arrange/Act/Assert

Database
Tables: digest, media, ratings, users, notes
A digest entry stands alone
A media project can have one user (the uploading admin), multiple notes, and multiple ratings
A rating can have only one user and one media project
A user can have multiple notes and multiple ratings
A note can have only one user (the author) and (refer to) one media project
