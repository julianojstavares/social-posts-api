import prisma from "../../../../database/prismaClient";

interface IUser {
    id_user: number;
}

export class ReadUserUseCase {

    async execute({ id_user }: IUser) {
            
        const user = await prisma.users.findUnique({
            where:{
                id: id_user
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                _count: {
                    select: {
                        posts: true,
                        comments: true,
                    }
                },
                createdAt: true,
                updatedAt: true,
            }
        });

        return user;
    
    }

}