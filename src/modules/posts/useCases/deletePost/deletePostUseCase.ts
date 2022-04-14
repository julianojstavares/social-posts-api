import { response } from 'express';
import { prisma } from "../../../../database/prismaClient";

interface IPost {
    id_post: number;
}

export class DeletePostUseCase {

    async find ({ id_post }: { id_post: number }) {
        
        const post = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            
        });

        return post;
    }

    async execute({ id_post } : IPost) {

        await prisma.posts.delete({
            where: {
                id: id_post,
            }
        });
        
        return response.json({
            message: `Post id=${id_post} deleted successfully`,	
        });

    }

}