import { Request, Response } from "express";
import { LikeUseCase } from "./likeUseCase";

export class LikeController {
    
    async handle(request: Request, response: Response) {
        
        const { id } = request.params;

        let id_post = Number(id);

        const likeUseCase = new LikeUseCase();

        try {
         
            const posts = await likeUseCase.execute({
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