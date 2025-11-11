// // const cloudinary = require("cloudinary").v2;
// // const multer = require("multer");
// // const fs = require("fs");
// // const path = require("path");

// // // Configure Cloudinary
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // Ensure Uploads folder exists
// // const UPLOAD_DIR = path.join(__dirname, "Uploads");
// // if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// // // Configure multer for PDF uploads
// // const upload = multer({
// //   storage: multer.diskStorage({
// //     destination: UPLOAD_DIR,
// //     filename: (req, file, cb) => {
// //       cb(null, `${Date.now()}_${file.originalname}`);
// //     },
// //   }),
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype === "application/pdf") {
// //       cb(null, true);
// //     } else {
// //       cb(new Error("Only PDF files are allowed"), false);
// //     }
// //   },
// // });

// // module.exports = { cloudinary, upload };

// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Ensure Uploads folder exists
// const UPLOAD_DIR = path.join(__dirname, "Uploads");
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// // Configure multer for PDF uploads
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: UPLOAD_DIR,
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed"), false);
//     }
//   },
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
// });

// module.exports = { cloudinary, upload };

const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure Cloudinary (unchanged)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ensure Uploads folder exists (unchanged)
const UPLOAD_DIR = path.join(__dirname, "Uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// UPDATED: Configure multer for PDFs, images, and optionally Word docs
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf", // Existing: PDFs
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp", // NEW: Common image formats
      // "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // OPTIONAL: Allow .docx here, but route to Drive in handler
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, images (JPEG, PNG, GIF, WebP) are allowed via Cloudinary"
        ),
        false
      );
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit (unchanged)
});

module.exports = { cloudinary, upload };
