
import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateUser {
    name: string;
    email : string;
    password : string;
}

export class CreateUserUseCase {

  async execute({ password, email, name, }: ICreateUser) {

    if(!email) {
        throw new Error("E-mail is required");
    }

    if(!password) {
        throw new Error("Password is required");
    }

    // Validar se o usuario já existe
    const userExists = await prisma.users.findFirst({
        where: {
            email: {
                equals: email,
            },
        }
    });

    // se existir, retornar erro
    if(userExists){
        throw new Error("User already exists");
    }

    // Se não existir, criptografar a senha
    let hashPassword = ""; 

    if(password) { hashPassword = await hash(password, 10); }
    else { throw new Error("Password not informed"); }

    // Criar o usuario
    const user = await prisma.users.create({
        data: {
            name,
            email,
            password: hashPassword,
            role: "default_user",
            createdAt: new Date(),
        }
    });

    const userFields = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    }

    return userFields;

  }

}