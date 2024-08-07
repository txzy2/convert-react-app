const express = require("express");
const cors = require("cors");
const multer = require("multer");
var ConvertAPI = require("convertapi")("AIy6ThwOWhU7mvRe");
const path = require("path");

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  console.log(req.file);

  const inputFilePath = path.join(__dirname, "uploads", req.file.originalname);
  const outputFilePath = path.join(
    __dirname,
    "converted",
    req.file.originalname.replace(".docx", ".pdf"),
  );

  ConvertAPI.convert("pdf", { File: inputFilePath }, "doc")
    .then(function (result) {
      return result.saveFiles(path.dirname(outputFilePath));
    })
    .then(function () {
      res.download(outputFilePath, (err) => {
        if (err) {
          console.error("Download error:", err);
          if (!res.headersSent) {
            res.status(500).send("Error downloading file.");
          }
        }
      });
    })
    .catch(function (err) {
      console.error("Conversion error:", err);
      if (!res.headersSent) {
        res.status(500).send("Conversion failed.");
      }
    });
});

app.listen(4200, () => {
  console.log("Server started");
});
