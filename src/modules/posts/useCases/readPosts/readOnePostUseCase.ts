import { prisma } from "../../../../database/prismaClient";

interface IPost {
    id_post: number;
}

let views = 0;

export class ReadOnePostUseCase {

    async execute({ id_post }: IPost) {

        const post = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            
        });

        views = post!.views += 1;
        // views = 0;

        await prisma.posts.update({
            where: {
                id: id_post
            },
            data: {
                views: views
            }
        });

        const postUpdated = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            select: {
                
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                images: true,
                history: {
                    orderBy: {
                        timestamp: "desc"
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                },
                views: true,
                likes: true,
                dislikes: true,
                createdAt: true,
                updatedAt: true,

            }
            
        });

        return postUpdated;

    }
}