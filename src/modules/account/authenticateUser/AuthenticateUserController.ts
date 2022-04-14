import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { Request, Response } from "express";

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        
        const { email, password } = request.body;

        const authenticateUserUseCase = new AuthenticateUserUseCase();
        
        const result = await authenticateUserUseCase.execute({ email, password });

        return response.json(result);
 
    }
}