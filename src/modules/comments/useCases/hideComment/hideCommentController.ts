import { Request, Response } from "express";
import { HideCommentUseCase } from "./hideCommentUseCase";

export class HideCommentController {

    async handle(request:Request, response:Response) {

        const { id_user } = request;

        const { id } = request.params;


        let id_comment = Number(id);
        
        let user = Number(id_user);

        if(!id || !user) {
            return response.status(400).json({
                message: "Invalid comment id or user id"
            });
        }

        const hideCommentUseCase = new HideCommentUseCase();

        const authorPost = await hideCommentUseCase.findAuthorPost({ id_comment });

        const authorComment = await hideCommentUseCase.findAuthorComment({ id_comment });

        if(user !== authorPost && user !== authorComment) {
            return response.status(401).json({
                message: "You are not authorized to hide this comment"
            });
        }

        const result = await hideCommentUseCase.execute({ id_comment });

        return response.status(200).json(result);

    }

}