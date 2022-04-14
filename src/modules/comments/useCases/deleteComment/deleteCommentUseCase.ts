import { prisma } from "../../../../database/prismaClient";

interface IComment {
    id_comment: number;
}

export class DeleteCommentUseCase {

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

        await prisma.comments.delete({
            where: { id: id_comment }
        });

        return {
            message: `Comment id=${id_comment} deleted successfully`
        };

    }

}