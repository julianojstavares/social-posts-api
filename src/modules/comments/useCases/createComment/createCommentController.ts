import { Request, Response } from 'express';
import { CreateCommentUseCase } from './createCommentUseCase';


export class CreateCommentController {

    async handle(request:Request, response:Response) {
            
        const { id_user } = request;
        const { id } = request.params;
        const { content } = request.body;
    
        if(!Number(id)) {
            return response.status(400).json({
                error: 'id must be a number'
            });
        }

        if(!content){
            return response.status(400).json({
                error: 'content is required'
            });
        }

        let nId_user = Number(id_user);
        let nId = Number(id);

        const createCommentUseCase = new CreateCommentUseCase();

        const result = await createCommentUseCase.execute({ id_user: nId_user, id_post: nId, content });

        return response.status(201).json(result);
    
    }

}