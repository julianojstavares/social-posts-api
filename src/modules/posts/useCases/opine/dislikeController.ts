import { Request, Response } from "express";
import { DislikeUseCase } from "./dislikeUseCase";

export class DislikeController {
    
    async handle(request: Request, response: Response) {
        
        const { id } = request.params;

        let id_post = Number(id);

        const dislikeUseCase = new DislikeUseCase();

        try {
         
            const posts = await dislikeUseCase.execute({
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