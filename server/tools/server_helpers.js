const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

require('dotenv').config();

const s3Client = new S3Client({ region: process.env.S3_REGION });

const setMediaStorage = async (file) => {
    if (!s3Client) return;

    const params = {
        Bucket: "gsnaudioreviewapp",
        ACL: "public-read",
        Key: file.mimetype + "/" + file.name,
        Body: file.data,
        ContentType: file.mimetype,
    };

    try {
        const results = await s3Client.send(new PutObjectCommand(params));

        return results.$metadata.httpStatusCode;
    } catch (err) { console.error(err); }
};

module.exports = { setMediaStorage };
