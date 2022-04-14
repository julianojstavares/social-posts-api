import { prisma } from "../../../../database/prismaClient";

interface IPost {
    id_post: number;
}

let dislikes = 0;

export class DislikeUseCase {


    async execute({ id_post }: IPost) {

        const post = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            
        });

        dislikes = post!.dislikes += 1;

        await prisma.posts.update({
            where: {
                id: id_post
            },
            data: {
                dislikes: dislikes
            }
        });

        return ;

    }
}