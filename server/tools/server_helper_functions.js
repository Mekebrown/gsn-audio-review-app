const { S3Client, GetObjectCommand, ListObjectsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();
const path = require('path');
const fs = require("fs");

const run = async () => {
    const get_params = {
        Bucket: "gsnaudioreviewapp",
        Key: "media/ten_algos.txt"
    };

    console.log("\n=======================================\n");

    try {
        const streamToString = stream => {
            new Promise((resolve, reject) => {
                const chunks = [];
                stream.on("data", chunk => chunks.push(chunk));
                stream.on("error", reject);
                stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
            });
        };

        const data = await s3Client.send(new GetObjectCommand(get_params));

        const bodyContents = await streamToString(data.Body);

        console.log(bodyContents);
    } catch (err) { console.log("Error", err); }
    console.log("\n=======================================\n");
};

const setMediaStorage = async (file_name, file) => {
    const s3Client = new S3Client({ region: process.env.S3_REGION });

    const fileStream = fs.createReadStream(file);

    const put_params = {
        Bucket: "gsnaudioreviewapp",
        Key: file_name,
        Body: fileStream,
    };

    try {
        const results = await s3Client.send(new PutObjectCommand(put_params));

        return results;
    } catch (err) { console.log("Error", err); }
};

module.exports = { setMediaStorage };
