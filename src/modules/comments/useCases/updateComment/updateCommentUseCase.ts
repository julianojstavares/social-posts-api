import { prisma } from "../../../../database/prismaClient";

interface IComment {
    id_comment: number;
    content: string;
}

export class UpdateCommentUseCase {

    async execute({ id_comment, content }: IComment) {

        await prisma.comments.update({
            where: { id: id_comment },
            data: { content }
        });

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