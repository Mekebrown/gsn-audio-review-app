const allowList = [
    'http://localhost:3000/', 
    'http://localhost:3001/', 
    'https://intense-forest-28148.herokuapp.com/'
];


const corsOptions = {
    origin: (origin, callback) => {
      console.log("** Origin of request " + origin);
  
      if (allowList.indexOf(origin) !== -1 || !origin) {
        console.log("Origin acceptable");
        callback(null, true);
      } else {
        console.log(allowList.indexOf(origin));
        callback(new Error("Not allowed by CORS"));
      }
    }
};

module.exports = {
    corsOptions
}
