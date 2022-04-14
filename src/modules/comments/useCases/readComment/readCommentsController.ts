import { Request, Response } from "express";
import { ReadCommentsUseCase } from "./readCommentsUseCase";

export class ReadCommentsController {

    async handle (request:Request, response:Response) {
        
        const { id } = request.params;

        let id_post = Number(id);
        
        const readCommentsUseCase = new ReadCommentsUseCase();

        const result = await readCommentsUseCase.execute({ id_post });

        return response.status(200).json(result);

    }

}