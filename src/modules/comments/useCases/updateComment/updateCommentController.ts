import { Request, Response } from "express";
import { UpdateCommentUseCase } from "./updateCommentUseCase";

export class UpdateCommentController {

    async handle(request: Request, response: Response) {

        const { id_user } = request;
        
        const { id } = request.params;
        
        let id_comment = Number(id);

        if(id_user != id_comment) {
            return response.status(401).json({
                message: "You are not authorized to update this comment"
            });
        }

        const { content } = request.body;

        const updateCommentUseCase = new UpdateCommentUseCase();

        const result = await updateCommentUseCase.execute({ id_comment, content });

        return response.status(200).json(result);

    }

}