import { prisma } from "../../../../database/prismaClient";

interface IPosts {
    id_user: number;
    limit?: number;
    offset?: number;
}

export class ReadAllPostsUseCase {
    async execute({ limit, offset }: IPosts) {

        const postsFound = await prisma.posts.findMany({
            
            take: limit,
            skip: offset,
            select: {
                id: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                images: true,
                history: {
                    take: 1,
                    orderBy: {
                        timestamp: "desc"
                    },
                    select: {
                        id: true,
                        title: true,
                    }
                },
                views: true,
                likes: true,
                dislikes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc"
            }

            
        });

        const posts = postsFound.map(post => {
            return {
                id: post.id,
                title: post.history[0].title,
                comments: post.comments.length,
                views: post.views,
                likes: post.likes,
                dislikes: post.dislikes,
            }
        });

        const total = await prisma.posts.count({});

        let data = {
            posts,
        }

        let meta = {
            limit,
            offset,
            listed: postsFound.length,
            total,
        }

        let pageInfo = {
            data,
            meta
        } 

        return pageInfo;

    }
}