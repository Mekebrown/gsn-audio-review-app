const adminRouter =  require("./routes/adminRoute");
const indexRouter =  require("./routes/indexRoute");
const notesRouter =  require("./routes/notesRoute");
const playAudioRouter =  require("./routes/playAudioRoute");
const projectsRouter =  require("./routes/projectsRoute");
const singleProjectRouter =  require("./routes/singleProjectRoute");
const usersRouter =  require("./routes/usersRoute");
const express = require("express");
const app = express();
const createError = require('http-errors');
const path = require('path');
const cors = require("cors");
const corsOptions = { origin: "http://localhost:3002" };
const db = require("./models");
// db.sequelize.sync(); Use this for production!
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
}); // Use this for development env only!

app.use(cors(corsOptions));
app.use("/admin/", adminRouter);
app.use("/", indexRouter);
app.use("/notes/", notesRouter);
app.use("/playaudio/", playAudioRouter);
app.use("/projects/", projectsRouter);
app.use("/singleproject/", singleProjectRouter);
app.use("/users/", usersRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to catch 404 and forward to error handler for ANY request
app.use(function(req, res, next) {  
    console.error("404")

    next(createError(404));
});
  
// Middleware to handle error in ANY request
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.error(err.stack);

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

// Middleware of authorization checker - Lesson in https://www.youtube.com/watch?v=lY6icfhap2o at 7:15
function auth(req, res, next) {
    if (req.query.admin === "true") {
        req.admin = true;
        next();
        return;
    }

    res.send("No auth");
}

// require("./routes/notesRoute.js")(app);

app.listen(3001, function() {
    console.log("===Server port 3001===");
});