import { Request, Response } from "express";
import { ReadOnePostUseCase } from "./readOnePostUseCase";

export class ReadOnePostController {
    
    async handle(request: Request, response: Response) {
        
        const { id } = request.params;

        let id_post = Number(id);

        const readOnePostsUseCase = new ReadOnePostUseCase();

        try {
         
            const posts = await readOnePostsUseCase.execute({
                id_post
            });

            return response.json(posts);

        } catch (error) {

            return response.status(400).send({
                error: "Provide a valid id"
            });

        }
            
    }

}