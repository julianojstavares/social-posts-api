import { prisma } from "../../../../database/prismaClient";

interface IUser {
    id_user: number;
    name?: string;
    email?: string;
}

export class UpdateUserUseCase {

    async execute({ id_user, name, email }: IUser) {
            
        await prisma.users.update({
            where: { id: id_user },
            data: {
                name,
                email,
                updatedAt: new Date(),
            }
        });

        const user = await prisma.users.findUnique({
            where: { id: id_user },
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