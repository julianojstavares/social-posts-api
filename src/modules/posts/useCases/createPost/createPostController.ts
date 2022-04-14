import { Request, Response } from "express";
import { CreatePostUseCase } from "./createPostUseCase";

export class CreatePostController {
    
    async handle(request: Request, response: Response) {

        if(!request.body) {
            return response.status(400).send({
                message: "Missing body"
            });
        }
        
        const { title, content } = request.body;
        const { id_user } = request;

        const createPostUseCase = new CreatePostUseCase();

        const post = await createPostUseCase.execute({
            id_user,
            title,
            content
        });

        return response.json(post);

    }

}