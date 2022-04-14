import { prisma } from "../../../../database/prismaClient";



export class ReadUsersUseCase {

    async execute() {
            
        const users = await prisma.users.findMany({
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

        return users;
    
    }

}