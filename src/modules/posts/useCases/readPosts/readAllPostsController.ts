import { Request, Response } from "express";
import { ReadAllPostsUseCase } from "./readAllPostsUseCase";

export class ReadAllPostsController {
    
    async handle(request: Request, response: Response) {
        
        const { id_user } = request;
        const { limit, offset } = request.query;

        let limit_number = limit ? Number(limit) : 10;
        let offset_number = offset ? Number(offset) : 0;

        const readAllPostsUseCase = new ReadAllPostsUseCase();

        const posts = await readAllPostsUseCase.execute({
            id_user,
            limit: limit_number,
            offset: offset_number
        });

        return response.json(posts);

    }

}