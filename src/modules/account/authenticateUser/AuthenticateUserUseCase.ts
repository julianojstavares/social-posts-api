import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"; 
import { sign } from "jsonwebtoken";

interface IAuthenticateUser {
    email: string;
    password: string;
}


export class AuthenticateUserUseCase {
    async execute({ email, password }: IAuthenticateUser) {
        // Receber username e password
                

        // Validar se username é valido
        const client = await prisma.users.findFirst({
            where: {
                email
            }
        });

        if (!client) {
            throw new Error("Client not found");
        }

        // Validar se password é valido para esse username
        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        const { id, name, role } = client;

        const secret = process.env.SECRET as string;

        // Gerar token
        const token = sign({ id, name, role }, secret, {
            expiresIn: "1d"
        });

        return token;

    }
}