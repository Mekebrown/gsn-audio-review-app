const fs = require("fs");

const logger = (details) => {
  let current = ((new Date()).toLocaleString()).replace(/\D*/g, "");
  let file_name = `./files/logs/${details.desc}${current}.log`;

  let log_data = {
    message: details.message,
    req: details.req ? details.req : "N/A",
    res: details.res ? details.res : "N/A",
    headers: details.headers ? details.headers : "N/A",
  };

  fs.writeFile(file_name, JSON.stringify(log_data, null, "\t"), "utf8", (error, data) => {
    console.log(`Write complete! Error: ${error} | Data: ${data}`);
  });
};

module.exports = logger;
