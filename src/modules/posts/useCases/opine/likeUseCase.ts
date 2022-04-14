import { prisma } from "../../../../database/prismaClient";

interface IPost {
    id_post: number;
}

let likes = 0;

export class LikeUseCase {


    async execute({ id_post }: IPost) {

        const post = await prisma.posts.findUnique({
        
            where: {
                id: id_post
            },
            
        });

        likes = post!.likes += 1;

        await prisma.posts.update({
            where: {
                id: id_post
            },
            data: {
                likes: likes
            }
        });

        return ;

    }
}