import { Request, Response } from "express";
import { UploadImagesUseCase } from "./uploadImagesUseCase";

export class UploadImagesController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;

        if(!Number(id)) {
            return response.status(400).send({
                message: "Missing id"
            });
        }

        const id_post = Number(id);
        
        if(!request.files) {
            return response.status(400).send({
                message: "Missing files"
            });
        }

        const images = request.files;

        const uploadImagesUseCase = new UploadImagesUseCase();

        const result = await uploadImagesUseCase.execute({images, id_post});

        return response.json({"result": "bla"});


    }

}