import { Request, Response } from "express";
import { DeleteCommentUseCase } from "./deleteCommentUseCase";

export class DeleteCommentController {

    async handle(request:Request, response:Response) {

        const { id_user } = request;

        const { id_comment } = request.params;

        let id = Number(id_comment);
        
        let user = Number(id_user);

        if(!id || !user) {
            return response.status(400).json({
                message: "Invalid comment id or user id"
            });
        }

        const deleteCommentUseCase = new DeleteCommentUseCase();

        const authorPost = await deleteCommentUseCase.findAuthorPost({ id_comment: id });

        const authorComment = await deleteCommentUseCase.findAuthorComment({ id_comment: id });

        if(user !== authorPost && user !== authorComment) {
            return response.status(401).json({
                message: "You are not authorized to delete this comment"
            });
        }

        const result = await deleteCommentUseCase.execute({ id_comment: id });

        return response.status(200).json(result);

    }

}