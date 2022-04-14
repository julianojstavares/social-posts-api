import fs from "fs";

const cloudinary = require("../../../../utils/cloudinary");


interface IFiles {
    images: any;
    id_post: number;
}

export class UploadImagesUseCase {

    async execute({ images, id_post } : IFiles) {

        const uploader = async (path:String) => await cloudinary.uploads(path, 'Images');
        
        const urls = [];
        const files = images;

        for (const file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
        }

        console.log(urls);

        return urls;
    }

}