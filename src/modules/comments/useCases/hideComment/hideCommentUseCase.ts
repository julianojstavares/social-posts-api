import { prisma } from "../../../../database/prismaClient";

interface IComment {
    id_comment: number;
}

export class HideCommentUseCase {

    async findAuthorPost({ id_comment } : IComment) {

        const comment = await prisma.comments.findUnique({
            where: { id: id_comment }
        });

        const postId = comment!.postId;

        const post = await prisma.posts.findUnique({
            where: { id: postId }
        });

        const authorPost = post!.authorId;

        return authorPost;
    }

    async findAuthorComment({ id_comment } : IComment) {

        const comment = await prisma.comments.findUnique({
            where: { id: id_comment }
        });

        const authorComment = comment!.authorId;

        return authorComment;
    }

    async execute({ id_comment } : IComment) {

        const commentOld = await prisma.comments.findUnique({
            where: {
                id: id_comment
            },
        });

        if(commentOld!.hide == true) {
            
            await prisma.comments.update({
                where: { id: id_comment },
                data: {
                    hide: false
                }
            });

        } else {
                
            await prisma.comments.update({
                where: { id: id_comment },
                data: {
                    hide: true
                }
            });
    
        }

        const comment = await prisma.comments.findUnique({
            where: {
                id: id_comment
            },
            select: {
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                content: true,
                createdAt: true,
                updatedAt: true,
                hide: true,
            }
        });

        return comment;

    }

}