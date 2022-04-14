import { Request, Response } from 'express';
import { UpdatePostUseCase } from './updatePostUseCase';

export class UpdatePostController {

    async handle(request:Request, response:Response) {

        const { id_user } = request.body;

        const { id } = request.params;

        const { title, content } = request.body;

        let id_post = Number(id);

        if(!title && !content) {
                
            return response.status(400).json({
                message: 'Invalid data'
            });
    
        }

        const updatePostUseCase = new UpdatePostUseCase();

        const post = await updatePostUseCase.find({ id_post });

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

        const result = await updatePostUseCase.execute({ id_post, title, content });

        return response.status(200).json(result);

    }

}