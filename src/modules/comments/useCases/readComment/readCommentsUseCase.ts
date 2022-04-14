import { prisma } from "../../../../database/prismaClient";

interface IUser {
    id_post: number;
}

export class ReadCommentsUseCase {

    async execute({ id_post } : IUser) {

        const comments = await prisma.comments.findMany({
            where: {
                id: id_post,
                hide: false

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

        return comments;
    }

}