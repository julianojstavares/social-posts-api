import { Request, Response } from "express";
import { CreateAdminUseCase } from './createAdminUseCase';
import validator from 'validator';

export class CreateAdminController {
    async handle(request: Request, response: Response) {
        
        const { name, email, password } = request.body;

        if(!validator.isEmail(email)) {
            return response.status(400).json({
                message: 'Invalid email'
            });
        }

        const createAdminUseCase = new CreateAdminUseCase();
        
        const result = await createAdminUseCase.execute({
            name,
            email,
            password
        });

        return response.json(result);

    }
}