import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import BlogRoutes from "./routes/blogRoutes.js";

//Express setup
const app = express();
const PORT = process.env.PORT || 3002;

//Middlewares setup
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('uploads'));
app.set("view engine", "ejs");

// File & Folder setup
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
if (!fs.existsSync("./images.json")) fs.writeFileSync("./images.json", '[]');

// Multer setup
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage});

// Route Handling
app.use('/',(BlogRoutes(upload)));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});



