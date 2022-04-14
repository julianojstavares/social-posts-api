import { request } from "express";
import { prisma } from "../../../../database/prismaClient";
import fs from "fs";

const cloudinary = require("../../../../utils/cloudinary");

interface ICreatePost {
    id_user: number;
    title: string;
    content: string;
}

export class CreatePostUseCase {

    async execute({ id_user, title, content }: ICreatePost) {

        
        const post = await prisma.posts.create({
            data: {
                authorId: id_user,
                createdAt: new Date(),
                views: 0,
                likes: 0,
                dislikes: 0,
                history: {
                    create: {
                        title,
                        content,
                        timestamp: new Date(),
                    }
                }
                
            }
        });

        const postCreated = await prisma.posts.findUnique({
            where: {
                id: post.id
            },
            select: {
                id: true,
                images: true,
                history: {
                    orderBy: {
                        timestamp: "desc",
                    },
                    take: 1,
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        timestamp: true,
                    },
                },
                views: true,
                comments: {
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: true,
                dislikes: true,
                createdAt: true,
            }
        });
        
        return postCreated;

    }
}