import { Request, Response } from "express";
import { CreateUserUseCase } from './createUserUseCase';
import validator from 'validator';

export class CreateUserController {
    async handle(request: Request, response: Response) {
        
        const { name, email, password } = request.body;

        if(!validator.isEmail(email)) {
            return response.status(400).json({
                message: 'Invalid email'
            });
        }

        const createUserUseCase = new CreateUserUseCase();
        
        const result = await createUserUseCase.execute({
            name,
            email,
            password
        });

        return response.json(result);

    }
}