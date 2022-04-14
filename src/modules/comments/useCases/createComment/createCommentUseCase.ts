import { prisma } from "../../../../database/prismaClient";

interface IUser {
    id_user: number;
    content: string;
    id_post: number;
}

export class CreateCommentUseCase {

    async execute({ id_user, id_post, content } : IUser) {

        const commentCreated = await prisma.comments.create({
            data: {
                authorId: id_user,
                postId: id_post,
                content,
                createdAt: new Date(),
                hide: false
            }
        });
        
        const comment = await prisma.comments.findUnique({
            where: {
                id: commentCreated.id
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
            }
        });

        return comment;
    }

}