import { prisma } from "../../../../database/prismaClient";

interface IPost {
    id_post: number;
    title: string;
    content: string;
}

export class UpdatePostUseCase {

    async find ({ id_post }: { id_post: number }) {
        
        const post = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            
        });

        return post;
    }

    async execute({ id_post, title, content } : IPost) {

        await prisma.posts.update({
            where: {
                id: id_post,
            },
            data: {
                updatedAt: new Date(),
                history: {
                    create: {
                        title,
                        content,
                        timestamp: new Date()
                    }
                }
            }
        });

        const post = await prisma.posts.findUnique({
        
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

        return post;

    }

}