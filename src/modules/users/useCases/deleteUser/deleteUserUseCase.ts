import { prisma } from "../../../../database/prismaClient";

interface IUser {
    id_user: number;
}

export class DeleteUserUseCase {

    async execute({ id_user } : IUser) {

        const user = await prisma.users.findUnique({
            where: {
                id: id_user
            }
        });

        if(!user) {
            throw new Error('User not found');
        }

        await prisma.users.delete({
            where: {
                id: id_user
            }
        });

        return {
            message: `User with id=${id_user} deleted`
        };

    }

}