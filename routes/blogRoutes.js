import express from 'express';
import {getImages,saveImages} from "../utils/fileHelpers.js";

const router = express.Router();

export default (upload) => {
    router.get('/', (req, res) => {
        const images = getImages();
        res.render('index',{images} );
    });

    router.get("/add", (req, res) => {
        const images = getImages();
        res.render('add', {images});
    })

    router.get("/gallery", (req, res) => {
       const images = getImages();
        res.render('gallery',{images});
    })

    router.post("/create", upload.array('files[]'), (req, res) => {
        const images = getImages();

        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                images.push({
                    filename: '/uploads/' + file.filename,
                    uploadDate: new Date().toISOString()
                });
            });
            saveImages(images);
            res.redirect('/gallery');
        }
    })

    router.get('/delete/:id', (req, res) => {
        const images = getImages();
        const index = parseInt(req.params.id, 10);

        if (!isNaN(index) && index >= 0 && index < images.length) {
            images.splice(index, 1);
            saveImages(images);
        }

        res.redirect('/gallery'); // or wherever you want to go after delete
    });



    return router;
}
