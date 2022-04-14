import { Request, Response } from 'express';
import { DeletePostUseCase } from './deletePostUseCase';

export class DeletePostController {

    async handle(request:Request, response:Response) {

        const { id_user } = request.body;

        const { id } = request.params;

        let id_post = Number(id);

        const deletePostUseCase = new DeletePostUseCase();

        const post = await deletePostUseCase.find({ id_post });

        if(!post) {

            return response.status(400).json({
                message: 'Post not found'
            });

        }

        if(post.authorId !== id_user) {
                
            return response.status(400).json({
                message: 'You are not the author of this post'
            });
    
        }

        const result = await deletePostUseCase.execute({ id_post });

        return response.status(200).json(result);

    }

}