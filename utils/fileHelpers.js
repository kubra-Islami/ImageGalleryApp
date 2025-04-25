import fs from 'fs';

export const getImages = () => {
    return JSON.parse(fs.readFileSync('images.json','utf-8'));
}

export const saveImages = (images) => {
    return fs.writeFileSync('images.json', JSON.stringify(images,null,2));
}
