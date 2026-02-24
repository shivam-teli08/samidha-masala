const { v2: cloudinary } = require("cloudinary");
const dotenv = require("dotenv");
const busboy = require("busboy");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name || process.env.CLOUD_NAME,
  api_key: process.env.cloud_api || process.env.API_KEY,
  api_secret: process.env.CLOUD_SECRET || process.env.API_SECRET,
});

const streamAndUpload = async (req, res) => {
  try {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return res.status(400).json({ error: "Unsupported content type" });
    }

    const bb = busboy({ headers: req.headers });
    let uploadHandled = false;
    let responseSent = false;

    bb.on("file", (name, stream, info) => {
      const { filename, mimeType } = info;
      uploadHandled = true;

      if (!mimeType || !mimeType.startsWith("image/")) {
        stream.resume();
        if (!responseSent) {
          responseSent = true;
          return res.status(400).json({ error: "Only image files are allowed" });
        }
        return;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (responseSent) return;
          if (error) {
            responseSent = true;
            return res.status(400).json({ error: "File not uploaded" });
          }

          responseSent = true;
          return res.status(200).json({
            message: "Image uploaded successfully",
            image: result.secure_url,
            publicId: result.public_id,
            filename,
          });
        }
      );

      stream.pipe(uploadStream);
    });

    bb.on("finish", () => {
      if (!uploadHandled && !responseSent) {
        responseSent = true;
        return res.status(400).json({ error: "No file found in request" });
      }
    });

    bb.on("error", () => {
      if (!responseSent) {
        responseSent = true;
        return res.status(400).json({ error: "Cannot upload file" });
      }
    });

    req.pipe(bb);
  } catch (e) {
    return res.status(400).json({ error: "Cannot upload file" });
  }
};

module.exports = {
  streamAndUpload,
};
