const usersRouter =  require("./routes/usersRoute");
const indexRouter =  require("./routes/indexRoute");
const notesRouter =  require("./routes/notesRoute");
const express = require("express");
const app = express();

app.use("/", indexRouter);
app.use("/notes/", notesRouter);
app.use("/users/", usersRouter);

app.listen(3001, function() {
    console.log('===================================');
    console.log("Express server is running on port 3001");
    console.log('===================================');
});